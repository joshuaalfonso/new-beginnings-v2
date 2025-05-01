import { Hono } from 'hono'
import { pool } from '../db/connection.js'
import { writeFile, mkdir, unlink } from 'fs/promises';
import { existsSync } from 'fs';
import { randomUUID } from 'crypto';

const products = new Hono();

products.get('/', async (c) => {
    const [rows] = await pool.query(
        `
            SELECT 
                p.productId, 
                p.productName,
                p.categoryId,
                c.categoryName AS productCategory, 
                p.productDescription,
                p.imageUrl,
                p.dateCreated
            FROM 
                products AS p
            LEFT JOIN 
                categories AS c
            ON p.categoryId = c.categoryId 
        `
    )
    return c.json(rows)
})

products.post('/', async (c) => {

    const body = await c.req.parseBody();

    const data = JSON.parse(body.data as string);

    if (!data) return c.json({ message: 'Missing product data' }, 400);

    const {
        productId,
        productName,
        categoryId,
        productDescription,
    } = data

    const image = body.image as File | undefined; 

    const parsedProductId = productId ? Number(productId) : null;
    const parsedCategoryId = Number(categoryId);

    if (!image) {
        return c.json({ message: 'No image uploaded.' }, 400);
    }
    
    try {

        const [existingProduct] = await pool.query(
            `SELECT productName FROM products WHERE productName = ?`,
            [productName]
        );
        
        if ((existingProduct as any[]).length > 0) {
            return c.json({
                message: 'Product already exists', 
                existingProduct}, 400
            );
        }

        const arrayBuffer = await image.arrayBuffer();
        
        if (!existsSync('images')) {
          await mkdir('images');
        }
    
        const ext = image.name.split('.').pop();
        const filename = `${randomUUID()}.${ext}`;
    
        await writeFile(`./images/${filename}`, Buffer.from(arrayBuffer));

         // Insert the product data into the database (including imageUrl as filename)
         const [data] = await pool.query(
            'INSERT INTO products (productId, productName, categoryId, productDescription, imageUrl) VALUES (?, ?, ?, ?, ?)',
            [parsedProductId, productName, parsedCategoryId, productDescription, filename]
        );
    
        return c.json({
            message: 'Product uploaded successfully!',
            fileName: filename,
            data: data
        });

    } 
    
    catch (error: any) {
        return c.json({ message: error.message }, 500);
    }

})

products.put('/', async (c) => {

    const body = await c.req.parseBody();

    const data = JSON.parse(body.data as string);

    if (!data) return c.json({ message: 'Missing product data' }, 400);

    const {
        productId,
        productName,
        categoryId,
        productDescription,
        imageUrl: existingImage
    } = data

    const newImage = body.image as File | undefined; 
    let newFileName = existingImage;

    if (newImage) {

        if (existingImage) {
            const oldPath = `images/${existingImage}`

            if (existsSync(oldPath)) {
                await unlink(oldPath);
            }
        }

         // Save new image
        const ext = newImage.name.split('.').pop();
        newFileName = `${randomUUID()}.${ext}`;

        const arrayBuffer = await newImage.arrayBuffer();

        if (!existsSync('images')) {
            await mkdir('images');
        }

        await writeFile(`./images/${newFileName}`, Buffer.from(arrayBuffer));
    }

    await pool.query(
        `UPDATE 
            products 
         SET 
            productName = ?, 
            categoryId = ?, 
            productDescription = ?, 
            imageUrl = ?
         WHERE 
            productId = ?`,
        [productName, categoryId, productDescription, newFileName, productId]
    );

    return c.json({message: 'update product', data: data}, 200)

});


products.delete('/:productId', async (c) => {
    
    const { productId } = c.req.param();

    try {

        const [row] = await pool.query(`SELECT imageUrl FROM products WHERE productId = ?`, [productId])

        const imageUrl = (row as any[]).length ? (row as any[])[0].imageUrl : null;
        
        if (imageUrl) {
            const imagePath = `images/${imageUrl}`;
            await unlink(imagePath);
        }

        await pool.query(`DELETE FROM products WHERE productId = ?`, [productId]);

        return c.json({ message: "Product deleted successfully" }, 200);

    }

    catch (error: any) {
        return c.json({ message: error.message || 'There was an error deleting data' }, 500);
    }
  
    // await pool.query(`DELETE FROM products WHERE productId = ?`, [productId]);
  
});
  

export default products


