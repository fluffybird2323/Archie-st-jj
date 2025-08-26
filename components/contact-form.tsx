'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { getDictionary } from '@/lib/i18n/utils';
import { useCart } from '@/lib/cart-context';

export function ContactForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });
  const { locale } = useCart();
  const dict = getDictionary(locale);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.subject || !formData.message) {
      setStatus(dict.contact.fillAllFields || 'Please fill in all fields.');
      return;
    }

    setIsLoading(true);
    setStatus('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setStatus(dict.contact.messageSent || 'Message sent successfully!');
      setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus(dict.contact.messageFailed || 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status && <p className="text-sm text-gray-600">{status}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            {dict.contact.firstName}
          </label>
          <Input id="firstName" type="text" placeholder={dict.contact.firstName} value={formData.firstName} onChange={handleChange} className="w-full" />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            {dict.contact.lastName}
          </label>
          <Input id="lastName" type="text" placeholder={dict.contact.lastName} value={formData.lastName} onChange={handleChange} className="w-full" />
        </div>
      </div>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          {dict.contact.email}
        </label>
        <Input id="email" type="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} className="w-full" />
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
          {dict.contact.subject}
        </label>
        <Input id="subject" type="text" placeholder={dict.contact.howCanWeHelp || "How can we help you?"} value={formData.subject} onChange={handleChange} className="w-full" />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          {dict.contact.message}
        </label>
        <Textarea id="message" placeholder={dict.contact.tellUsMore || "Tell us more about your inquiry..."} rows={6} value={formData.message} onChange={handleChange} className="w-full" />
      </div>
      <Button type="submit" disabled={isLoading} className="w-full bg-black text-white py-3 text-lg font-semibold hover:bg-gray-800 transition-colors">
        {isLoading ? dict.common.loading : dict.contact.sendMessage}
      </Button>
    </form>
  );
}
