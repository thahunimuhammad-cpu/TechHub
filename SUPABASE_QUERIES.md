/**
 * SUPABASE QUERIES REFERENCE
 * Complete list of all database operations used in the project
 * Location: src/lib/supabase/queries.js
 */

// ==============================================
// PRODUCTS - READ OPERATIONS
// ==============================================

/**
 * Get all products
 * @returns {Promise<{success: boolean, data: Array, error?: string}>}
 */
export async function getProducts() {
  // Equivalent SQL:
  // SELECT * FROM products ORDER BY created_at DESC;
  
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return { success: true, data };
}

/**
 * Get single product by ID
 * @param {string} id - Product ID (UUID)
 * @returns {Promise<{success: boolean, data: Object, error?: string}>}
 */
export async function getProductById(id) {
  // Equivalent SQL:
  // SELECT * FROM products WHERE id = 'id' LIMIT 1;
  
  const { data, error } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return { success: true, data };
}

// ==============================================
// PRODUCTS - CREATE OPERATION
// ==============================================

/**
 * Create new product
 * @param {Object} formData - {name, price, description, image}
 * @returns {Promise<{success: boolean, data: Object, error?: string}>}
 */
export async function createProduct(formData) {
  // Equivalent SQL:
  // INSERT INTO products (name, price, description, image)
  // VALUES ('name', 99.99, 'desc', 'url') RETURNING *;
  
  const { name, price, description, image } = formData;

  if (!name || !price) {
    return { success: false, error: 'Name and price are required' };
  }

  const { data, error } = await supabaseAdmin
    .from('products')
    .insert([
      {
        name,
        price: parseFloat(price),
        description,
        image,
      },
    ])
    .select();

  if (error) throw error;
  return { success: true, data: data[0] };
}

// ==============================================
// PRODUCTS - UPDATE OPERATION
// ==============================================

/**
 * Update existing product
 * @param {string} id - Product ID (UUID)
 * @param {Object} formData - {name, price, description, image}
 * @returns {Promise<{success: boolean, data: Object, error?: string}>}
 */
export async function updateProduct(id, formData) {
  // Equivalent SQL:
  // UPDATE products 
  // SET name = 'name', price = 99.99, description = 'desc', 
  //     image = 'url', updated_at = now()
  // WHERE id = 'id' RETURNING *;
  
  const { name, price, description, image } = formData;

  if (!name || !price) {
    return { success: false, error: 'Name and price are required' };
  }

  const { data, error } = await supabaseAdmin
    .from('products')
    .update({
      name,
      price: parseFloat(price),
      description,
      image,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select();

  if (error) throw error;
  return { success: true, data: data[0] };
}

// ==============================================
// PRODUCTS - DELETE OPERATION
// ==============================================

/**
 * Delete product by ID
 * @param {string} id - Product ID (UUID)
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function deleteProduct(id) {
  // Equivalent SQL:
  // DELETE FROM products WHERE id = 'id';
  
  const { error } = await supabaseAdmin
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
  return { success: true };
}

// ==============================================
// ORDERS - CREATE OPERATION
// ==============================================

/**
 * Create new order (checkout)
 * @param {Object} orderData - {fullName, phone, address, email, products, totalPrice}
 * @returns {Promise<{success: boolean, data: Object, error?: string}>}
 */
export async function createOrder(orderData) {
  // Equivalent SQL:
  // INSERT INTO orders (full_name, phone, address, email, products, total_price, status)
  // VALUES ('name', '123', 'addr', 'email', '[...]', 99.99, 'pending')
  // RETURNING *;
  
  const { fullName, phone, address, email, products, totalPrice } = orderData;

  if (!fullName || !phone || !address || !products || !totalPrice) {
    return { success: false, error: 'All fields are required' };
  }

  const { data, error } = await supabaseAdmin
    .from('orders')
    .insert([
      {
        full_name: fullName,
        phone,
        address,
        email,
        products,
        total_price: parseFloat(totalPrice),
        status: 'pending',
      },
    ])
    .select();

  if (error) throw error;
  return { success: true, data: data[0] };
}

// ==============================================
// ORDERS - READ OPERATIONS
// ==============================================

/**
 * Get all orders (admin only)
 * @returns {Promise<{success: boolean, data: Array, error?: string}>}
 */
export async function getOrders() {
  // Equivalent SQL:
  // SELECT * FROM orders ORDER BY created_at DESC;
  
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return { success: true, data };
}

/**
 * Get single order by ID
 * @param {string} id - Order ID (UUID)
 * @returns {Promise<{success: boolean, data: Object, error?: string}>}
 */
export async function getOrderById(id) {
  // Equivalent SQL:
  // SELECT * FROM orders WHERE id = 'id' LIMIT 1;
  
  const { data, error } = await supabaseAdmin
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return { success: true, data };
}

// ==============================================
// ADMIN AUTHENTICATION - PIN VERIFICATION
// ==============================================

/**
 * Verify admin PIN
 * @param {string} pin - PIN code
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export async function verifyAdminPin(pin) {
  // Equivalent SQL:
  // SELECT * FROM admin_users WHERE pin = 'pin' LIMIT 1;
  
  const { data, error } = await supabaseAdmin
    .from('admin_users')
    .select('*')
    .eq('pin', pin)
    .single();

  if (error) {
    return { success: false, error: 'Invalid PIN' };
  }

  return { success: true, data };
}

/**
 * Create new admin PIN
 * @param {string} pin - PIN code (must be unique)
 * @param {string} name - Admin name
 * @returns {Promise<{success: boolean, data?: Object, error?: string}>}
 */
export async function createAdminPin(pin, name = 'Admin') {
  // Equivalent SQL:
  // INSERT INTO admin_users (pin, name)
  // VALUES ('pin', 'name') RETURNING *;
  
  if (!pin || pin.length < 4) {
    return { success: false, error: 'PIN must be at least 4 digits' };
  }

  const { data, error } = await supabaseAdmin
    .from('admin_users')
    .insert([
      {
        pin,
        name,
      },
    ])
    .select();

  if (error) {
    if (error.code === '23505') {
      return { success: false, error: 'PIN already exists' };
    }
    throw error;
  }

  return { success: true, data: data[0] };
}

// ==============================================
// USAGE EXAMPLES
// ==============================================

/**
 * EXAMPLE: In a Server Action or Component
 * 
 * // Get all products
 * const result = await getProducts();
 * if (result.success) {
 *   const products = result.data;
 * } else {
 *   console.error(result.error);
 * }
 * 
 * // Create product
 * const newProduct = await createProduct({
 *   name: 'USB Cable',
 *   price: '9.99',
 *   description: 'High quality USB cable',
 *   image: 'https://example.com/cable.jpg'
 * });
 * 
 * // Create order
 * const order = await createOrder({
 *   fullName: 'John Doe',
 *   email: 'john@example.com',
 *   phone: '123-456-7890',
 *   address: '123 Main St, City, State 12345',
 *   products: [
 *     { id: 'uuid1', name: 'Cable', price: 9.99, quantity: 2 }
 *   ],
 *   totalPrice: 21.58 // Including tax
 * });
 */

// ==============================================
// DIRECT SQL QUERIES REFERENCE
// ==============================================

/**
 * Get products with filters
 * SELECT * FROM products
 * WHERE name ILIKE '%search%'
 * ORDER BY price ASC
 * LIMIT 10;
 */

/**
 * Get orders by date range
 * SELECT * FROM orders
 * WHERE created_at BETWEEN '2024-01-01' AND '2024-12-31'
 * ORDER BY created_at DESC;
 */

/**
 * Get order count by status
 * SELECT status, COUNT(*) as count
 * FROM orders
 * GROUP BY status;
 */

/**
 * Update order status
 * UPDATE orders
 * SET status = 'shipped', updated_at = now()
 * WHERE id = 'order-id';
 */

/**
 * Get products by price range
 * SELECT * FROM products
 * WHERE price BETWEEN 10 AND 100
 * ORDER BY price ASC;
 */

// ==============================================
// RLS POLICIES APPLIED
// ==============================================

/**
 * Products Table:
 * - Allow public SELECT (read all products)
 * - Allow authenticated UPDATE/DELETE (admin only, via middleware)
 * 
 * Orders Table:
 * - Allow public INSERT (anyone can create order)
 * - Allow public SELECT (anyone can view order by ID)
 * 
 * Admin Users Table:
 * - Allow public SELECT (anyone can verify PIN)
 * - Restrict INSERT/UPDATE/DELETE (server only)
 */
