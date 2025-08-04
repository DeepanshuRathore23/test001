import postgres from "postgres";
import { addEvent } from "@/app/lib/data";

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});


export async function POST(req: Request) {
    const formData = await req.formData();
  
    try {
      await addEvent(formData);
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
      return new Response(JSON.stringify({ error: 'Failed to add event' }), { status: 500 });
    }
}