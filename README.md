# Artha & Co. website

A responsive, five-page static website concept for an Indian chartered accountancy firm. Open `index.html` directly or serve this folder with a static web server.

## GitHub Pages deployment

The intended live URL is **[https://vikassingh2011.github.io/cawebsite/](https://vikassingh2011.github.io/cawebsite/)**. To publish it the first time, enable GitHub Pages for this repository in **Settings → Pages → Build and deployment → Source → GitHub Actions**, then rerun the failed Pages workflow. After the first successful deployment, updates pushed to `master` will deploy automatically.

## Supabase contact form

The contact page posts enquiries to the `contact_submissions` table in Supabase project `NameCA website` (Mumbai). `supabase-config.js` contains the project URL and browser-safe publishable key. Never put a secret or service-role key in this file. The table has row-level security and insert-only access for unauthenticated website visitors; no public read policy is created.

The Supabase project creation estimate was $0/month. Replace the sample firm identity, team, contact details, office information, metrics, and insights before launch.
