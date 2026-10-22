# Artha & Co. website

A responsive, five-page React website for an Indian chartered accountancy firm, built with Vite. Run `npm install` and `npm run dev` to work locally; `npm run build` creates the deployable site in `dist/`.

## GitHub Pages deployment

The intended live URL is **[https://vikassingh2011.github.io/cawebsite/](https://vikassingh2011.github.io/cawebsite/)**. To publish it the first time, enable GitHub Pages for this repository in **Settings → Pages → Build and deployment → Source → GitHub Actions**, then rerun the failed Pages workflow. After the first successful deployment, updates pushed to `master` will deploy automatically.

## Supabase contact form

The contact page posts enquiries to the `contact_submissions` table in Supabase project `NameCA website` (Mumbai). `src/supabase-config.js` contains the project URL and browser-safe publishable key. Never put a secret or service-role key in this file. The table has row-level security and insert-only access for unauthenticated website visitors; no public read policy is created.

The Supabase project creation estimate was $0/month. Replace the sample firm identity, team, contact details, office information, metrics, and insights before launch.
