import React, { useState, useEffect } from "react";

const Hero = () => {
  const images = [
    "https://s3-alpha-sig.figma.com/img/96c8/6912/d491d421800e62998b9af7c838cc25d1?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FejtigIOws8eu86j53A9M5dXOKwpfNbOYYmYBbwg46T6F~sBE601qt0fKwXD7d0xIjAwPUKrx2~HXMR7Ficu05Hcx4X5aryA1fj9ljSq1s1xIAALuqJj2-E9Q1vyck4tV6v~uKZCM26l3DPRokPuMvQ-mKSxDvkkK9GDv6tvk4fVakHJzCgS~06G0306FElyJsQ79ED5EDdyxiJgCAZ6f7nnWV~zQ~QaB~-xJUGh70jiAh6lSk55CAWOZ~xzmYoT4GsPEYly5U3owlJqk2KkI5pIOGzaKH1w~oDFC0k9Sh40dbL2~fr6Cw9XgbL894Ao4d1lvckyZyajLZoMevulPg__",
    "https://s3-alpha-sig.figma.com/img/9454/c081/207399e496026390c48a899102b24a4d?Expires=1734912000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=iDQF6Usa-v1KxRvzy0joX7mpKRnJ0my~AH6EDjnOFveATPd5xSIc--Kl6DaFPQHgb5jfqJD3dW~zJuV37WiSj2RZzUrQxBqyOZgKsZI7QfVSV9Twj5vi7X-GrXmpShKLg8JqheTgMCa4lYkj7NN5uqhhtHrPkWRQXJGVmzgUhPhiZyOYJjNTALhQEzJpdXcfvN5CNe9GMQX6~O7788cKCj-5FRnhkGI2u0RRoipC9UGkBRnGSq2ynMpQ3-WIsmqMhez1ChrCOqvSwjrvwi3zErVUz5oPzJIaFXysv8mdMswoV7r878oWXGGHjENkLNiDXtAwKWZmbaaA-snXQUgCog__",
    "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextImage, 3000); // 3 saniye arayla otomatik geçiş
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[60vh] sm:h-[75vh] lg:h-[100vh] overflow-hidden">
        {/* Image Slider */}
        <div className="flex w-full h-full transition-all duration-1000 ease-in-out">
          {images.map((image, index) => (
            <div
              key={index}
              className={`w-full flex-shrink-0 ${
                index === currentIndex
                  ? "block opacity-100 translate-x-0"
                  : "hidden opacity-0 translate-x-10"
              }`}
            >
              <img
                src={image}
                alt={`Hero Image ${index + 1}`}
                className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevImage}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white text-4xl px-4 py-2 bg-opacity-50 hover:bg-opacity-70"
      >
        &lt;
      </button>
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white text-4xl px-4 py-2 bg-opacity-50 hover:bg-opacity-70"
      >
        &gt;
      </button>

      <div
        className="absolute left-1/2
        top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white md:left-1/4 "
      >
        <div className="flex flex-col gap-5">
          <p>SUMMER 2025</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
            NEW COLLECTION
          </h1>
          <p className="mt-4 text-xl sm:text-2xl">
            Explore our latest collection
          </p>
        </div>
        <button className="button mt-5">SHOP NOW</button>
      </div>
    </div>
  );
};

export default Hero;
