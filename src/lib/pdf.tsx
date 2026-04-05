import React from "react";
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer";
import { formatCurrency, formatDate } from "./utils";
import { SITE } from "./constants";

// Register fonts
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf', fontWeight: 700 }
  ]
});

Font.register({
  family: 'Playfair',
  src: 'https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtMK.ttf'
});

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Inter',
    fontSize: 10,
    color: '#1A1A2E',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 20,
  },
  title: {
    fontFamily: 'Playfair',
    fontSize: 24,
    color: '#BF3475',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 10,
    color: '#6B6B6B',
  },
  orgDetails: {
    textAlign: 'right',
    fontSize: 9,
    color: '#6B6B6B',
    lineHeight: 1.5,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 10,
    color: '#1A1A2E',
    backgroundColor: '#FCE8F0',
    padding: 5,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    width: 150,
    color: '#6B6B6B',
  },
  value: {
    flex: 1,
    fontWeight: 700,
  },
  footer: {
    position: 'absolute',
    bottom: 50,
    left: 50,
    right: 50,
    textAlign: 'center',
    color: '#6B6B6B',
    fontSize: 8,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 10,
  },
  signatureBox: {
    marginTop: 50,
    width: 200,
    borderTopWidth: 1,
    borderTopColor: '#1A1A2E',
    paddingTop: 5,
    textAlign: 'center',
    alignSelf: 'flex-end',
  }
});

interface ReceiptProps {
  receiptNumber: string;
  date: string;
  donorName: string;
  donorEmail: string;
  donorPhone: string;
  pan?: string | null;
  amount: number;
  paymentId: string;
  campaignName?: string;
}

const ReceiptDocument = ({ r }: { r: ReceiptProps }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>DONATION RECEIPT</Text>
          <Text style={styles.subtitle}>Receipt No: {r.receiptNumber}</Text>
          <Text style={styles.subtitle}>Date: {formatDate(r.date)}</Text>
        </View>
        <View style={styles.orgDetails}>
          <Text style={{ fontWeight: 700, color: '#1A1A2E' }}>{SITE.name}</Text>
          <Text>{SITE.address}</Text>
          <Text>80G Reg: {SITE.registrationNo}</Text>
          <Text>Email: {SITE.email}</Text>
          <Text>Phone: {SITE.phone1}</Text>
        </View>
      </View>

      {/* Donor Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DONOR DETAILS</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Received with thanks from:</Text>
          <Text style={styles.value}>{r.donorName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email Address:</Text>
          <Text style={styles.value}>{r.donorEmail}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phone Number:</Text>
          <Text style={styles.value}>{r.donorPhone}</Text>
        </View>
        {r.pan && (
          <View style={styles.row}>
            <Text style={styles.label}>PAN:</Text>
            <Text style={styles.value}>{r.pan}</Text>
          </View>
        )}
      </View>

      {/* Donation Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DONATION DETAILS</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Donation Amount:</Text>
          <Text style={styles.value}>{formatCurrency(r.amount)} INR</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Payment Reference:</Text>
          <Text style={styles.value}>{r.paymentId}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Campaign/Fund:</Text>
          <Text style={styles.value}>{r.campaignName || "General Fund"}</Text>
        </View>
      </View>

      {/* Amount in words */}
      <View style={styles.section}>
        <Text style={{ fontStyle: 'italic', color: '#6B6B6B', marginTop: 10 }}>
          This receipt is invalid without successful realization of payment.
        </Text>
      </View>

      {/* Signature area */}
      <View style={styles.signatureBox}>
        <Text>Authorized Signatory</Text>
        <Text style={{ fontSize: 8, color: '#6B6B6B' }}>Yuva Ekta India Foundation</Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Donations made are exempt under section 80G of the Income Tax Act, 1961.</Text>
        <Text>System generated receipt. {r.paymentId}</Text>
      </View>
    </Page>
  </Document>
);

// Server-side PDF generation
export async function generateReceiptPDF(props: ReceiptProps): Promise<Buffer> {
  const { renderToBuffer } = await import('@react-pdf/renderer');
  return await renderToBuffer(<ReceiptDocument r={props} />);
}
