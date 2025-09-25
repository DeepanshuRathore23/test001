import postgres from "postgres";
import { deleteEvent } from "@/app/lib/data";

const sql = postgres(process.env.POSTGRES_URL!, {ssl: 'require'});


export async function DELETE(
    req: Request,
    {params}: { params: { id: string } }
) {
    const {id} = params;
  
    try {
      await deleteEvent(id);
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
      console.error('❌ Internal Error at DELETE request of deleting event:', err); // Add this
      return new Response(JSON.stringify({ error: 'Failed to delete event', details: (err as any).message }), { status: 500 });
    }
}