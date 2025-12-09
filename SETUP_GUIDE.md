# Project Setup Guide

## Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free tier available)

## Installation

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project credentials (see `.env.example`)
3. Create `.env.local` file with your Supabase credentials
4. Run the database schema setup (see `.env.example`)

### 3. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## Project Structure

```
my-app/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── page.js         # Home page
│   │   ├── products/       # Products listing
│   │   ├── product/[id]/   # Product details
│   │   ├── cart/           # Shopping cart
│   │   ├── checkout/       # Checkout form
│   │   ├── success/[id]/   # Order success
│   │   └── admin/          # Admin pages (protected)
│   ├── components/         # Reusable React components
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── ProductCard.js
│   │   ├── Toast.js
│   │   └── LoadingSpinner.js
│   └── lib/
│       └── supabase/
│           ├── client.js        # Supabase client (browser)
│           ├── server.js        # Supabase admin client (server)
│           ├── queries.js       # Server actions (CRUD)
│           └── schema.sql       # Database schema
├── middleware.js           # Route protection
├── tailwind.config.ts     # Tailwind CSS config
└── package.json
```

## Key Features

### Customer Features
- ✅ Browse products
- ✅ View product details
- ✅ Add to cart (localStorage)
- ✅ Checkout without account
- ✅ Place orders → saved to Supabase
- ✅ Order success confirmation

### Admin Features
- ✅ Create products
- ✅ Edit products
- ✅ Delete products
- ✅ List all products
- ✅ PIN-based protection (no login required)

## Admin Access

Access the admin panel with your PIN:

```
http://localhost:3000/admin/products?key=YOUR_PIN
```

Default PIN (from .env.local): `1234`

## Database Tables

### products
- id (UUID)
- name (TEXT)
- price (NUMERIC)
- image (TEXT - URL)
- description (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### orders
- id (UUID)
- full_name (TEXT)
- email (TEXT)
- phone (TEXT)
- address (TEXT)
- products (JSONB - array of items)
- total_price (NUMERIC)
- status (TEXT - 'pending', 'processing', 'shipped', 'delivered')
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

### admin_users
- id (UUID)
- pin (TEXT - unique PIN code)
- name (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)

## Technologies Used

- **Next.js 14** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS 4** - Styling
- **Supabase** - Backend + Database
- **Lucide React** - Icons
- **Server Actions** - CRUD operations

## Commands

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm run start
```

## API Routes vs Server Actions

This project uses **Server Actions** for CRUD operations:

```javascript
// src/lib/supabase/queries.js
export async function getProducts() { ... }
export async function createProduct(formData) { ... }
export async function updateProduct(id, formData) { ... }
export async function deleteProduct(id) { ... }
export async function createOrder(orderData) { ... }
```

Usage in components:
```javascript
'use client';
import { getProducts } from '@/lib/supabase/queries';

const result = await getProducts();
```

## Security Notes

1. **Environment Variables**
   - Never commit `.env.local`
   - Add to `.gitignore`
   - Keep SERVICE_ROLE_KEY secret

2. **Admin Protection**
   - Uses URL parameter PIN validation
   - Middleware checks all `/admin` routes
   - PIN stored in environment variable

3. **Database Security**
   - Row Level Security (RLS) enabled
   - Public read for products
   - Public insert for orders
   - Protected admin_users table

## Troubleshooting

### "Missing Supabase environment variables"
- Check `.env.local` has correct values
- Verify variables are set in Supabase dashboard
- Restart dev server after changes

### Products not appearing
- Ensure database schema is created (run SQL)
- Check RLS policies allow public read
- Verify data exists in Supabase dashboard

### Admin panel redirects to home
- Check PIN in URL matches `.env.local`
- Verify middleware.js is in root directory
- Clear browser cache

### Database operations failing
- Verify SERVICE_ROLE_KEY is correct
- Check table names match schema
- Ensure RLS policies are set correctly

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)

## License

MIT
