# BITE RIOT — complete restaurant website project

A Next.js 15 + React 19 restaurant discovery and ordering website for BITE RIOT. This complete project includes the original supplied food photography, a botanical forest-green / warm-ivory / lime visual identity, custom illustrated brand characters, editorial page layouts, a SQLite product/order database, and the ordering flow.

## Requirements

- Node.js 20 or newer
- npm

## Windows setup

Open this folder in VS Code. Open Terminal > New Terminal and make sure the terminal is in the folder containing `package.json`.

Run these commands one at a time:

```powershell
npm.cmd install
npm.cmd run db:seed
npm.cmd run dev
```

Open http://localhost:3000.

`npm.cmd install` installs dependencies and runs Prisma client generation. `npm.cmd run db:seed` safely upserts the 80 intended products; it does not delete existing orders. The database is stored in `prisma/dev.db`.

For the full beginner-friendly Windows instructions, see `START-HERE-WINDOWS.txt`.

## Pages

- `/` — Home
- `/menu` — Menu, eight categories, product search and category navigation
- `/menu/[slug]` — Product details
- `/combos` — Combo discovery
- `/offers` — Offers and campaign information
- `/story` — Brand story and editorial photo gallery
- `/cart` — Bag and order summary
- `/checkout` — Order request form and summary
- `/account` — Customer account information and order tracking link
- `/track` — Order tracking
- `/admin` — Admin area

## Important service configuration

The checkout currently creates an order request. Online payment is not enabled and the site does not collect card information. Customer password sign-in is not configured; `/account` explains this and links to order tracking. Before taking real orders, configure the restaurant's contact details, opening hours, delivery rules, admin credentials, payment provider, and legal policies.

## Catalogue and image handling

The site uses the supplied original BITE RIOT images. Product images follow the numbered category mapping in `src/lib/bite-riot-images.ts`. A built-in local catalogue fallback keeps the homepage and menu visible if the database is temporarily unavailable; live order submission still requires the database to be available.


## Customer accounts and email alerts

The account page supports customer registration and sign-in. Run `npm.cmd run db:push`
once after installing dependencies to add the Customer table. Passwords are
scrypt-hashed and never emailed. To email new-account contact details to
`itzavery57@gmail.com`, configure `RESEND_API_KEY`, `BITE_RIOT_FROM_EMAIL`
(a verified sender), and `BITE_RIOT_OWNER_EMAIL` in `.env`. Restart the server
after changing environment variables. The combo page includes WhatsApp contact
for 09137902342.
