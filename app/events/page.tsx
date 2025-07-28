import EventCard from "../ui/EventCard";
const Events = () => {
  const events = [
    {
      title: "Holi Celebration 2025",
      description: "Holi is joyfully celebrated at The Erudite World School with vibrant colors, music, and festive activities. Students and staff come together to enjoy the spirit of togetherness and happiness.  🎨🎉",
      images: [
        '/e1image1.jpeg','/e1image2.jpeg','/e1image3.jpeg','/e1image4.jpeg','/e1image5.jpeg'
      ],
    },
    {
      title: "Sports Day",
      description: "Sports Day at The Erudite World School is a celebration of teamwork, determination, and athletic excellence. Students participate in exciting competitions, showcasing their skills and sportsmanship. 🏆🏅",
      images: [
        '/e2image1.jpg','/e2image2.jpg','/e2image3.jpg','/e2image4.jpg'
      ],
    },
    {
      title: "Republic Day Celebration",
      description: "Republic Day is celebrated at The Erudite World School with patriotic fervor, flag hoisting, and cultural performances. Students honor the spirit of unity and democracy through inspiring activities. 🇮🇳🎉",
      images: [
        '/e3image1.jpg','/e3image2.jpg','/e3image3.jpg'
      ],
    },
    {
        title: "Rally on Guru Govind Jayanti",
        description: "At The Erudite World School, the Rally on Guru Gobind Singh Jayanti is a tribute to his wisdom, valor, and teachings. Students participate with enthusiasm, spreading messages of courage, unity, and righteousness. 🚩📖✨",
        images: [
          '/e4image1.jpg','/e4image2.jpg','/e4image.jpg3','/e4image4.jpg'
        ],
      },
      {
        title: "Prize Distribution",
        description: "Prize Distribution Day at The Erudite World School is a celebration of excellence and achievement. Students are honored for their hard work and dedication in academics, sports, and extracurricular activities. 🏆🎉",
        images: [
          '/e5image1.jpg','/e5image2.jpg','/e5image3.jpg','/e5image4.jpg','/e5image5.jpg','/e5image6.jpg','/e5image7.jpg','/e5image8.jpg','/e5image9.jpg'
        ],
      },
      {
        title: "Christmas Day Celebration 2024",
        description: "Christmas Day at The Erudite World School is celebrated with joy and festive spirit. Students enjoy carol singing, decorations, and performances, spreading warmth and happiness all around. 🎄🎅✨",
        images: [
          '/e6image1.jpg','/e6image2.jpg','/e6image3.jpg','/e6image4.jpg'
        ],
      },
      {
        title: "",
        description: "",
        images: [
          '/e7image1.jpg','/e7image2.jpg','/e7image3.jpg','/e7image4.jpg','/e7image5.jpg'
        ],
      },
      {
        title: "Educational Tour",
        description: "Educational tours at The Erudite World School provide students with immersive learning experiences beyond the classroom. These trips foster curiosity, exploration, and a deeper understanding of the world. 🌍📚✨",
        images: [
            '/e8image1.jpg','/e8image2.jpg','/e8image3.jpg','/e8image4.jpg','/e8image5.jpg','/e8image6.jpg','/e8image7.jpg','/e8image8.jpg','/e8image9.jpg','/e8image10.jpg'
        ],
      },
  ];

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

export default Events;