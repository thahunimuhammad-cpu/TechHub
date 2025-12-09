# TechHub E-Commerce Platform

A modern, full-stack e-commerce platform built with **Next.js 14**, **React**, **TailwindCSS**, and **Supabase**.

## 🚀 Features

### Customer Side
- 🛍️ Browse all products with search functionality
- 👁️ View detailed product information
- 🛒 Add products to cart (localStorage)
- 💳 Checkout without creating an account
- 📦 Place orders (saved to Supabase)
- ✅ Order confirmation screen

### Admin Side (PIN Protected)
- ➕ Create new products
- 📝 Edit existing products
- 🗑️ Delete products
- 📋 View all products in admin dashboard
- 🔐 PIN-based access (no login required)

## 🏗️ Technology Stack

| Technology | Purpose |
|-----------|---------|
| **Next.js 14** | React framework with App Router |
| **React 19** | UI library |
| **TailwindCSS 4** | Utility-first CSS framework |
| **Supabase** | PostgreSQL database + Storage |
| **Lucide React** | Beautiful SVG icons |
| **Server Actions** | CRUD operations |

## 📋 Requirements

- Node.js 18+
- npm or yarn
- Supabase account (free tier works)

## 🎯 Quick Start

### 1. Clone & Install

```bash
git clone <repo-url>
cd my-app
npm install
```

### 2. Setup Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Copy your project URL and keys
3. Run the database schema (see below)

### 3. Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_ADMIN_PIN=1234
```

### 4. Database Setup

Run the SQL from `src/lib/supabase/schema.sql` in Supabase SQL Editor:

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create tables (see schema.sql for full SQL)
CREATE TABLE products (...)
CREATE TABLE orders (...)
CREATE TABLE admin_users (...)
```

### 5. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## 📁 Project Structure

```
my-app/
├── src/
│   ├── app/
│   │   ├── page.js                 # Home page
│   │   ├── products/page.js        # Products listing
│   │   ├── product/[id]/page.js    # Product details
│   │   ├── cart/page.js            # Shopping cart
│   │   ├── checkout/page.js        # Checkout form
│   │   ├── success/[id]/page.js    # Order success
│   │   ├── admin/                  # Admin pages (PIN protected)
│   │   │   ├── products/page.js    # List products
│   │   │   ├── products/add/page.js
│   │   │   └── products/[id]/page.js
│   │   └── globals.css             # Global styles
│   ├── components/                 # Reusable components
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── ProductCard.js
│   │   ├── Toast.js
│   │   ├── LoadingSpinner.js
│   │   └── LayoutWrapper.js
│   └── lib/supabase/
│       ├── client.js               # Browser client
│       ├── server.js               # Server client
│       ├── queries.js              # Server actions
│       └── schema.sql              # Database schema
├── middleware.js                    # Admin route protection
├── tailwind.config.ts              # Tailwind config
├── next.config.mjs
├── package.json
├── .env.example
├── SETUP_GUIDE.md
└── README.md
```

## 🌐 Routes

### Public Routes
- `/` - Home page
- `/products` - All products with search
- `/product/[id]` - Product details
- `/cart` - Shopping cart
- `/checkout` - Checkout form
- `/success/[id]` - Order confirmation

### Admin Routes (PIN Protected)
- `/admin/products?key=PIN` - List products
- `/admin/products/add?key=PIN` - Add product
- `/admin/products/[id]?key=PIN` - Edit product

## 🗄️ Database Schema

### products table
```sql
- id (UUID, Primary Key)
- name (TEXT, Required)
- price (NUMERIC, Required)
- image (TEXT, Optional URL)
- description (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### orders table
```sql
- id (UUID, Primary Key)
- full_name (TEXT, Required)
- email (TEXT)
- phone (TEXT, Required)
- address (TEXT, Required)
- products (JSONB, Array of cart items)
- total_price (NUMERIC, Required)
- status (TEXT, Default: 'pending')
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### admin_users table
```sql
- id (UUID, Primary Key)
- pin (TEXT, Unique PIN code)
- name (TEXT)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## 🔐 Security

### Admin Protection
- PIN-based access (no login required)
- Middleware validates PIN on `/admin` routes
- PIN stored in environment variable
- Redirects to home if PIN invalid

### Database Security
- Row Level Security (RLS) enabled
- Public read access to products
- Public insert access to orders
- Protected admin_users table

### API Security
- Server Actions (type-safe)
- Service role key only on server
- Anon key for browser operations

## 📊 Key Features Explained

### Server Actions (CRUD)

All database operations use Server Actions in `src/lib/supabase/queries.js`:

```javascript
'use server';
export async function getProducts() { ... }
export async function createProduct(formData) { ... }
export async function updateProduct(id, formData) { ... }
export async function deleteProduct(id) { ... }
export async function createOrder(orderData) { ... }
```

### Cart System

Uses localStorage for client-side cart:
```javascript
// Add to cart
const cart = JSON.parse(localStorage.getItem('cart') || '[]');
cart.push({ ...product, quantity: 1 });
localStorage.setItem('cart', JSON.stringify(cart));

// Checkout creates order in Supabase
await createOrder(cartData);
```

### Admin PIN Protection

Middleware checks PIN on admin routes:
```javascript
// middleware.js
if (pathname.startsWith('/admin')) {
  const adminKey = searchParams.get('key');
  if (adminKey !== process.env.NEXT_PUBLIC_ADMIN_PIN) {
    return NextResponse.redirect(new URL('/', request.url));
  }
}
```

## 🎨 UI Components

All components use **Tailwind CSS** with **Lucide Icons**:

- **Header** - Navigation with cart counter
- **Footer** - Contact info & links
- **ProductCard** - Reusable product display
- **Toast** - Success/error messages
- **LoadingSpinner** - Loading state

## 🛠️ Development

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
npm run start
```

## 📝 Environment Variables

See `.env.example` for all required variables:

```env
NEXT_PUBLIC_SUPABASE_URL         # Supabase URL
NEXT_PUBLIC_SUPABASE_ANON_KEY    # Public API key
SUPABASE_SERVICE_ROLE_KEY        # Server-only key
NEXT_PUBLIC_ADMIN_PIN            # Admin access PIN
```

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Products not showing | Check RLS policies, verify data in Supabase |
| Admin redirect loop | Verify PIN in URL matches .env.local |
| Database errors | Ensure schema is created, check service key |
| Styling not working | Clear .next folder, restart dev server |

## 📚 Additional Resources

- [Next.js Docs](https://nextjs.org/docs)
- [Supabase Docs](https://supabase.com/docs)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Lucide Icons](https://lucide.dev)
- [React Server Components](https://react.dev/reference/react/use-server)

## 📄 License

MIT License - feel free to use for personal and commercial projects

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests.

## 💬 Support

For issues and questions, please open an issue in the repository.

---

**Made with ❤️ using Next.js, React, and Supabase**
