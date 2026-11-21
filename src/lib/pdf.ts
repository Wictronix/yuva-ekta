// Receipt PDF, generated on the donor's/admin's device with pdf-lib. Nothing is uploaded or stored.
// Layout mirrors the former @react-pdf template (A4, 50pt margins, Helvetica).
import type { PDFFont, PDFPage } from "pdf-lib";
import { formatCurrency, formatDate } from "./utils";
import { SITE } from "./constants";

export interface ReceiptProps {
  receiptNumber: string;
  date: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  pan?: string | null;
  amount: number;
  paymentId: string;
  campaignName?: string | null;
}

// Standard fonts only encode WinAnsi; anything else (₹, Devanagari) would throw.
// ponytail: non-Latin donor names print as "?" (same as the old Helvetica template); embed a TTF via @pdf-lib/fontkit if that matters.
const safe = (s: string) =>
  s.replace(/[^\x20-\x7E\xA0-\xFF–—‘’“”•…€]/g, "?");

function wrap(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of safe(text).split(" ")) {
    const next = line ? `${line} ${word}` : word;
    if (line && font.widthOfTextAtSize(next, size) > maxWidth) {
      lines.push(line);
      line = word;
    } else line = next;
  }
  return [...lines, line];
}

export async function buildReceiptPDF(r: ReceiptProps): Promise<Uint8Array> {
  const { PDFDocument, StandardFonts, rgb } = await import("pdf-lib");
  const hex = (h: string) =>
    rgb(parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255);
  const C = { ink: hex("#1A1A2E"), pink: hex("#BF3475"), grey: hex("#6B6B6B"), rule: hex("#E0E0E0"), band: hex("#FCE8F0") };

  const doc = await PDFDocument.create();
  doc.setTitle(`Donation Receipt ${r.receiptNumber}`);
  const page: PDFPage = doc.addPage([595.28, 841.89]);
  const reg = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);

  const M = 50;
  const W = page.getWidth() - M * 2;
  const right = M + W;
  const text = (s: string, x: number, y: number, size: number, font = reg, color = C.ink) =>
    page.drawText(safe(s), { x, y, size, font, color });
  const textRight = (s: string, y: number, size: number, font = reg, color = C.grey) =>
    text(s, right - font.widthOfTextAtSize(safe(s), size), y, size, font, color);
  const hline = (x1: number, x2: number, y: number, color = C.rule) =>
    page.drawLine({ start: { x: x1, y }, end: { x: x2, y }, thickness: 1, color });

  // Header
  let y = page.getHeight() - M;
  text("DONATION RECEIPT", M, y - 20, 24, bold, C.pink);
  text(`Receipt No: ${r.receiptNumber}`, M, y - 40, 10, reg, C.grey);
  text(`Date: ${formatDate(r.date)}`, M, y - 54, 10, reg, C.grey);

  let ry = y - 9;
  textRight(SITE.name, ry, 9, bold, C.ink);
  for (const line of [
    ...wrap(SITE.address, reg, 9, 230),
    `80G Reg: ${SITE.registrationNo}`,
    `Email: ${SITE.email}`,
    `Phone: ${SITE.phone1}`,
  ]) textRight(line, (ry -= 13.5), 9);

  y = Math.min(y - 60, ry - 6) - 20;
  hline(M, right, y);
  y -= 40;

  const section = (title: string, rows: [string, string][]) => {
    page.drawRectangle({ x: M, y: y - 17, width: W, height: 22, color: C.band });
    text(title, M + 5, y - 10, 12, bold);
    y -= 32;
    for (const [label, value] of rows) {
      text(label, M, y - 8, 10, reg, C.grey);
      const lines = wrap(value, bold, 10, W - 150);
      lines.forEach((l, i) => text(l, M + 150, y - 8 - i * 12, 10, bold));
      y -= 12 * lines.length + 5;
    }
    y -= 30;
  };

  section("DONOR DETAILS", [
    ["Received with thanks from:", r.donorName],
    ["Email Address:", r.donorEmail],
    ["Phone Number:", r.donorPhone],
    ...(r.pan ? ([["PAN:", r.pan]] as [string, string][]) : []),
  ]);
  section("DONATION DETAILS", [
    ["Donation Amount:", `${formatCurrency(r.amount).replace("₹", "").trim()} INR`],
    ["Payment Reference:", r.paymentId],
    ["Campaign/Fund:", r.campaignName || "General Fund"],
  ]);

  text("This receipt is invalid without successful realization of payment.", M, y, 10, reg, C.grey);
  y -= 70;

  // Signature
  const sx = right - 200;
  hline(sx, right, y, C.ink);
  const center = (s: string, x: number, w: number, yy: number, size: number, color = C.ink) =>
    text(s, x + (w - reg.widthOfTextAtSize(safe(s), size)) / 2, yy, size, reg, color);
  center("Authorized Signatory", sx, 200, y - 15, 10);
  center(SITE.name, sx, 200, y - 27, 8, C.grey);

  // Footer
  hline(M, right, M + 30);
  center("Donations made are exempt under section 80G of the Income Tax Act, 1961.", M, W, M + 14, 8, C.grey);
  center(`System generated receipt. ${r.paymentId}`, M, W, M + 3, 8, C.grey);

  return doc.save();
}

/** Builds the receipt in the browser and triggers a download. */
export async function downloadReceiptPDF(r: ReceiptProps) {
  const bytes = await buildReceiptPDF(r);
  const url = URL.createObjectURL(new Blob([bytes as BlobPart], { type: "application/pdf" }));
  const a = Object.assign(document.createElement("a"), { href: url, download: `Receipt-${r.receiptNumber}.pdf` });
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
