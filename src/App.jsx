import { useState } from 'react';
import parse from 'html-react-parser';
import './supabase-config.js';
import '../styles.css';
import '../refinements.css';
import homeContent from './content/index.html?raw';
import servicesContent from './content/services.html?raw';
import aboutContent from './content/about.html?raw';
import insightsContent from './content/insights.html?raw';
import contactContent from './content/contact.html?raw';

const pages = {
  home: { title: "Artha & Co. | Clarity for what's next", content: homeContent },
  services: { title: 'Services | Artha & Co.', content: servicesContent },
  about: { title: 'About us | Artha & Co.', content: aboutContent },
  insights: { title: 'Insights | Artha & Co.', content: insightsContent },
  contact: { title: 'Contact | Artha & Co.', content: contactContent },
};

function Header({ page }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="topline">
        <div className="wrap top-inner">
          <span>Chartered accountancy for the next generation of Indian business.</span>
          <a href="contact.html#contact-form">Talk to an advisor <span>↗</span></a>
        </div>
      </div>
      <header className="site-header">
        <div className="wrap nav-wrap">
          <a className="brand" href="index.html" aria-label="Artha and Co. home" onClick={closeMenu}>
            <span className="brand-mark">a<span>.</span></span>
            <span className="brand-name">artha<span>& co.</span><small>CHARTERED ACCOUNTANTS</small></span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span></span><span></span>
          </button>
          <nav className={`nav-links${menuOpen ? ' open' : ''}`} aria-label="Main navigation">
            <a className={page === 'home' ? 'active' : ''} href="index.html" onClick={closeMenu}>Home</a>
            <a className={page === 'services' ? 'active' : ''} href="services.html" onClick={closeMenu}>Services</a>
            <a className={page === 'about' ? 'active' : ''} href="about.html" onClick={closeMenu}>About us</a>
            <a className={page === 'insights' ? 'active' : ''} href="insights.html" onClick={closeMenu}>Insights</a>
            <a className="nav-cta" href="contact.html#contact-form" onClick={closeMenu}>Let's talk <span>↗</span></a>
          </nav>
        </div>
      </header>
    </>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-main">
          <a className="brand brand-footer" href="index.html">
            <span className="brand-mark">a<span>.</span></span>
            <span className="brand-name">artha<span>& co.</span><small>CHARTERED ACCOUNTANTS</small></span>
          </a>
          <p>Clear thinking for<br />ambitious business.</p>
          <div className="footer-nav">
            <a href="services.html">Services</a><a href="about.html">About us</a>
            <a href="contact.html">Contact</a><a href="insights.html">Insights</a>
          </div>
          <div className="footer-contact">
            <span>LET'S TALK</span><a href="mailto:hello@arthaandco.in">hello@arthaandco.in ↗</a>
            <small>Mumbai · Bengaluru · New Delhi</small>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Artha & Co. Chartered Accountants</span>
          <span>Built on trust. Ready for tomorrow.</span>
          <a href="contact.html">Privacy & legal</a>
        </div>
      </div>
    </footer>
  );
}

function ContactForm() {
  const [status, setStatus] = useState({ message: '', error: false });
  const [sending, setSending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;

    const config = window.SUPABASE_CONFIG;
    if (!config?.url || !config?.publishableKey) {
      setStatus({ message: 'This enquiry form is not connected yet. Please email hello@arthaandco.in.', error: true });
      return;
    }

    const values = new FormData(form);
    const submission = {
      full_name: String(values.get('name') || '').trim(),
      business_name: String(values.get('business') || '').trim() || null,
      email: String(values.get('email') || '').trim(),
      phone: String(values.get('phone') || '').trim() || null,
      service: String(values.get('service') || '').trim() || null,
      message: String(values.get('message') || '').trim(),
    };

    setSending(true);
    setStatus({ message: 'Sending your enquiry…', error: false });
    try {
      const response = await fetch(`${config.url.replace(/\/$/, '')}/rest/v1/contact_submissions`, {
        method: 'POST',
        headers: {
          apikey: config.publishableKey,
          Authorization: `Bearer ${config.publishableKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify(submission),
      });
      if (!response.ok) throw new Error(`Submission failed (${response.status})`);
      form.reset();
      setStatus({ message: 'Thank you. Your enquiry has been received, and our team will be in touch.', error: false });
    } catch (error) {
      console.error('Contact form submission error:', error);
      setStatus({ message: 'We could not send your enquiry just now. Please email hello@arthaandco.in.', error: true });
    } finally {
      setSending(false);
    }
  }

  return (
    <form className="contact-form" id="contact-form" onSubmit={handleSubmit}>
      <h3>How can we help?</h3>
      <div className="form-grid">
        <div className="field"><label htmlFor="name">Your name *</label><input id="name" name="name" autoComplete="name" required /></div>
        <div className="field"><label htmlFor="business">Business name</label><input id="business" name="business" autoComplete="organization" /></div>
        <div className="field"><label htmlFor="email">Work email *</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
        <div className="field"><label htmlFor="phone">Phone number</label><input id="phone" name="phone" type="tel" autoComplete="tel" /></div>
        <div className="field full">
          <label htmlFor="service">What would you like help with?</label>
          <select id="service" name="service">
            <option value="">Choose a service</option><option>Tax & GST</option><option>Audit & assurance</option>
            <option>Business advisory</option><option>Company setup & compliance</option>
            <option>Accounting & payroll</option><option>Something else</option>
          </select>
        </div>
        <div className="field full"><label htmlFor="message">A little about what you need *</label><textarea id="message" name="message" required /></div>
      </div>
      <button className="button button-dark form-submit" type="submit" disabled={sending} aria-busy={sending}>
        {sending ? 'Sending…' : 'Send your enquiry'} <span>↗</span>
      </button>
      <p className="form-note">Your details will be used to respond to your enquiry and stored securely in our CRM database.</p>
      <p className={`success-message visible${status.error ? ' error' : ''}`} role="status" aria-live="polite">{status.message}</p>
    </form>
  );
}

function PageContent({ page, content }) {
  return parse(content, {
    replace(node) {
      if (page === 'contact' && node.type === 'tag' && node.name === 'form' && node.attribs.id === 'contact-form') {
        return <ContactForm />;
      }
      return undefined;
    },
  });
}

export default function App() {
  const page = document.getElementById('root')?.dataset.page || 'home';
  const current = pages[page] || pages.home;
  document.title = current.title;

  return (
    <>
      <Header page={page} />
      <main><PageContent page={page} content={current.content} /></main>
      <Footer />
    </>
  );
}
