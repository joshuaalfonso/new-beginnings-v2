import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import products from './routes/products.js';
import { cors } from 'hono/cors'


const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.use('*', cors());

app.route('/products', products);

serve({
  fetch: app.fetch,
  port: 3000,
  hostname: '0.0.0.0',
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
