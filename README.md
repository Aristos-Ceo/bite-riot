# BITE RIOT — Restaurant Discovery & Ordering Platform

A modern, full-stack restaurant website concept built around a bold food brand, immersive visual storytelling, and a complete customer ordering experience.

**BITE RIOT** combines an editorial-style restaurant website with an interactive menu, product discovery, shopping bag, customer accounts, order placement, order tracking, and WhatsApp order communication.

The project was developed as a portfolio demonstration of modern frontend development, full-stack application architecture, database integration, authentication, responsive design, and deployment.

<p align="center">

**Live Demo:** https://bite-riot.vercel.app/

**Source Code:** https://github.com/Aristos-Ceo/bite-riot

</p>

---

## Project Overview

BITE RIOT is a restaurant discovery and ordering platform designed to deliver more than a conventional restaurant website.

The experience features a distinctive visual identity built around forest green, warm ivory, and lime accents, complemented by original food photography, custom brand illustrations, bold typography, animated interactions, and responsive editorial layouts.

The platform brings together restaurant discovery, product browsing, customer account management, and order workflows in one application.

## Key Features

### 1. Brand Experience & Homepage
- Custom BITE RIOT visual identity and design system.
- Responsive homepage with an animated food photography hero slideshow.
- Editorial-style layouts and bold display typography.
- Custom illustrated brand elements.
- Responsive navigation and mobile-specific styling.
- Animated transitions and interactive visual details.

### 2. Menu & Product Discovery
- Dedicated restaurant menu experience.
- Eight menu categories.
- Product catalogue containing 80 seeded products.
- Product search and category navigation.
- Individual product detail pages.
- Product availability and featured product information.
- Food photography mapped to individual products.

### 3. Shopping Bag & Checkout
- Add products to the shopping bag.
- Review selected products and quantities.
- Automatic subtotal calculations.
- Checkout form for customer and delivery information.
- Server-side order validation.
- Persistent order records in the database.

### 4. Customer Accounts
- Customer registration.
- Customer sign-in.
- Secure password hashing using scrypt.
- Session-based customer authentication.
- Customer-specific order access.
- Password reset token support in the database schema.

### 5. Order Management & Tracking
- Unique order references.
- Persistent order records.
- Order item and quantity records.
- Order status tracking.
- Payment status fields.
- Private customer order history.
- Order tracking restricted to the authenticated customer's account.

### 6. WhatsApp Integration
- WhatsApp order handoff.
- Automatically prepared order messages.
- Order reference, customer details, delivery information, items, and subtotal included in the message.
- Direct communication with the restaurant to confirm order details.

### 7. Email Notifications
- Optional Resend email integration.
- New-account notification configuration.
- Environment-based email settings.
- Customer passwords are never included in notification emails.

### 8. Administration
- Dedicated administration route.
- Database-backed product and order architecture.
- Order and payment status models.

### 9. Additional Pages

| Route | Description |
|---|---|
| `/` | Homepage and brand introduction |
| `/menu` | Product catalogue and menu categories |
| `/menu/[slug]` | Individual product details |
| `/combos` | Food combinations and combo discovery |
| `/offers` | Promotions and offers |
| `/story` | Brand story and editorial gallery |
| `/cart` | Shopping bag |
| `/checkout` | Checkout and order submission |
| `/account` | Customer account |
| `/track` | Order tracking |
| `/admin` | Administration area |

---

## Technology Stack

The project uses a modern JavaScript and TypeScript ecosystem.

### Frontend

| Technology | Purpose |
|---|---|
| Next.js 15 | React framework, routing and server-side capabilities |
| React 19 | Component-based user interface |
| TypeScript 5 | Static typing and maintainable application code |
| Tailwind CSS 3 | Utility-first styling foundation |
| CSS3 | Custom layouts, responsive styling and animations |
| Lucide React | Interface icons |

### Backend & Application Logic

| Technology | Purpose |
|---|---|
| Next.js Route Handlers | Backend API endpoints |
| Node.js | JavaScript runtime |
| Prisma ORM 6 | Database access and data modelling |
| Zod 4 | Request validation and data schemas |
| JOSE 6 | Token and session-related cryptographic utilities |
| scrypt | Secure customer password hashing |

### Database & Data Management

- PostgreSQL
- Prisma ORM
- Relational data modelling
- Database migrations and schema synchronization
- Product catalogue seeding
- Customer, product, order, and order-item records

### Development Tools & Deployment

- Git and GitHub — version control and source management.
- npm — package management.
- Vercel — hosting and deployment.
- Resend — optional transactional email delivery.
- WhatsApp — customer order communication.

---

## Database Architecture

The Prisma schema defines the following main data models:

| Model | Responsibility |
|---|---|
| `Product` | Menu items, pricing, categories and availability |
| `Customer` | Customer profile and password hash |
| `Order` | Customer orders, references, totals and statuses |
| `OrderItem` | Individual products and quantities within an order |
| `PasswordResetToken` | Password reset token records |

The application also defines order and payment status enums.

**Order statuses:** Pending, Confirmed, Preparing, Ready, Out for Delivery, Completed, and Cancelled.

**Payment statuses:** Unpaid, Pending, Paid, Failed, and Refunded.

The database schema is configured for PostgreSQL through Prisma.

---

## Getting Started

### Requirements

- Node.js 20 or newer
- npm
- Git
- A PostgreSQL database

### 1. Clone the repository

```bash
git clone https://github.com/Aristos-Ceo/bite-riot.git
```

### 2. Enter the project directory

```bash
cd bite-riot
```

### 3. Install dependencies

```bash
npm install
```

On Windows PowerShell, you can use:

```powershell
npm.cmd install
```

### 4. Configure environment variables

Create a `.env` file in the project root.

Configure the PostgreSQL connection strings and the application secrets required by your local environment.

```env
DATABASE_URL="your-postgresql-connection-url"
DATABASE_URL_UNPOOLED="your-direct-postgresql-connection-url"

ADMIN_PASSWORD="your-strong-admin-password"
SESSION_SECRET="your-long-random-secret-at-least-32-characters"

BITE_RIOT_WHATSAPP_NUMBER="2349137902342"

RESEND_API_KEY=""
BITE_RIOT_FROM_EMAIL=""
BITE_RIOT_OWNER_EMAIL=""
```

Never commit your `.env` file, database credentials, API keys, or production secrets to GitHub.

### 5. Synchronize the database

```bash
npm run db:push
```

### 6. Seed the product catalogue

```bash
npm run db:seed
```

### 7. Start the development server

```bash
npm run dev
```

Open:

**http://localhost:3000**

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the development server |
| `npm run build` | Generates Prisma Client and builds the application |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs the configured lint command |
| `npm run db:push` | Synchronizes the Prisma schema with the database |
| `npm run db:seed` | Seeds the product catalogue |
| `npm run db:studio` | Opens Prisma Studio |
| `npm run postinstall` | Generates Prisma Client after dependency installation |

---

## Integrations

### WhatsApp

The checkout flow generates a WhatsApp message containing the order details and opens a conversation with the restaurant.

The WhatsApp destination can be configured using `BITE_RIOT_WHATSAPP_NUMBER`.

### Resend

Resend can be configured to deliver new-account notifications.

Required environment variables:

- `RESEND_API_KEY`
- `BITE_RIOT_FROM_EMAIL`
- `BITE_RIOT_OWNER_EMAIL`

A verified sender domain is required for production email delivery.

### Vercel

The project is connected to GitHub and deployed through Vercel.

Production deployment can be triggered by pushing changes to the connected GitHub branch.

The production environment must have its own database connection and application secrets configured.

---

## Security & Engineering Considerations

Security and maintainability were considered throughout the implementation.

- TypeScript for stronger application-level type safety.
- Zod validation for incoming order data.
- Server-side order creation and product price retrieval.
- Scrypt password hashing.
- Customer-specific order access checks.
- Environment variables for sensitive configuration.
- Prisma ORM for structured database access.
- Server-side validation of product availability and order quantities.

Production deployment should additionally include appropriate rate limiting, CSRF protections where applicable, secure cookie configuration, monitoring, backups, and a complete review of administrative access.

---

## Current Scope & Production Considerations

BITE RIOT is a portfolio project demonstrating a restaurant ordering workflow.

The current checkout records orders as unpaid order requests and uses WhatsApp to continue communication with the restaurant. It does not currently process online card payments.

Before using the platform for a real restaurant, additional production configuration is required, including:

- Payment gateway integration.
- Verified email delivery.
- Production database configuration and backups.
- Delivery zones and delivery fee rules.
- Restaurant opening hours and contact information.
- Production security and administrative access review.
- Privacy policy and terms of service.

---

## Design Direction

The visual identity is built around three core colours:

- **Forest Green** — the primary brand foundation.
- **Warm Ivory** — a softer editorial background.
- **Lime** — a bold accent colour.

The design combines food photography, expressive typography, responsive layouts, and subtle motion to create a distinctive restaurant brand experience.

---

## Project Goals & Learning Outcomes

This project demonstrates practical experience with:

- Building a full-stack application using Next.js and React.
- Developing reusable, component-based interfaces.
- Designing responsive layouts for desktop and mobile.
- Integrating PostgreSQL with Prisma ORM.
- Implementing customer authentication foundations.
- Creating database-backed ordering workflows.
- Validating API requests with Zod.
- Integrating external communication and email services.
- Managing source code with Git and GitHub.
- Deploying a production website through Vercel.

---

## Author

**BITE RIOT** — Full-Stack Restaurant Website Project

Developed as a portfolio project showcasing modern web development, interface design, and full-stack application engineering.

**GitHub:** https://github.com/Aristos-Ceo/bite-riot

**Live Website:** https://bite-riot.vercel.app/

---

*Built with creativity, technology, and a little bit of riot.*
