import { AwsClient } from 'aws4fetch';

let r2Client: AwsClient | null = null;

function getR2Client(): AwsClient {
  if (!r2Client) {
    const accessKeyId = process.env.R2_ACCESS_KEY_ID;
    const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;

    if (!process.env.R2_ACCOUNT_ID || !accessKeyId || !secretAccessKey) {
      throw new Error(
        'Missing R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, or R2_SECRET_ACCESS_KEY environment variables'
      );
    }

    r2Client = new AwsClient({ accessKeyId, secretAccessKey, service: 's3', region: 'auto' });
  }

  return r2Client;
}

// Bucket name
export const BUCKET_ASSETS = process.env.R2_BUCKET ?? 'yuva-ekta-assets';
export const R2_PUBLIC_URL = process.env.R2_PUBLIC_URL ?? '';

/**
 * Generate a pre-signed upload URL for direct client upload to R2.
 * Used by admin image uploader to bypass server bandwidth.
 * The client must send the same Content-Type header (it is part of the signature).
 */
export async function getPresignedUploadUrl(
  bucket: string,
  key: string,
  contentType: string,
  expiresIn: number = 3600
): Promise<{ uploadUrl: string; publicUrl: string }> {
  const url = new URL(
    `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${bucket}/${key}`
  );
  url.searchParams.set('X-Amz-Expires', String(expiresIn));

  const signed = await getR2Client().sign(
    new Request(url, { method: 'PUT', headers: { 'Content-Type': contentType } }),
    { aws: { signQuery: true } }
  );

  return { uploadUrl: signed.url, publicUrl: `${R2_PUBLIC_URL}/${key}` };
}
