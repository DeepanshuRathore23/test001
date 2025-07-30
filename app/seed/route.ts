import { events } from '../lib/placeholder-data';
import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedEvents(sqlInstance: typeof sql) {
    await sqlInstance`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sqlInstance`CREATE TABLE IF NOT EXISTS events (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        images TEXT[]
    )`;

    const insertedEvents = await Promise.all(
        events.map(async (event) => {
            return sqlInstance`
                INSERT INTO events(id, title, description, images)
                VALUES(${event.id}, ${event.title}, ${event.description}, ${sqlInstance.array(event.images)})
                ON CONFLICT (id) DO NOTHING;
            `;
        }),
    );

    return insertedEvents;
}

export async function GET() {
    try {
        await sql.begin(async (tx) => {
            await seedEvents(tx); // ✅ Pass transaction instance
        });

        return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
        return Response.json({ error: String(error) });
    }
}
