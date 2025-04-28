import { Hono } from 'hono'
import { pool } from '../db/connection.js'

export const categories = new Hono()

categories.get('/', async (c) => {
    const [rows] = await pool.query(
        `
            SELECT 
                *
            FROM 
                categories
        `
    )
    return c.json(rows)
})