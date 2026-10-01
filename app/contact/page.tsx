import type { Metadata } from 'next';
import ContactPageContent from './ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    "Get in touch about your next website project. Tell me what you're building and I'll reply within one business day with next steps and a scope check.",
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact | Chloe Nixon',
    description:
      "Get in touch about your next website project. Tell me what you're building and I'll reply within one business day.",
    url: 'https://chloenixon.com/contact',
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
