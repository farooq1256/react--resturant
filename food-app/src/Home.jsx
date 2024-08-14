import React from 'react';

const Home = () => {
  return (
    <>
      <div
        className="relative bg-cover bg-center h-screen flex flex-col justify-center items-center"
        style={{
          backgroundImage:
            "url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvay02M2EtZHM1NTQ2NDUzNTM0NTM0Nl8yLmpwZw.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center p-5">
          <h1 className="text-3xl md:text-5xl mb-4 animate-fadeInUp delay-100">
            Welcome to Khan Shanwari!
          </h1>
          <p className="text-lg md:text-xl mb-2 animate-fadeInUp delay-200">
            Savor the Flavor of Our Culinary Delights!
          </p>
          <p className="text-lg md:text-xl animate-fadeInUp delay-300">
            Join Us for an Unforgettable Dining Experience!
          </p>
        </div>
      </div>
      <div className="relative bg-black bg-opacity-70 text-white text-center p-10 mt-10 rounded-lg mx-5 md:mx-20 animate-fadeInUp delay-400">
        <h2 className="text-xl md:text-2xl font-bold mb-2">
          Discover the Essence of Authentic Cuisine
        </h2>
        <p className="text-sm md:text-lg">
          At Khan Shanwari, we blend tradition with culinary artistry to offer a
          unique dining experience. Our chefs use the finest ingredients to
          create dishes that tantalize your taste buds. Come and enjoy the
          warmth of our hospitality!
        </p>
      </div>
    </>
  );
};

export default Home;
