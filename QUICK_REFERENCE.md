# TechHub - Quick Reference Guide

## 🔗 Important URLs

### Admin Panel (PIN Protected)
| URL | Purpose |
|-----|---------|
| `http://localhost:3000/admin/login` | Admin Login - Enter your PIN |
| `http://localhost:3000/admin/dashboard` | Admin Dashboard - Manage products |
| `http://localhost:3000/admin/products/add` | Add New Product |
| `http://localhost:3000/admin/products/[id]` | Edit Product |

### Public Pages
| URL | Purpose |
|-----|---------|
| `http://localhost:3000/` | Home Page |
| `http://localhost:3000/products` | All Products |
| `http://localhost:3000/cart` | Shopping Cart |
| `http://localhost:3000/checkout` | Checkout |
| `http://localhost:3000/about` | About Us |
| `http://localhost:3000/contact` | Contact |

---

## 📋 Admin Workflow

### Step 1: Login
1. Go to: `http://localhost:3000/admin/login`
2. Enter your PIN (default: `1234` if you followed setup)
3. Click "Login"

### Step 2: View Dashboard
- You'll be redirected to: `/admin/dashboard`
- See all products in a table
- Edit or delete existing products
- Add new products with "Add New Product" button

### Step 3: Add a Product
1. Click "Add New Product" button
2. Fill in required fields:
   - **Product Name** ✓ (Required)
   - **Price** ✓ (Required)
   - Description (Optional)
   - Image URL (Optional)
3. Click "Add Product"
4. You'll be redirected back to dashboard

### Step 4: Edit a Product
1. Find product in dashboard table
2. Click the "✏️ Edit" icon in Actions column
3. Update any field
4. Click "Update Product"

### Step 5: Delete a Product
1. Find product in dashboard table
2. Click the "🗑️ Delete" icon in Actions column
3. Confirm deletion
4. Product will be removed

---

## 🏗️ Project Structure Overview

```
TechHub/
├── src/
│   ├── app/
│   │   ├── admin/              ← PIN protected routes
│   │   │   ├── login/          ← PIN entry page
│   │   │   ├── dashboard/      ← Product management
│   │   │   └── products/       ← Add/Edit product forms
│   │   ├── products/           ← Public product page
│   │   ├── cart/               ← Shopping cart
│   │   ├── checkout/           ← Checkout page
│   │   └── page.js             ← Home page
│   ├── components/
│   │   ├── Header.js           ← Navigation
│   │   ├── Footer.js           ← Footer
│   │   └── ProductCard.js      ← Product display
│   └── lib/supabase/
│       ├── queries.js          ← All database functions
│       └── schema.sql          ← Database tables
├── SETUP_GUIDE.md              ← Detailed setup
└── QUICK_REFERENCE.md          ← This file
```

---

## 🗄️ Supabase Setup

### Create Admin PIN
In your Supabase SQL Editor, run:
```sql
INSERT INTO admin_users (pin, name) VALUES ('1234', 'Admin');
```

### Create Test Product
In your Supabase SQL Editor, run:
```sql
INSERT INTO products (name, price, description, image) VALUES (
  'Test Product',
  99.99,
  'This is a test product',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400'
);
```

---

## 📝 Product Form Fields

### Required Fields
- **Product Name**: Text (max 255 chars)
- **Price**: Number (e.g., 99.99)

### Optional Fields
- **Description**: Text (up to 1000 chars recommended)
- **Image URL**: Must be a valid public image URL
  - Use HTTPS URLs
  - Supported formats: JPG, PNG, GIF, WebP
  - Example: `https://images.unsplash.com/photo-xxxxx`

---

## 🔐 Security Notes

1. **PIN Protection**: Admin panel requires PIN (min 4 digits)
2. **Session Storage**: PIN stored in browser session only
3. **Session Timeout**: 24 hours
4. **Auto Logout**: If session expires, redirected to login

### Change Your PIN
Create a new PIN in Supabase:
```sql
INSERT INTO admin_users (pin, name) VALUES ('5678', 'Admin New');
```

Delete old PIN:
```sql
DELETE FROM admin_users WHERE pin = '1234';
```

---

## 🛍️ Public Store Features

### Browse Products
- Visit `/products` to see all products
- Search products by name
- Click on any product card for details

### Shopping Cart
- Click "Add to Cart" button
- View cart at `/cart`
- Cart data saved in browser (localStorage)
- Checkout when ready

### Complete Order
1. Go to `/checkout`
2. Fill in your details (no login needed)
3. Review order
4. Submit order
5. See confirmation at `/success/[order-id]`

---

## 🎨 Design & Styling

- **Framework**: Tailwind CSS
- **No Separate CSS Files**: All styling done with Tailwind utility classes
- **Responsive**: Mobile, tablet, and desktop friendly
- **Color Scheme**:
  - Primary: Blue (#3B82F6)
  - Gray backgrounds and text
  - White cards and containers

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
# http://localhost:3000

# Build for production
npm run build

# Start production server
npm start
```

---

## ❓ Common Tasks

### Add a New Product
1. Go to `/admin/login` → Enter PIN
2. Click "Add New Product"
3. Fill form and submit
4. Done! Product appears on store

### Update Product Price
1. Go to `/admin/dashboard`
2. Click edit icon (✏️) for product
3. Change price field
4. Click "Update Product"

### Remove Old Product
1. Go to `/admin/dashboard`
2. Find product in table
3. Click delete icon (🗑️)
4. Confirm deletion

### View All Orders
- Orders table in Supabase
- See customer details and order items
- Update order status if needed

---

## 📞 Support

For detailed setup instructions, see: **SETUP_GUIDE.md**

Common issues:
- **Can't login?** - Verify PIN in Supabase admin_users table
- **Products not showing?** - Check Supabase connection and products table
- **Images broken?** - Ensure image URL is valid HTTPS URL

---

## 📊 Database Tables

### products
- id (UUID)
- name (Text)
- price (Number)
- description (Text)
- image (URL)
- created_at (Timestamp)

### orders
- id (UUID)
- full_name (Text)
- phone (Text)
- address (Text)
- email (Text)
- products (JSON)
- total_price (Number)
- status (Text)

### admin_users
- id (UUID)
- pin (Text, Unique)
- name (Text)

---

**Version**: 1.0  
**Last Updated**: December 2024  
**Status**: Production Ready
