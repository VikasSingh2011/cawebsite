const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const status = form.querySelector('.success-message');
    const submitButton = form.querySelector('[type="submit"]');
    const config = window.SUPABASE_CONFIG;
    if (!config?.url || !config?.publishableKey) {
      status.textContent = 'This enquiry form is not connected yet. Please email hello@arthaandco.in.';
      status.classList.add('visible');
      status.classList.add('error');
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

    submitButton.disabled = true;
    submitButton.setAttribute('aria-busy', 'true');
    status.textContent = 'Sending your enquiry…';
    status.classList.add('visible');
    status.classList.remove('error');

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
      status.textContent = 'Thank you. Your enquiry has been received, and our team will be in touch.';
      status.classList.add('visible');
    } catch (error) {
      console.error('Contact form submission error:', error);
      status.textContent = 'We could not send your enquiry just now. Please email hello@arthaandco.in.';
      status.classList.add('visible');
      status.classList.add('error');
    } finally {
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
    }
  });
}
