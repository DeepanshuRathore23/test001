'use client'

import { useState, useEffect } from "react";

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function getEvents(){
      const res = await fetch('/api/event/fetch');
      const data = await res.json();
      setEvents(data);
      console.log("Data fetched is ", typeof(data));
    }

    getEvents();
  }, []);


  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImages(prev => [...prev, e.target.files![0]]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date);

    console.log("Date at update Events at line 39 ", date);

    images.forEach(img => {
      formData.append('images', img); // Important: same name 'images' for all
    });

    const res = await fetch('/api/event/add', {
      method: 'POST',
      body: formData,
    });

    if (res.ok) {
      console.log('Event added');
      // Optionally reset form
      setImages([]);
      setTitle('');
      setDescription('');
      setDate('');
    } else {
      console.error('Failed to add event');
    }
  };

  
  return (
    <div className="mt-[30vh] p-6">
      <h2 className="text-2xl font-bold mb-4">Add Event</h2>

      <form onSubmit={handleSubmit} className="mb-6 space-y-3">
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 w-full"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 w-full"
        required
      />

      {/* Add one image at a time */}
      <input
        type="file"
        accept="image/*"
        onChange={handleAddImage}
        className="border p-2 w-full"
      />
      <div className="flex flex-wrap gap-2">
        {images.map((img, idx) => (
          <div key={idx} className="text-sm text-gray-600">{img.name}</div>
        ))}
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Event
      </button>
    </form>


      {/* Delete Events */}
      <ul className="space-y-4">
        {events.map((event: any) => (
          <li key={event.id} className="border p-4 flex justify-between">
            <div>
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">{event.description}</p>
            </div>
            <div>
              <form action={`/delete-event/${event.id}`} method="POST">
                <button
                  type="submit"
                  className="bg-red-600 text-white px-3 py-1 rounded-xl"
                >
                  Delete
                </button>
              </form>
            </div>
          </li>
        ))}
      </ul>

    </div>
  );
}
