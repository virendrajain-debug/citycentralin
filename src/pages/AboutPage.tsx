import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, ArrowLeft, Sparkles } from 'lucide-react';
import { goHome, PHONE_DISPLAY, PHONE_TEL, EMAIL_DISPLAY, EMAIL_MAILTO } from '../lib/router';

const ease = [0.16, 1, 0.3, 1] as const;

const PILLS = ['Strategy-first', 'Creative Studio', 'Data-driven', 'Full-Service', 'Made in Indore'] as const;

const VALUE_PILLARS = [
  { index: '01', title: 'Strategy', text: 'Every brand starts with a sharp, honest strategy built around real audience insight.' },
  { index: '02', title: 'Creativity', text: 'We design content people actually remember — bold, beautiful and on-brand.' },
  { index: '03', title: 'Growth', text: 'Data-backed decisions that turn attention into revenue and fans into buyers.' },
] as const;

const ADDRESSES = [
  { label: 'Registered Office', lines: ['301/1, Preconco Colony', 'Indore, Madhya Pradesh, India'] },
  { label: 'Studio Address', lines: ['Moneyarc Apartment, D Block', 'Indore, PIN 452009, India'] },
] as const;

function MarqueeRow() {
  return (
    <div className="about-marquee">
      <div className="about-marquee-track">
        {[0, 1].map((dup) => (
          <span key={dup} aria-hidden={dup === 1}>
            {['STRATEGY', 'CREATIVITY', 'BRANDING', 'CONTENT', 'GROWTH', 'SOCIAL MEDIA', 'WEB'].map((word) => (
              <em key={`${dup}-${word}`}>
                {word} <i>✦</i>
              </em>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

function FounderMonogram() {
  return (
    <div className="about-monogram-wrap">
      <span className="about-ring about-ring-1" />
      <span className="about-ring about-ring-2" />
      <span className="about-ring about-ring-3" />
      <span className="about-ring about-ring-dot" />
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        className="about-monogram"
      >
        <span>D</span>
        <span>N</span>
      </motion.div>
    </div>
  );
}

function ContactCard({
  icon,
  title,
  children,
  href,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  href?: string;
  index: number;
}) {
  const inner = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: 0.15 + index * 0.1, duration: 0.7, ease: ease }}
      className="about-contact-card-inner"
    >
      <span className="about-contact-icon">{icon}</span>
      <span className="about-contact-label">{title}</span>
      <span className="about-contact-value">{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        className="about-contact-card"
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {inner}
      </a>
    );
  }
  return <div className="about-contact-card">{inner}</div>;
}

export default function AboutPage() {
  return (
    <>
      <style>{`
        @keyframes aboutMarquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes aboutPulse {
          0%, 100% { opacity: 0.15; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.35; transform: translate(-50%, -50%) scale(1.25); }
        }
        @keyframes aboutSpin {
          to { transform: rotate(360deg); }
        }
        .about-marquee {
          overflow: hidden;
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          padding: 18px 0;
          background: var(--bg-primary);
        }
        .about-marquee-track {
          display: flex;
          width: max-content;
          animation: aboutMarquee 28s linear infinite;
        }
        .about-marquee span {
          display: inline-flex;
          white-space: nowrap;
        }
        .about-marquee em {
          font-style: normal;
          font-size: clamp(20px, 3vw, 40px);
          font-weight: 800;
          letter-spacing: -0.02em;
          color: var(--text-primary);
          display: inline-flex;
          align-items: center;
          gap: 28px;
          padding-right: 28px;
        }
        .about-marquee i {
          font-style: normal;
          color: var(--electric-blue);
          font-size: 0.6em;
        }
        .about-monogram-wrap {
          position: relative;
          width: min(340px, 80vw);
          height: min(340px, 80vw);
          margin: 0 auto;
        }
        .about-ring {
          position: absolute;
          border-radius: 50%;
        }
        .about-ring-1 {
          inset: 0;
          border: 1px dashed rgba(31, 72, 255, 0.35);
          animation: aboutSpin 40s linear infinite;
        }
        .about-ring-2 {
          inset: 24px;
          border: 1px solid var(--border-color);
        }
        .about-ring-3 {
          inset: 48px;
          border: 1px solid rgba(31, 72, 255, 0.25);
          animation: aboutSpin 26s linear infinite reverse;
        }
        .about-ring-dot {
          width: 14px;
          height: 14px;
          top: 18px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--electric-blue);
          box-shadow: 0 0 24px rgba(31, 72, 255, 0.8);
        }
        .about-monogram {
          position: absolute;
          inset: 72px;
          border-radius: 50%;
          background: linear-gradient(145deg, var(--electric-blue) 0%, #0D3AE6 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          box-shadow: 0 30px 80px rgba(31, 72, 255, 0.35);
        }
        .about-monogram span {
          font-size: clamp(48px, 8vw, 76px);
          font-weight: 900;
          color: #FFFFFF;
          letter-spacing: -0.05em;
        }
        .about-value-card {
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 32px;
          background: var(--card-bg);
          transition: border-color 0.3s ease, transform 0.3s ease;
        }
        .about-value-card:hover {
          border-color: var(--electric-blue);
          transform: translateY(-4px);
        }
        .about-contact-card {
          display: block;
          color: inherit;
          text-decoration: none;
        }
        .about-contact-card-inner {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
          border: 1px solid var(--border-color);
          border-radius: 16px;
          padding: 40px 28px;
          height: 100%;
          background: var(--card-bg);
          transition: border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
        }
        .about-contact-card:hover .about-contact-card-inner {
          border-color: var(--electric-blue);
          transform: translateY(-4px);
          box-shadow: 0 20px 50px rgba(31, 72, 255, 0.12);
        }
        .about-contact-icon {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--electric-blue);
          border: 1px solid var(--border-color);
          background: var(--bg-primary);
        }
        .about-contact-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--text-muted);
        }
        .about-contact-value {
          font-size: 16px;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.5;
        }
        @media (max-width: 768px) {
          .about-monogram-wrap {
            width: 260px;
            height: 260px;
          }
          .about-monogram {
            inset: 56px;
          }
          .about-marquee em {
            font-size: 24px;
          }
        }
      `}</style>

      {/* HERO */}
      <section
        className="about-hero"
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#08090D',
          overflow: 'hidden',
          paddingTop: '80px',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.04,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '35%',
            left: '50%',
            width: '820px',
            height: '820px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(31,72,255,0.16) 0%, rgba(31,72,255,0) 70%)',
            filter: 'blur(70px)',
            animation: 'aboutPulse 8s ease-in-out infinite',
          }}
        />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: '100%',
            maxWidth: 'var(--container-width)',
            margin: '0 auto',
            padding: '100px var(--container-padding)',
            textAlign: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: ease }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 22px',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '100px',
              marginBottom: '40px',
            }}
          >
            <Sparkles size={14} color="var(--electric-blue)" />
            <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.18em', color: '#C8C8C8' }}>
              THE STORY BEHIND THE BRAND
            </span>
          </motion.div>

          <div style={{ overflow: 'hidden' }}>
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.35, duration: 0.9, ease: ease }}
              style={{
                fontSize: 'clamp(64px, 16vw, 220px)',
                fontWeight: 900,
                lineHeight: 0.9,
                letterSpacing: '-0.05em',
                color: 'rgba(255,255,255,0.12)',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              ABOUT
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <motion.p
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 0.9, ease: ease }}
              style={{
                fontSize: 'clamp(24px, 5vw, 68px)',
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: 'var(--electric-blue)',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              City Central India
            </motion.p>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: ease }}
            style={{
              maxWidth: '640px',
              margin: '32px auto 0',
              fontSize: 'clamp(15px, 1.2vw, 18px)',
              lineHeight: 1.7,
              color: '#C8C8C8',
            }}
          >
            A premium Social Media, Branding &amp; Digital Growth agency built in Indore —
            turning ambitious businesses into powerful brands.
          </motion.p>
        </div>
      </section>

      <MarqueeRow />

      {/* STORY */}
      <section style={{ position: 'relative', padding: 'var(--section-padding) 0' }}>
        <div
          className="container"
          style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '0 var(--container-padding)' }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px' }}>
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                initial={{ y: '100%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: ease }}
                style={{
                  fontSize: 'clamp(34px, 5vw, 68px)',
                  fontWeight: 800,
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-primary)',
                  margin: 0,
                }}
              >
                WHO WE <span style={{ color: 'var(--electric-blue)' }}>ARE</span>
              </motion.h2>
            </div>

            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.8, ease: ease }}
                style={{ fontSize: 'clamp(15px, 1.2vw, 18px)', lineHeight: 1.8, color: 'var(--text-secondary)', maxWidth: '720px' }}
              >
                CITY CENTRAL INDIA helps businesses create powerful digital identities through
                strategic branding, creative storytelling, AI-powered marketing and
                high-performance websites. We don't chase vanity metrics — we engineer
                growth systems that convert attention into loyal customers.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.8, ease: ease }}
                style={{ fontSize: 'clamp(15px, 1.2vw, 18px)', lineHeight: 1.8, color: 'var(--text-secondary)', maxWidth: '720px', marginTop: '20px' }}
              >
                From the heart of Madhya Pradesh, we blend creativity with data to deliver
                measurable business growth — for local heroes and rising brands across India.
              </motion.p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '36px' }}>
                {PILLS.map((pill, i) => (
                  <motion.span
                    key={pill}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.5, ease: ease }}
                    style={{
                      padding: '10px 20px',
                      fontSize: '12px',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-color)',
                      borderRadius: '100px',
                    }}
                  >
                    {pill}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section
        id="founder"
        style={{
          position: 'relative',
          padding: 'var(--section-padding) 0',
          background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: 0.025,
            backgroundImage:
              'linear-gradient(var(--text-muted) 1px, transparent 1px), linear-gradient(90deg, var(--text-muted) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
            pointerEvents: 'none',
          }}
        />

        <div
          className="container"
          style={{ position: 'relative', zIndex: 1, maxWidth: 'var(--container-width)', margin: '0 auto', padding: '0 var(--container-padding)' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '80px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', justifyContent: 'center', marginBottom: '20px' }}>
              <span className="section-label" style={{ display: 'inline-flex' }}>Founder Spotlight</span>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                initial={{ y: '100%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: ease }}
                style={{
                  fontSize: 'clamp(36px, 5.5vw, 76px)',
                  fontWeight: 900,
                  lineHeight: 1.02,
                  letterSpacing: '-0.03em',
                  color: 'var(--text-primary)',
                  margin: 0,
                }}
              >
                THE MIND BEHIND
              </motion.h2>
            </div>
            <div style={{ overflow: 'hidden' }}>
              <motion.h2
                initial={{ y: '100%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15, duration: 0.9, ease: ease }}
                style={{
                  fontSize: 'clamp(36px, 5.5vw, 76px)',
                  fontWeight: 900,
                  lineHeight: 1.02,
                  letterSpacing: '-0.03em',
                  color: 'var(--electric-blue)',
                  margin: 0,
                }}
              >
                THE VISION
              </motion.h2>
            </div>
          </div>

          <FounderMonogram />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.8, ease: ease }}
            style={{ textAlign: 'center', marginTop: '64px' }}
          >
            <p
              style={{
                fontSize: 'clamp(40px, 6vw, 72px)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              Divyansh Namdev
            </p>
            <p
              style={{
                fontSize: '13px',
                fontWeight: 700,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'var(--electric-blue)',
                margin: '16px 0 32px',
              }}
            >
              Founder &amp; CEO — City Central India
            </p>

            <p
              style={{
                maxWidth: '680px',
                margin: '0 auto 48px',
                fontSize: 'clamp(15px, 1.2vw, 18px)',
                lineHeight: 1.8,
                color: 'var(--text-secondary)',
              }}
            >
              Divyansh Namdev founded CITY CENTRAL INDIA with a single belief — that every
              business, big or small, deserves a brand people remember. A creative at heart
              and a strategist by discipline, he leads the studio with a relentless focus on
              design, storytelling and measurable growth.
            </p>

            <blockquote
              style={{
                maxWidth: '720px',
                margin: '0 auto 72px',
                padding: '32px 40px',
                borderLeft: '3px solid var(--electric-blue)',
                background: 'var(--card-bg)',
                borderRadius: '0 16px 16px 0',
                fontSize: 'clamp(18px, 2vw, 26px)',
                fontWeight: 600,
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                color: 'var(--text-primary)',
                fontStyle: 'italic',
              }}
            >
              "Brands aren't built by louder noise — they're built by bolder identity, sharper
              stories and consistent growth."
            </blockquote>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gap: '24px',
            }}
            className="about-values"
          >
            {VALUE_PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.index}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: 0.2 + i * 0.12, duration: 0.7, ease: ease }}
                className="about-value-card"
              >
                <span style={{ fontSize: '12px', fontWeight: 800, letterSpacing: '0.2em', color: 'var(--electric-blue)' }}>
                  {pillar.index}
                </span>
                <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', margin: '12px 0 10px' }}>
                  {pillar.title}
                </h3>
                <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0 }}>
                  {pillar.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="about-contact" style={{ position: 'relative', padding: 'var(--section-padding) 0' }}>
        <div
          className="container"
          style={{ maxWidth: 'var(--container-width)', margin: '0 auto', padding: '0 var(--container-padding)' }}
        >
          <div style={{ textAlign: 'center', marginBottom: '64px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
              <span className="section-label">Get In Touch</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: ease }}
              style={{
                fontSize: 'clamp(34px, 5vw, 68px)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              LET'S BUILD TOGETHER
            </motion.h2>
          </div>

          <div style={{ display: 'grid', gap: '24px' }} className="about-contact-grid">
            <ContactCard index={0} icon={<Phone size={22} />} title="Call Us" href={PHONE_TEL}>
              {PHONE_DISPLAY}
            </ContactCard>
            <ContactCard index={1} icon={<Mail size={22} />} title="Email Us" href={EMAIL_MAILTO}>
              {EMAIL_DISPLAY}
            </ContactCard>
            {ADDRESSES.map((addr, i) => (
              <ContactCard key={addr.label} index={i + 2} icon={<MapPin size={22} />} title={addr.label}>
                {addr.lines.map((line) => (
                  <span key={line} style={{ display: 'block' }}>
                    {line}
                  </span>
                ))}
              </ContactCard>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.7, ease: ease }}
            style={{ textAlign: 'center', marginTop: '64px' }}
          >
            <button
              onClick={goHome}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '18px 40px',
                fontSize: '14px',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: '#FFFFFF',
                backgroundColor: 'var(--electric-blue)',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                transition: 'background-color 0.3s ease, transform 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--accent-hover)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--electric-blue)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <ArrowLeft size={18} />
              Back to Homepage
            </button>
          </motion.div>
        </div>
      </section>

      <style>{`
        .about-values { grid-template-columns: repeat(3, 1fr); }
        .about-contact-grid { grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 1024px) {
          .about-values, .about-contact-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
        }
        @media (max-width: 640px) {
          .about-values, .about-contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}