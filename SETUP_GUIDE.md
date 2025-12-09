# TechHub - E-Commerce Platform Setup Guide

## Project Overview
TechHub is a modern e-commerce platform built with Next.js, Tailwind CSS, and Supabase. It features:
- Public product browsing (no authentication required)
- Shopping cart functionality with local storage
- Admin panel with PIN-based security
- Full CRUD operations for products
- Order management system

## Architecture

### Tech Stack
- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: PIN-based admin access
- **Styling**: Tailwind CSS (no separate CSS files)

### Project Structure
```
src/
├── app/                          # Next.js app directory
│   ├── page.js                  # Home page
│   ├── layout.js                # Root layout
│   ├── globals.css              # Global Tailwind styles
│   ├── products/                # Product listing page
│   ├── cart/                    # Shopping cart
│   ├── checkout/                # Checkout process
│   ├── admin/                   # Admin panel
│   │   ├── login/               # Admin PIN login (SECRET PATH)
│   │   ├── dashboard/           # Main admin dashboard
│   │   └── products/
│   │       ├── add/             # Add new product
│   │       └── [id]/            # Edit product
│   ├── collections/             # Product collections
│   ├── vendors/                 # Vendor listings
│   ├── contact/                 # Contact page
│   ├── about/                   # About page
│   └── success/                 # Order success page
├── components/                   # Reusable components
│   ├── Header.js                # Navigation header
│   ├── Footer.js                # Footer
│   ├── ProductCard.js           # Product card component
│   ├── LayoutWrapper.js         # Wrapper component
│   └── LoadingSpinner.js        # Loading indicator
└── lib/
    └── supabase/
        ├── client.js            # Client-side Supabase config
        ├── server.js            # Server-side Supabase config
        ├── queries.js           # All database queries
        └── schema.sql           # Database schema
```

## Database Schema

### Products Table
```sql
CREATE TABLE products (
  id UUID PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  image TEXT,
  description TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  email TEXT,
  products JSONB NOT NULL,
  total_price NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

### Admin Users Table
```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY,
  pin TEXT NOT NULL UNIQUE,
  name TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);
```

## Admin Panel Access

### Login URL
```
http://localhost:3000/admin/login
```

### Features
1. **PIN-Based Authentication**: Enter 4-digit PIN to access admin panel
2. **Product Management**: 
   - View all products in dashboard
   - Add new products
   - Edit existing products
   - Delete products
3. **Dashboard**: `/admin/dashboard` - Main admin interface
4. **Add Product**: `/admin/products/add` - Add new products
5. **Edit Product**: `/admin/products/[id]` - Edit specific products

### Session Management
- PIN stored in sessionStorage
- Session expires after 24 hours
- Auto-logout redirects to login page

## Key URLs

### Public Pages
- **Home**: `/` - Homepage with featured products
- **Products**: `/products` - All products list
- **Collections**: `/collections/[slug]` - Category collections
- **Vendors**: `/vendors` - Vendor listings
- **Cart**: `/cart` - Shopping cart
- **Checkout**: `/checkout` - Checkout process
- **About**: `/about` - About page
- **Contact**: `/contact` - Contact page

### Admin Pages (PIN Protected)
- **Admin Login**: `/admin/login` - Enter PIN
- **Admin Dashboard**: `/admin/dashboard` - Main panel
- **Add Product**: `/admin/products/add` - Create new product
- **Edit Product**: `/admin/products/[id]` - Edit product
- **Success Page**: `/success/[id]` - Order confirmation

## Database Queries Available

All queries are in `src/lib/supabase/queries.js`:

### Products
```javascript
getProducts()                    // Get all products
getProductById(id)              // Get single product
createProduct(formData)         // Add new product
updateProduct(id, formData)     // Update product
deleteProduct(id)               // Delete product
```

### Orders
```javascript
createOrder(orderData)          // Create new order
getOrders()                     // Get all orders
getOrderById(id)                // Get single order
```

### Admin Authentication
```javascript
verifyAdminPin(pin)             // Verify PIN
createAdminPin(pin, name)       // Create new PIN
```

## Adding Your First Admin PIN

In your Supabase dashboard:

1. Go to **SQL Editor**
2. Run this command:
```sql
INSERT INTO admin_users (pin, name) VALUES ('1234', 'Admin');
```

3. Visit `http://localhost:3000/admin/login`
4. Enter PIN: **1234**

## Removed Features
- Hardcoded product data (now uses Supabase)
- Separate CSS files (using Tailwind CSS only)
- Collection and vendor filtering (simplified to display all products)

## Component Guide

### Header Component (`src/components/Header.js`)
- Navigation with links to home, products, and cart
- Cart count display
- Responsive mobile menu
- Uses Tailwind CSS for styling

### Footer Component (`src/components/Footer.js`)
- Footer with quick links
- Contact information
- Newsletter signup form
- Copyright info

### ProductCard Component (`src/components/ProductCard.js`)
- Product image, name, price
- Add to cart button
- Responsive grid layout

### LayoutWrapper Component (`src/components/LayoutWrapper.js`)
- Wraps Header, main content, and Footer
- Provides consistent layout structure

## How to Add Products

### Method 1: Via Admin Panel (Recommended)
1. Navigate to `/admin/login`
2. Enter your PIN
3. Click "Add New Product" button
4. Fill in product details:
   - Product Name (required)
   - Price (required)
   - Description (optional)
   - Image URL (optional)
5. Click "Add Product"

### Method 2: Via Supabase Console
1. Go to your Supabase project
2. Open **Table Editor**
3. Click on `products` table
4. Click **Insert row**
5. Fill in the product details

### Product Data Requirements
```javascript
{
  name: "Product Name",           // Required
  price: 99.99,                   // Required (number)
  description: "Product details", // Optional
  image: "https://...",           // Optional (full image URL)
  created_at: "auto",             // Auto-generated
  updated_at: "auto"              // Auto-generated
}
```

## Environment Variables

Create `.env.local` file with:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Styling

The project uses **Tailwind CSS** exclusively:
- No separate CSS files needed
- Use Tailwind utility classes in components
- Global styles in `src/app/globals.css`
- Responsive design built-in with Tailwind's breakpoints

### Common Tailwind Classes Used
- `container`, `mx-auto`, `px-4` - Layout
- `bg-white`, `bg-gray-50` - Backgrounds
- `text-xl`, `font-bold` - Typography
- `flex`, `grid` - Layouts
- `hover:`, `transition` - Interactions

## Deployment

### Prerequisites
- Supabase account with populated database
- Environment variables set
- Node.js 18+ installed

### Deploy to Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables
4. Deploy

## Troubleshooting

### Admin Login Not Working
- Verify PIN exists in `admin_users` table
- Check sessionStorage in browser DevTools
- Ensure PIN is at least 4 characters

### Products Not Loading
- Check Supabase connection
- Verify `products` table exists
- Check Row Level Security (RLS) policies allow SELECT

### Images Not Displaying
- Verify image URL is valid and publicly accessible
- Check image URL starts with `https://`
- Use valid image format (jpg, png, gif, webp)

## Notes for Development

1. **Authentication**: Built-in authentication not required for customers (browse and checkout anonymously)
2. **Database**: All product and order data is in Supabase
3. **Security**: Admin panel uses session-based PIN authentication
4. **Real Data**: Only Supabase data is displayed (no hardcoded data)
5. **Styling**: Pure Tailwind CSS - no build-time CSS compilation issues

## Next Steps

1. Set up Supabase project and database
2. Add admin PIN via SQL
3. Access admin panel at `/admin/login`
4. Add products via admin panel at `/admin/products/add`
5. Visit home page to see products displayed

---

For more details, refer to individual page files and component documentation.
