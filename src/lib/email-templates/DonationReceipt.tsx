import { Html, Head, Body, Container, Text, Section, Heading, Hr } from '@react-email/components';
import * as React from 'react';
import { formatCurrency, formatDate } from '../utils';

interface DonationReceiptEmailProps {
  donorName: string;
  amount: number;
  date: string;
  receiptNumber: string;
  campaignName?: string;
}

export const DonationReceiptEmail: React.FC<Readonly<DonationReceiptEmailProps>> = ({
  donorName,
  amount,
  date,
  receiptNumber,
  campaignName,
}) => (
  <Html>
    <Head />
    <Body style={{ fontFamily: 'sans-serif', backgroundColor: '#F2F2F2', padding: '20px' }}>
      <Container style={{ backgroundColor: '#ffffff', border: '1px solid #E0E0E0', borderRadius: '12px', padding: '40px', maxWidth: '600px' }}>
        
        {/* Placeholder for actual logo */}
        <Section style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ backgroundColor: '#BF3475', color: 'white', padding: '10px 20px', borderRadius: '8px', display: 'inline-block', fontWeight: 'bold' }}>
            Yuva Ekta India Foundation
          </div>
        </Section>
        
        <Heading style={{ color: '#1A1A2E', fontSize: '24px', marginBottom: '20px' }}>
          Thank you for your generous donation, {donorName}!
        </Heading>
        
        <Text style={{ color: '#6B6B6B', fontSize: '16px', lineHeight: '24px' }}>
          Your support is incredibly valuable to us. We have received your donation of <strong style={{ color: '#BF3475' }}>{formatCurrency(amount)}</strong>.
          {campaignName && <> This will go directly towards our <strong>{campaignName}</strong> initiative.</>}
        </Text>

        <Section style={{ backgroundColor: '#FCE8F0', padding: '20px', borderRadius: '8px', marginTop: '30px', marginBottom: '30px' }}>
          <Text style={{ margin: 0, color: '#1A1A2E', fontSize: '14px' }}><strong>Receipt No:</strong> {receiptNumber}</Text>
          <Text style={{ margin: '10px 0 0', color: '#1A1A2E', fontSize: '14px' }}><strong>Date:</strong> {formatDate(date)}</Text>
          <Text style={{ margin: '10px 0 0', color: '#1A1A2E', fontSize: '14px' }}><strong>Amount:</strong> {formatCurrency(amount)}</Text>
        </Section>

        <Hr style={{ borderColor: '#E0E0E0', marginBottom: '20px' }} />

        <Text style={{ color: '#6B6B6B', fontSize: '12px', textAlign: 'center' }}>
          Donations made to Yuva Ekta India Foundation are exempt from tax under Section 80G of the Income Tax Act. Keep this email for your records. Need a PDF receipt? Reply to this email and we will send one.
        </Text>
        <Text style={{ color: '#6B6B6B', fontSize: '12px', textAlign: 'center', marginTop: '10px' }}>
          Reg. No: 03485 | Contact: yuvaekta2018@gmail.com
        </Text>
      </Container>
    </Body>
  </Html>
);

export default DonationReceiptEmail;
