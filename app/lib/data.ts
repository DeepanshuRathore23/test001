import postgres from 'postgres'
import {Event} from './definitions'
import { put } from '@vercel/blob';

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});

export async function fetchEvents(): Promise<Event[]> {
    try{
        const data = await sql<Event[]>`SELECT * FROM events`;
        return data;
    } catch(err) {
        console.error("Database error: ", err);
        return [];
    }
}

export async function addEvent(formData: FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const dateString = formData.get('date') as string;
    const images = formData.getAll('images') as File[];

    const imageUrls: string[] = [];

    for(const image of images) {
      if(image instanceof File) {
        const blob = await put(`events/${image.name}`, image, {
          access: 'public',
        });
        imageUrls.push(blob.url);
      }
    }

    const date = new Date(dateString);
    if(!date) {
      console.log("Date is miising");
    } else {
      console.log(date);
    }


  try{
    await sql`INSERT INTO events(title, description, images, date)
      VALUES(${title}, ${description}, ${sql.array(imageUrls)} ,${date})
      ON CONFLICT (id) DO NOTHING`;

  } catch(err) {
    console.error('Errr adding event', err);
    throw err;
  }
}