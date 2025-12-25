# Sakshi Bhargava — Portfolio

Portfolio website built with Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, and React Hook Form.

## Tech

- Next.js + React
- TypeScript
- Tailwind CSS v4
- Framer Motion
- React Hook Form
- EmailJS (contact form)
- Google Analytics 4 (optional)

## Local development

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Environment variables

Create a `.env.local` file in the project root (this file is gitignored).

### EmailJS

Required for the contact form to send emails:

```bash
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

### Google Analytics 4 (optional)

```bash
NEXT_PUBLIC_GA_MEASUREMENT_ID=
```

## Images

This repo includes SVG placeholders under `public/images/`. Replace them with optimized WebP assets when ready:

- `public/images/profile-photo.webp` (400x400, quality ~85)
- `public/images/project-1.webp` (800x600, quality ~80)
- `public/images/project-2.webp` (800x600, quality ~80)
- `public/images/project-3.webp` (800x600, quality ~80)

## Deployment (Vercel)

This project includes a `vercel.json` with security headers and environment variable bindings.

1. Push this repo to GitHub
2. Import into Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Vercel CLI (optional)

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Production build

```bash
npm run build
npm start
```
