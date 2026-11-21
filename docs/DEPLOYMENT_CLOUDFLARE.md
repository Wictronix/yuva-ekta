# Deploying to Cloudflare Workers

The site runs on **Cloudflare Workers** via the [OpenNext adapter](https://opennext.js.org/cloudflare) (`@opennextjs/cloudflare`).
Cloudflare Pages is not used: it cannot run Next.js API routes, middleware or ISR.
Deploys happen automatically through **Workers Builds** on every push to `master`.

| File | Purpose |
|---|---|
| `wrangler.jsonc` | Worker name, bindings (assets, images, R2 cache, D1 tag cache), non-secret vars |
| `open-next.config.ts` | ISR cache: R2 incremental cache + D1 tag cache (needed for `revalidatePath`) |
| `next.config.ts` | Security headers (moved from the old `vercel.json`) + `initOpenNextCloudflareForDev()` |
| `.dev.vars.example` | Template for local `npm run preview` |

---

## 0. Plan requirement

The Worker is kept small on purpose:

- Receipt PDFs are built **in the browser** with `pdf-lib` (thank-you page + admin donations table). Nothing is rendered or stored server-side.
- R2 uploads use `aws4fetch` (presigned URLs) instead of the AWS SDK.
- Razorpay is called with `fetch` (see `src/lib/razorpay.ts`) instead of the SDK.

Check the size the first deploy prints (`Total Upload: … / gzip: …`). If gzip is under 3 MiB, the **free plan** can work. If it is over, or you see `Exceeded CPU` errors in Observability, switch to **Workers Paid ($5/month)**.

**Keep it small:** don't add server-only SDKs where a `fetch` call will do, and keep animation components on `m.*` from `framer-motion`. `MotionProvider` runs in `strict` mode and throws if a component uses `motion.*`.

## 1. One-time setup (CLI)

```bash
npx wrangler login

# ISR cache bucket (separate from the yuva-ekta-assets image bucket)
npx wrangler r2 bucket create yuva-ekta-next-cache

# Tag cache for revalidatePath()
npx wrangler d1 create yuva-ekta-tag-cache
```

Copy the `database_id` printed by the last command into `wrangler.jsonc` → `d1_databases[0].database_id`, then commit.
The D1 table is created automatically by the first `opennextjs-cloudflare deploy`.

## 2. Runtime secrets

Set each secret once. They persist across deploys:

```bash
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
npx wrangler secret put R2_ACCOUNT_ID
npx wrangler secret put R2_ACCESS_KEY_ID
npx wrangler secret put R2_SECRET_ACCESS_KEY
npx wrangler secret put R2_PUBLIC_URL
npx wrangler secret put RESEND_API_KEY
npx wrangler secret put RAZORPAY_KEY_SECRET
npx wrangler secret put RAZORPAY_WEBHOOK_SECRET
```

(Or in the dashboard: Worker → **Settings → Variables and Secrets → Add → type: Secret**.)

Non-secret values (`R2_BUCKET`, `EMAIL_FROM`, `EMAIL_REPLY_TO`, `TRANSACTION_FEE_PERCENT`) live in `wrangler.jsonc` → `vars`.
Change them there, not in the dashboard. Every deploy overwrites dashboard plain-text vars with the values in `wrangler.jsonc`.

## 3. Connect GitHub (Workers Builds)

Dashboard → **Workers & Pages → Create → Import a repository** → pick this repo.

| Setting | Value |
|---|---|
| Project / Worker name | `yuva-ekta` (must match `name` in `wrangler.jsonc`) |
| Production branch | `master` |
| Build command | *(leave empty)* |
| Deploy command | `npm run deploy` |
| Non-production branch deploy command | `npm run upload` (creates a preview URL per branch) |
| Root directory | `/` |

**Build variables** (Settings → Build → Variables and secrets). `NEXT_PUBLIC_*` values are compiled into the bundle at build time, so they must be set here:

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_RAZORPAY_KEY_ID
NEXT_PUBLIC_SITE_URL=https://yuvaektaindiafoundation.org
```

Push to `master` (or click **Retry build**) and check that the build log ends with a deployed `*.workers.dev` URL.

## 4. Test on the workers.dev URL before switching DNS

- [ ] Home, campaigns list and a campaign detail page load, with images from R2
- [ ] `/auth/login` works and `/admin` redirects when logged out (middleware)
- [ ] Admin: edit a campaign → the public page shows the change (tests `revalidatePath` + D1)
- [ ] Admin: upload a campaign image
- [ ] Contact form sends an email (Resend)
- [ ] Razorpay **test mode** one-time donation → receipt email arrives (details only), and **Download PDF Receipt** on the thank-you page works
- [ ] Admin → Donations → **PDF** button downloads that donation's receipt
- [ ] Razorpay test subscription
- [ ] Logs: Worker → **Observability** shows no errors

For the webhook tests, temporarily add a second webhook in Razorpay pointing at
`https://yuva-ekta.<subdomain>.workers.dev/api/razorpay/webhook` (and `/webhook-subscription`).

Add the workers.dev URL to **Supabase → Authentication → URL Configuration → Redirect URLs** if login redirects fail.

## 5. Switch the domain

1. The domain's DNS must be on Cloudflare. If it isn't, add the site in Cloudflare and change the nameservers at your registrar.
2. Vercel → Project → Domains: remove `yuvaektaindiafoundation.org` and `www`.
3. Delete any old Vercel `A` or `CNAME` records in Cloudflare DNS.
4. Worker → **Settings → Domains & Routes → Add → Custom domain**: add `yuvaektaindiafoundation.org` and `www.yuvaektaindiafoundation.org`.
5. Re-run the step 4 checklist on the real domain. Razorpay webhook URLs stay the same, because the domain is unchanged.
6. Remove the temporary workers.dev webhook from Razorpay.

## 6. Delete old stored receipt PDFs (one-time)

Receipts used to be uploaded to `yuva-ekta-assets/receipts/`. They are no longer used: the database keeps `receipt_number`, and the PDF is rebuilt on demand from the admin donations table.
Links in old emails will stop working once the files are deleted.

```bash
# 1. Look first
npx wrangler r2 object list yuva-ekta-assets --prefix receipts/ --remote   # or browse in Dashboard → R2

# 2. Expire everything under receipts/ (R2 deletes within ~24h)
npx wrangler r2 bucket lifecycle add yuva-ekta-assets delete-old-receipts receipts/ --expire-days 1

# 3. After the folder is empty, remove the rule
npx wrangler r2 bucket lifecycle remove yuva-ekta-assets --name delete-old-receipts
```

Optional: clear the dead links in Supabase (SQL editor): `update donations set receipt_url = null where receipt_url is not null;`

## 7. Rollback

- Bad deploy: `npx wrangler rollback`, or Worker → **Deployments → Rollback**.
- Full rollback to Vercel: keep the Vercel project (paused, not deleted) for ~2 weeks. To go back, re-add the domain in Vercel and point DNS back.
  Note: `vercel.json` was removed. Its headers now live in `next.config.ts`, which Vercel also honours.

## Local development

| Command | What it does |
|---|---|
| `npm run dev` | Normal Next.js dev server (reads `.env`) |
| `npm run preview` | Builds with OpenNext and runs in the real Workers runtime locally (copy `.dev.vars.example` → `.dev.vars`) |
| `npm run deploy` | Build + deploy to production from your machine |
| `npm run cf-typegen` | Regenerates `cloudflare-env.d.ts` after changing bindings |

**Windows:** the OpenNext build step creates symlinks, so it fails with `EPERM: operation not permitted, symlink`
unless you enable **Settings → System → For developers → Developer Mode**, or run it inside WSL.
`npm run dev` and `next build` work either way. Workers Builds runs on Linux, so CI is not affected.
