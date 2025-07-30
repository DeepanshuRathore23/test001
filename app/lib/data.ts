import postgres from 'postgres'
import {Event} from './definitions'

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