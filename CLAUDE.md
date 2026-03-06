# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Landing page for "Chop Chop Agency" — a digital agency targeting the German gastronomy/hospitality industry. The site is in German (lang="de"). Built as a single-page application with navigation, hero, features grid, contact form, and footer sections.

## Tech Stack

- **Next.js 16** with App Router (TypeScript)
- **React 19** with client components (`'use client'`)
- **Tailwind CSS v4** via `@tailwindcss/postcss` plugin (uses `@import "tailwindcss"` and `@theme` block syntax, not the v3 `@tailwind` directives)
- **Framer Motion** for animations
- **Lucide React** for icons
- **Supabase** client SDK (installed, not yet integrated)

## Commands

- `npm run dev` — start dev server (localhost:3000)
- `npm run build` — production build
- `npm run lint` — run ESLint (flat config, `eslint.config.mjs`)

## Architecture

- `app/layout.tsx` — root layout, loads Geist fonts, sets dark theme (black bg, white text)
- `app/page.tsx` — entire landing page as a single client component
- `app/globals.css` — Tailwind v4 import with custom theme colors
- `postcss.config.js` — PostCSS config using `@tailwindcss/postcss` (required `.js` extension for Next.js compatibility)
- Path alias: `@/*` maps to `./src/*` (configured in tsconfig but `src/` directory does not exist yet — code lives in `app/`)

## Key Conventions

- Dark theme throughout: black backgrounds, white text, white/opacity variants for secondary text
- Design system uses monochrome palette (black, white, zinc-950) with opacity modifiers
- Responsive: mobile-first with `md:` and `lg:` breakpoints
- Animations use Framer Motion `motion.div` with `whileInView` for scroll reveals
