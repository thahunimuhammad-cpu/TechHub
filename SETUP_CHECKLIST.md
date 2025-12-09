# Complete Setup Checklist

Follow this step-by-step guide to set up the TechHub e-commerce project.

## ✅ Step 1: Prerequisites

- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Git installed (for version control)
- [ ] Supabase account created at [supabase.com](https://supabase.com)
- [ ] Text editor/IDE ready (VS Code recommended)

## ✅ Step 2: Project Setup

### Clone or Create Project
```bash
# If cloning
git clone <repo-url>
cd my-app

# Or create new
npx create-next-app@latest my-app --typescript
cd my-app
```

### Install Dependencies
```bash
npm install
```

This installs:
- Next.js 14
- React 19
- TailwindCSS 4
- Supabase JS client
- Lucide React (icons)
- date-fns (date formatting)

## ✅ Step 3: Supabase Setup

### Create Supabase Project

1. Go to [app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Fill in details:
   - **Name**: `techhub` (or your choice)
   - **Password**: Create secure password
   - **Region**: Select closest to you
4. Click "Create new project"
5. Wait for project to initialize (2-3 minutes)

### Get API Credentials

1. Go to **Settings → API**
2. You'll see:
   - **Project URL** → Copy this for `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → Copy this for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → Copy this for `SUPABASE_SERVICE_ROLE_KEY`

**Important**: 
- ✅ `NEXT_PUBLIC_*` are safe to expose (public API key)
- ⚠️ `SUPABASE_SERVICE_ROLE_KEY` must stay secret (server only)

## ✅ Step 4: Environment Variables

### Create `.env.local` file

In the root of your project, create `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Admin PIN (for protecting admin panel)
NEXT_PUBLIC_ADMIN_PIN=1234
```

### Verify `.env.local` in `.gitignore`

Make sure `.gitignore` includes:
```
.env.local
.env*.local
```

This prevents accidentally committing secrets!

## ✅ Step 5: Database Schema Setup

### Create Tables

1. Go to your Supabase dashboard
2. Click on **SQL Editor** (left sidebar)
3. Click **"New Query"**
4. Copy and paste the contents of `src/lib/supabase/schema.sql`
5. Click **"Run"** (▶️ button)

Or run these individual SQL commands:

```sql
-- Create products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  image TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  email TEXT,
  products JSONB NOT NULL,
  total_price NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create admin_users table
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pin TEXT NOT NULL UNIQUE,
  name TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Create indexes
CREATE INDEX products_name_idx ON products(name);
CREATE INDEX orders_created_at_idx ON orders(created_at DESC);
CREATE INDEX admin_users_pin_idx ON admin_users(pin);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow public read" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public insert orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Allow public read admin users" ON admin_users FOR SELECT USING (true);
```

## ✅ Step 6: Add Sample Products (Optional)

In Supabase SQL Editor, run:

```sql
INSERT INTO products (name, price, description, image) VALUES
(
  'USB-C Cable',
  9.99,
  'High-speed USB-C charging cable, 6ft length',
  'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500'
),
(
  'Wireless Mouse',
  24.99,
  'Ergonomic wireless mouse with silent clicks',
  'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500'
),
(
  'USB Hub',
  34.99,
  '7-port USB 3.0 hub with power supply',
  'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500'
),
(
  'HDMI Cable',
  14.99,
  '4K HDMI 2.1 cable, 6ft length',
  'https://images.unsplash.com/photo-1611571437281-8bdf07b76ddc?w=500'
),
(
  'SD Card Reader',
  19.99,
  'USB 3.0 SD/Micro SD card reader',
  'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=500'
);
```

## ✅ Step 7: Start Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`

You should see:
- ✅ Home page with hero section
- ✅ Featured products (if you added them in Step 6)
- ✅ Navigation menu
- ✅ Cart icon (0 items)

## ✅ Step 8: Test Customer Features

1. **Browse Products**
   - Click "Browse Products" or go to `/products`
   - Should see products from database
   - Search should filter by name

2. **Add to Cart**
   - Click "Add to Cart" on any product
   - See cart count update in header
   - Click "Cart" in header

3. **View Cart**
   - See all cart items
   - Change quantities
   - See total price update

4. **Checkout**
   - Click "Proceed to Checkout"
   - Fill in shipping info
   - Click "Place Order"

5. **Order Success**
   - Should redirect to `/success/[ORDER_ID]`
   - See order confirmation
   - Cart should be empty

## ✅ Step 9: Test Admin Features

### Access Admin Panel

Visit: `http://localhost:3000/admin/products?key=1234`

(Use PIN from `.env.local` - default is `1234`)

### Test Admin Operations

1. **List Products**
   - Should see all products in table
   - Search box works
   - Edit/Delete buttons visible

2. **Add Product**
   - Click "+ Add Product"
   - Fill in form
   - Click "Create Product"
   - New product appears in list

3. **Edit Product**
   - Click edit icon on product
   - Modify details
   - Click "Update Product"
   - Changes appear in list

4. **Delete Product**
   - Click delete icon
   - Confirm deletion
   - Product removed from list

### Test Admin Security

Try accessing without PIN:
```
http://localhost:3000/admin/products
```

Should redirect to home page.

Try with wrong PIN:
```
http://localhost:3000/admin/products?key=9999
```

Should redirect to home page.

## ✅ Step 10: Verify Database Operations

In Supabase Dashboard:

1. **Check Products Table**
   - Go to **Table Editor**
   - Click **products** table
   - See all products listed

2. **Check Orders Table**
   - Click **orders** table
   - After placing order, new row appears
   - See order details and JSON product data

3. **View Data**
   - Click any row to see full details
   - Verify data is correct

## ✅ Step 11: Build for Production

```bash
# Build the project
npm run build

# Start production server
npm run start
```

Visit: `http://localhost:3000`

## ✅ Step 12: Deployment (Optional)

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project"
4. Select your repository
5. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_ADMIN_PIN`
6. Click "Deploy"

### After Deployment

- Your site is live!
- Admin panel: `https://yourdomain.com/admin/products?key=YOUR_PIN`
- Updates automatically from GitHub

## ✅ Troubleshooting

### Issue: "Products not loading"
```
Solution:
1. Check NEXT_PUBLIC_SUPABASE_URL is correct
2. Verify database schema is created
3. Check products table has data
4. Restart dev server (Ctrl+C, npm run dev)
```

### Issue: "Admin redirects to home"
```
Solution:
1. Verify NEXT_PUBLIC_ADMIN_PIN in .env.local
2. Check URL has correct PIN: /admin/products?key=1234
3. Clear browser cache
4. Restart dev server
```

### Issue: "Database operations failing"
```
Solution:
1. Verify SUPABASE_SERVICE_ROLE_KEY is correct
2. Check RLS policies are enabled
3. Verify table names match schema
4. Restart dev server
```

### Issue: "Styling not applied"
```
Solution:
1. Delete .next folder: rm -rf .next
2. Restart dev server: npm run dev
3. Clear browser cache (Ctrl+Shift+Delete)
4. Hard refresh page (Ctrl+Shift+R)
```

## 📚 Project Files Overview

| File | Purpose |
|------|---------|
| `src/app/page.js` | Home page |
| `src/app/products/page.js` | Products listing |
| `src/app/product/[id]/page.js` | Product details |
| `src/app/cart/page.js` | Shopping cart |
| `src/app/checkout/page.js` | Checkout form |
| `src/app/success/[id]/page.js` | Order confirmation |
| `src/app/admin/products/page.js` | Admin product list |
| `src/app/admin/products/add/page.js` | Add product |
| `src/app/admin/products/[id]/page.js` | Edit product |
| `src/lib/supabase/queries.js` | Database operations |
| `middleware.js` | Admin route protection |
| `tailwind.config.ts` | Tailwind CSS config |

## 🎯 Next Steps

1. ✅ Complete all setup steps above
2. ✅ Test all features
3. ✅ Customize styling in `tailwind.config.ts`
4. ✅ Add more products
5. ✅ Deploy to production
6. ✅ Monitor Supabase analytics

## 📞 Need Help?

- Check `README.md` for overview
- Check `SETUP_GUIDE.md` for detailed setup
- Check `SUPABASE_QUERIES.md` for database operations
- Review `src/lib/supabase/schema.sql` for database schema
- Check `.env.example` for environment variables

---

**Congratulations!** 🎉 You now have a fully functional e-commerce platform!
