import EventCard from "../ui/EventCard";
import { fetchEvents } from "../lib/data";

export default async function Events() {
  const events = await fetchEvents();

  return (
    <div className="min-h-screen mt-[90vh] bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#d59f0f] mb-4">School Events</h1>
          <p className="text-lg text-gray-600">Stay updated with our latest events and activities</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <EventCard key={index} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
};