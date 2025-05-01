// index.ts
import { Hono } from 'hono'
import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import { randomUUID } from 'crypto';

export const imageUpload = new Hono();


imageUpload.post('/', async (c) => {

  const body = await c.req.parseBody();

  if (body && body.image) {
    const image = body.image as File;
    const buffer = await image.arrayBuffer();

    try {

      if (!existsSync('images')) {
        await mkdir('images');
      }

      const ext = image.name.split('.').pop();
      const filename = `${randomUUID()}.${ext}`;

      await writeFile(`./images/${filename}`, Buffer.from(buffer));
      
      return c.text('Uploaded successfully!');

    } 
    
    catch (error: any) {
      return c.json({ message: error.message }, 500);
    } 

  }

  return c.text('No image received.', 400); 

})
  

