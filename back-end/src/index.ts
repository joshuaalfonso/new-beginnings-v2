import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import products from './routes/products.js';
import { cors } from 'hono/cors'
import { categories } from './routes/categories.js';
import { imageUpload } from './routes/imageUpload.js';
import { prettyJSON } from 'hono/pretty-json'
import { serveStatic } from '@hono/node-server/serve-static';


const app = new Hono();

app.use('/images/*', serveStatic({ root: './' }));

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.use('*', cors());
app.use(prettyJSON())

app.route('/products', products);

app.route('/categories', categories);

app.route('/upload', imageUpload)

serve({
  fetch: app.fetch,
  port: 3000,
  hostname: '0.0.0.0',
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
