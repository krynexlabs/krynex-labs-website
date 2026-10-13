'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
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
        <h3 className={styles.successTitle}>Message Successfully Sent</h3>
        <p className={styles.successDesc}>
          Thank you for reaching out to Krynex Labs. Your inquiry has been received by our team and we will respond within 1–2 business days.
        </p>
        <button
          type="button"
          onClick={() => setSubmissionStatus('idle')}
          className="btn btn-secondary"
          style={{ marginTop: '1.5rem' }}
        >
          Send Another Message
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
          <AlertCircle size={18} />
          <span>{serverErrorMessage || 'Unable to send message. Please verify your details.'}</span>
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

      {/* Row 2: Company Name (Optional) */}
      <div className="form-group">
        <label htmlFor="company" className="form-label">
          Company Name <span className={styles.optional}>(Optional)</span>
        </label>
        <input
          id="company"
          type="text"
          className="form-input"
          placeholder="e.g. Morgan Dynamics"
          autoComplete="organization"
          {...register('company')}
        />
      </div>

      {/* Row 3: Message */}
      <div className="form-group">
        <label htmlFor="message" className="form-label">
          Message <span className={styles.req}>*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          className="form-textarea"
          placeholder="Tell us about your business, operational requirements, or software needs..."
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
            Sending Message...
          </>
        ) : (
          <>
            <Send size={16} />
            Contact Krynex Labs
          </>
        )}
      </button>
    </form>
  );
}
