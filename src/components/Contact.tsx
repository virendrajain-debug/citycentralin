import { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Check } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1] as const;

const SERVICE_OPTIONS = [
  'Social Media Management',
  'Branding',
  'Video Production',
  'Brand Promotion',
  'Website Development',
  'SEO',
  'Google Ads',
  'Influencer Marketing',
  'Growth Strategy',
  'Other',
];

const BUDGET_OPTIONS = [
  '\u20B910,000 \u2013 \u20B925,000',
  '\u20B925,000 \u2013 \u20B950,000',
  '\u20B950,000 \u2013 \u20B91,00,000',
  '\u20B91,00,000+',
];

const PACKAGE_OPTIONS = ['Silver', 'Gold', 'Platinum', 'Custom'];

interface FormState {
  name: string;
  business: string;
  phone: string;
  email: string;
  service: string;
  budget: string;
  pkg: string;
  message: string;
}

const INITIAL_FORM: FormState = {
  name: '',
  business: '',
  phone: '',
  email: '',
  service: '',
  budget: '',
  pkg: '',
  message: '',
};

const LABEL_STYLE: React.CSSProperties = {
  display: 'block',
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--text-muted)',
  marginBottom: '10px',
};

const INPUT_STYLE: React.CSSProperties = {
  width: '100%',
  padding: '14px 0',
  fontSize: '15px',
  fontWeight: 400,
  color: 'var(--text-primary)',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--border-color)',
  outline: 'none',
  transition: 'border-color 0.3s ease',
  borderRadius: 0,
  appearance: 'none',
  WebkitAppearance: 'none',
};

const SELECT_STYLE: React.CSSProperties = {
  ...INPUT_STYLE,
  paddingRight: '24px',
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%238A8A8A' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 0 center',
};

function FieldGroup({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} style={LABEL_STYLE}>
        {label}
      </label>
      {children}
    </div>
  );
}

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = useCallback(
    (field: keyof FormState) =>
      (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
      },
    [],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm(INITIAL_FORM);
    }, 3000);
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'var(--electric-blue)';
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'var(--border-color)';
  };

  return (
    <section
      ref={containerRef}
      id="contact"
      style={{
        position: 'relative',
        padding: 'var(--section-padding) 0',
        background: 'linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%)',
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '-10%',
          transform: 'translateY(-50%)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(31,72,255,0.04) 0%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 var(--container-padding)',
        }}
      >
        <div style={{ overflow: 'hidden', marginBottom: '12px', textAlign: 'center' }}>
          <motion.span
            initial={{ y: '100%' }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease: ease }}
            className="section-label"
            style={{ display: 'inline-flex', justifyContent: 'center' }}
          >
            Contact
          </motion.span>
        </div>
        <div style={{ overflow: 'hidden', textAlign: 'center', marginBottom: '48px' }}>
          <motion.h2
            initial={{ y: '100%' }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.9, ease: ease }}
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              margin: '0 0 20px 0',
              color: 'var(--text-primary)',
            }}
          >
            Get In Touch
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.7, ease: ease }}
            style={{
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              lineHeight: 1.6,
              color: 'var(--text-muted)',
              margin: '0 auto',
              maxWidth: '500px',
            }}
          >
            Fill out the form and our team will get back to you within 24 hours with a tailored growth plan.
          </motion.p>
        </div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8, ease: ease }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: ease }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '400px',
                    textAlign: 'center',
                    gap: '24px',
                  }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                    style={{
                      width: '72px',
                      height: '72px',
                      borderRadius: '50%',
                      background: 'var(--electric-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Check size={36} color="#FFFFFF" strokeWidth={3} />
                  </motion.div>
                  <div>
                    <p
                      style={{
                        fontSize: 'clamp(22px, 2vw, 28px)',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        margin: '0 0 8px 0',
                      }}
                    >
                      Thank you!
                    </p>
                    <p
                      style={{
                        fontSize: '16px',
                        color: 'var(--text-muted)',
                        margin: 0,
                      }}
                    >
                      We'll get back to you within 24 hours.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '32px',
                  }}
                >
                  {/* Row: Name + Business */}
                  <div className="form-row-2">
                    <FieldGroup label="Name" htmlFor="name">
                      <input
                        id="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange('name')}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        style={INPUT_STYLE}
                        autoComplete="name"
                      />
                    </FieldGroup>
                    <FieldGroup label="Business Name" htmlFor="business">
                      <input
                        id="business"
                        type="text"
                        value={form.business}
                        onChange={handleChange('business')}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        style={INPUT_STYLE}
                      />
                    </FieldGroup>
                  </div>

                  {/* Row: Phone + Email */}
                  <div className="form-row-2">
                    <FieldGroup label="Phone" htmlFor="phone">
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={handleChange('phone')}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        style={INPUT_STYLE}
                        autoComplete="tel"
                      />
                    </FieldGroup>
                    <FieldGroup label="Email" htmlFor="email">
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange('email')}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        style={INPUT_STYLE}
                        autoComplete="email"
                      />
                    </FieldGroup>
                  </div>

                  {/* Row: Service + Budget + Package */}
                  <div className="form-row-3">
                    <FieldGroup label="Service" htmlFor="service">
                      <select
                        id="service"
                        required
                        value={form.service}
                        onChange={handleChange('service')}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        style={SELECT_STYLE}
                      >
                        <option value="">Select a service</option>
                        {SERVICE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </FieldGroup>
                    <FieldGroup label="Budget" htmlFor="budget">
                      <select
                        id="budget"
                        value={form.budget}
                        onChange={handleChange('budget')}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        style={SELECT_STYLE}
                      >
                        <option value="">Select budget</option>
                        {BUDGET_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </FieldGroup>
                    <FieldGroup label="Package" htmlFor="package">
                      <select
                        id="package"
                        value={form.pkg}
                        onChange={handleChange('pkg')}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                        style={SELECT_STYLE}
                      >
                        <option value="">Select package</option>
                        {PACKAGE_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </FieldGroup>
                  </div>

                  {/* Message */}
                  <FieldGroup label="Message" htmlFor="message">
                    <textarea
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange('message')}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      style={{
                        ...INPUT_STYLE,
                        resize: 'vertical',
                        minHeight: '100px',
                      }}
                    />
                  </FieldGroup>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      padding: '18px 32px',
                      fontSize: '14px',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: '#FFFFFF',
                      backgroundColor: 'var(--electric-blue)',
                      borderRadius: '8px',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = '#3A6AFF';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor =
                        'var(--electric-blue)';
                    }}
                  >
                    Send Message
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
      </div>

      <style>{`
        @media (min-width: 769px) {
          .form-row-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
          .form-row-3 {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            gap: 32px;
          }
        }
        @media (max-width: 768px) {
          .form-row-2,
          .form-row-3 {
            display: flex;
            flex-direction: column;
            gap: 32px;
          }
        }
      `}</style>
    </section>
  );
}
