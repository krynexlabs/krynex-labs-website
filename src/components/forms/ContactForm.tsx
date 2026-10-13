'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertCircle, CheckCircle2, Loader2, Send, Mail } from 'lucide-react';
import { siteConfig } from '@/data/site-data';
import styles from './ContactForm.module.css';

const contactSchema = z.object({
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters.')
    .max(100, 'Full name cannot exceed 100 characters.'),
  email: z
    .string()
    .email('Please enter a valid business email address.')
    .max(100, 'Email cannot exceed 100 characters.'),
  category: z.string().min(1, 'Please select an inquiry category.'),
  subject: z.string().max(200, 'Subject cannot exceed 200 characters.').optional(),
  company: z.string().max(100, 'Company name cannot exceed 100 characters.').optional(),
  message: z
    .string()
    .min(10, 'Please provide at least 10 characters describing your inquiry.')
    .max(2000, 'Message cannot exceed 2000 characters.'),
  hp_field: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverErrorMessage, setServerErrorMessage] = useState<string>('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: '',
      email: '',
      category: 'General Support & Business Inquiries',
      subject: '',
      company: '',
      message: '',
      hp_field: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Honeypot check - discard bot submission cleanly
    if (data.hp_field) {
      setSubmissionStatus('success');
      return;
    }

    setSubmissionStatus('submitting');
    setServerErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit inquiry. Please try again.');
      }

      setSubmissionStatus('success');
      reset();
    } catch (err: unknown) {
      setSubmissionStatus('error');
      setServerErrorMessage(
        err instanceof Error ? err.message : 'An unexpected network error occurred.'
      );
    }
  };

  if (submissionStatus === 'success') {
    return (
      <div className={styles.successCard} role="status">
        <CheckCircle2 size={48} className={styles.successIcon} />
        <h3 className={styles.successTitle}>Inquiry Successfully Sent</h3>
        <p className={styles.successDesc}>
          Thank you for reaching out. Your inquiry has been routed directly to our official support desk at{' '}
          <strong style={{ color: 'var(--color-accent)' }}>{siteConfig.supportEmail}</strong>.
          Our team reviews all submissions and will respond within 1–2 business days.
        </p>
        <button
          type="button"
          onClick={() => setSubmissionStatus('idle')}
          className="btn btn-secondary"
          style={{ marginTop: '1.75rem' }}
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form} noValidate>
      {/* Honeypot field (hidden from human visitors) */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <label htmlFor="hp_field">Do not fill this field</label>
        <input
          id="hp_field"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register('hp_field')}
        />
      </div>

      {submissionStatus === 'error' && (
        <div className={styles.errorAlert} role="alert">
          <AlertCircle size={20} className={styles.errorIcon} />
          <div>
            <p>{serverErrorMessage || 'Unable to send message right now.'}</p>
            <p style={{ marginTop: '0.35rem', fontSize: '0.8125rem' }}>
              Direct email support:{' '}
              <a href={`mailto:${siteConfig.supportEmail}`} className={styles.errorLink}>
                {siteConfig.supportEmail}
              </a>
            </p>
          </div>
        </div>
      )}

      {/* Row 1: Full Name and Business Email */}
      <div className={styles.gridRow}>
        <div className="form-group">
          <label htmlFor="fullName" className="form-label">
            Full Name <span className={styles.req}>*</span>
          </label>
          <input
            id="fullName"
            type="text"
            className="form-input"
            placeholder="e.g. Alex Morgan"
            autoComplete="name"
            disabled={submissionStatus === 'submitting'}
            aria-invalid={!!errors.fullName}
            aria-describedby={errors.fullName ? 'fullName-error' : undefined}
            {...register('fullName')}
          />
          {errors.fullName && (
            <p id="fullName-error" className={styles.fieldError}>
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Business Email <span className={styles.req}>*</span>
          </label>
          <input
            id="email"
            type="email"
            className="form-input"
            placeholder="a.morgan@company.com"
            autoComplete="email"
            disabled={submissionStatus === 'submitting'}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
          {errors.email && (
            <p id="email-error" className={styles.fieldError}>
              {errors.email.message}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Inquiry Category and Subject */}
      <div className={styles.gridRow}>
        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Inquiry Category <span className={styles.req}>*</span>
          </label>
          <select
            id="category"
            className="form-input"
            disabled={submissionStatus === 'submitting'}
            aria-invalid={!!errors.category}
            aria-describedby={errors.category ? 'category-error' : undefined}
            {...register('category')}
          >
            <option value="General Support & Business Inquiries">General Support &amp; Inquiries</option>
            <option value="SaaS Product Inquiries">SaaS Product Inquiries</option>
            <option value="Software Licensing & Access">Software Licensing &amp; Access</option>
            <option value="Technical Support">Technical &amp; Operational Support</option>
            <option value="Corporate & Partnerships">Corporate &amp; Partnerships</option>
          </select>
          {errors.category && (
            <p id="category-error" className={styles.fieldError}>
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="subject" className="form-label">
            Subject / Topic <span className={styles.optional}>(Optional)</span>
          </label>
          <input
            id="subject"
            type="text"
            className="form-input"
            placeholder="e.g. Licensing inquiry or product question"
            disabled={submissionStatus === 'submitting'}
            {...register('subject')}
          />
        </div>
      </div>

      {/* Row 3: Company Name (Optional) */}
      <div className="form-group">
        <label htmlFor="company" className="form-label">
          Company / Organization <span className={styles.optional}>(Optional)</span>
        </label>
        <input
          id="company"
          type="text"
          className="form-input"
          placeholder="e.g. Morgan Dynamics"
          autoComplete="organization"
          disabled={submissionStatus === 'submitting'}
          {...register('company')}
        />
      </div>

      {/* Row 4: Message */}
      <div className="form-group">
        <label htmlFor="message" className="form-label">
          Message <span className={styles.req}>*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          className="form-input"
          placeholder="Tell us about your operational workflows, software requirements, or questions..."
          disabled={submissionStatus === 'submitting'}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          {...register('message')}
        />
        {errors.message && (
          <p id="message-error" className={styles.fieldError}>
            {errors.message.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submissionStatus === 'submitting'}
        className="btn btn-primary"
        style={{ width: '100%', justifyContent: 'center' }}
      >
        {submissionStatus === 'submitting' ? (
          <>
            <Loader2 size={16} className={styles.spin} />
            Sending to Support Desk...
          </>
        ) : (
          <>
            <Send size={16} />
            Send Inquiry to support@krynexlabs.in
          </>
        )}
      </button>

      <div className={styles.formNote}>
        <Mail size={13} aria-hidden="true" />
        <span>Official support recipient: {siteConfig.supportEmail}</span>
      </div>
    </form>
  );
}
