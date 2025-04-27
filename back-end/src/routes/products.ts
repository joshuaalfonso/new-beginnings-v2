import { Hono } from 'hono'
import { pool } from '../db/connection.js'

const products = new Hono()

products.get('/', async (c) => {
    const [rows] = await pool.query('SELECT * FROM products')
    return c.json(rows)
})

products.post('/', async (c) => {

    const {
        productId,
        productName,
        productCategory,
        productDescription,
        dateCreated
    } = await c.req.json();

    const [existingProduct] = await pool.query(
        "SELECT productName FROM products WHERE productName = ?",
        [productName]
    );
    
    if ((existingProduct as any[]).length > 0) {
        return c.json({message: 'Product already exists', existingProduct}, 400);
    }

    const [data] = await pool.query(
        'INSERT INTO products (productId, productName, productCategory, productDescription, dateCreated) VALUES (?, ?, ?, ?, ?)',
        [productId, productName, productCategory, productDescription, dateCreated]
    );

    return c.json({ message: 'Product inserted successfully', data: data }, 201);

})

products.put('/', async (c) => {
    const {
        productId,
        productName,
        productCategory,
        productDescription,
        dateCreated
    } = await c.req.json();

    await pool.query(
        `UPDATE products 
         SET productName = ?, productCategory = ?, productDescription = ?, dateCreated = ?
         WHERE productId = ?`,
        [productName, productCategory, productDescription, dateCreated, productId]
    );

    return c.json({ message: 'Product updated successfully' }, 200);
});

products.delete('/:productId', async (c) => {
    const { productId } = c.req.param();
  
    await pool.query(`DELETE FROM products WHERE productId = ?`, [productId]);
  
    return c.json({ message: "Product deleted successfully" }, 200);
  });
  

export default products


