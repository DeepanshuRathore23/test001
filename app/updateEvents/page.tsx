'use client'

import { setDefaultAutoSelectFamily } from "net";
import React, { useState, useEffect, useRef } from "react";

export default function EventList() {
  const [events, setEvents] = useState([]);
  const [showPopup, setShowPopup]  = useState(false);
  const [showDeletePopup, setShowDeletePopup]  = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function getEvents(){
      const res = await fetch('/api/event/fetch');
      const data = await res.json();
      setEvents(data);
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

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault();
    setAddLoading(true);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('date', date);

    images.forEach((img)=> {
      formData.append('images', img);
    });

    const res = await fetch('/api/event/add', {
      method: 'POST',
      body: formData,
    });

    if(res.ok) {
      setImages([]);
      setTitle('');
      setDescription('');
      setDate('');

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
       // ✅ Show popup for 2s
       setShowPopup(true);
       setTimeout(() => setShowPopup(false), 2000);

      // Refresh events list after adding
      const updatedRes = await fetch('/api/event/fetch');
      const updatedData = await updatedRes.json();
      setEvents(updatedData);
    } else {
      console.error("Failed to add event at upadateEvent at line 93");
    }

    setAddLoading(false);
  }

  async function handleEventDelete(id: string) {
    try{
      setDeletingId(id);
      const res = await fetch(`api/event/delete/${id}`, {
        method: "DELETE"
      });

      if(res.ok) {
        setEvents((prev) => prev.filter((event: any) => event.id !== id));
      } else {
        console.error("Failed to delete event: ", id);
      }
      setDeletingId(null);
    } catch(error) {
      console.error("Error deleteing event");
    }
  }

  
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
        ref={fileInputRef}
        className="border p-2 w-full"
      />
      <div className="flex flex-wrap gap-2">
        {images.map((img, idx) => (
          <div key={idx} className="text-sm text-gray-600">{img.name}</div>
        ))}
      </div>

      <button
        type="submit"
        disabled={addLoading}
        className={`relative overflow-hidden px-4 py-2 rounded text-white font-medium 
          ${addLoading ? "bg-green-400 cursor-not-allowed" : "bg-green-600 hover:bg-blue-700"}
        `}
      >
        {addLoading ? "Adding Event..." : "Add Event"}

        {/* Shimmer overlay only when submitting */}
        {addLoading && (
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
            animate-shimmer" />
        )}

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

            <div className="relative inline-block">
              <button
                onClick={() => handleEventDelete(event.id)}
                disabled = {deletingId == event.id}
                className={`text-white px-3 py-1 rounded-xl
                  ${deletingId == event.id ? "bg-red-600 cursor-not-allowed" : "bg-red-600"}
                  `}
              >
                {deletingId == event.id ? "Deleting Event..." : "Delete Event"}

                {/* Shimmer overlay only when deleting */}
                {deletingId == event.id && (
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent 
                    animate-shimmer" />
                )}
              </button>  
            </div>

          </li>
        ))}
      </ul>

      {/* ✅ Popup shown only when event is added */}
      {showPopup && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
          ✅ Event added successfully!
        </div>
      )}

      {/* ✅ Delete Popup shown only when event is deleted */}
      {showDeletePopup && (
        <div className="fixed top-5 right-5 bg-green-600 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-out">
          ✅ Event Deleted successfully!
        </div>
      )}

    </div>
  );
}
