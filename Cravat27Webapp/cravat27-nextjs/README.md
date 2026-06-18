# Cravat27 — The Barbershop (Next.js)

Full-stack rebuild of the Cravat27 barbershop site with a simple admin dashboard.

- **Framework:** Next.js 16 (App Router)
- **Database/Auth/Storage:** Supabase
- **Styling:** Tailwind + inline brand styles
- **Deploy:** Vercel

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
```

The site works **immediately** with built-in seed data (the 18 services and
their photos are bundled in `public/services/`). Supabase is only needed for the
admin dashboard and live editing.

## Connecting Supabase (enables the admin dashboard)

1. Create a project at [supabase.com](https://supabase.com).
2. In the dashboard go to **SQL Editor → New query**, paste the contents of
   [`supabase-setup.sql`](./supabase-setup.sql), and run it. This creates the
   `services`, `business_info`, and `gallery` tables, seeds them, sets up
   row-level security, and creates the public `images` storage bucket.
3. Go to **Project Settings → API** and copy your **Project URL** and
   **anon public key**.
4. Put them in `.env.local`:

   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
   ```

5. Restart `npm run dev`. The site now reads from the database.

## Creating the admin login

The owner is the only user. Create the account manually:

- Supabase dashboard → **Authentication → Users → Add user** → enter email +
  password. No public sign-up flow exists.

> **Note:** The admin pages at `/admin` are currently open in dev. Before
> going live, add Supabase Auth gating (a login page + middleware) so only the
> owner can reach `/admin`. The data is already protected at the database level
> by RLS — only authenticated requests can write — but the admin UI itself
> should be put behind a login. See "Next steps" below.

## Admin dashboard

- `/admin` — home with quick stats and links
- `/admin/services` — edit name, price, duration, photo (upload), and
  visibility for each service; changes appear on the live site within ~1 minute
- `/admin/info` — edit hours, phone, email, address, and booking URL
- `/admin/gallery` — placeholder for future photo uploads

## Deploying to Vercel

1. Push this folder to a GitHub repo.
2. Import it in Vercel.
3. Add the two `NEXT_PUBLIC_SUPABASE_*` environment variables in the Vercel
   project settings.
4. Deploy.

## Next steps / not yet built

- **Admin auth gating** — login page + route protection for `/admin`.
- **Drag-to-reorder** services (the `display_order` column exists and is used).
- **Gallery uploads** in the admin (table + storage are ready).
