import React, { useState } from 'react';
import Link from 'next/link';
const SearchButton = () => {
  const [imageSrc, setImageSrc] = useState<string>('/image2.png'); // Type the state as a string
  return (
    <div className="relative w-full max-w-xl mx-auto"> {/* Center and constrain width */}
      <input
        type="text"
        placeholder="Enter Your Postal Code"
        className="w-full pl-4 pr-8 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" // Rounded corners, reduced padding
      />
      {/* Search Icon at the end */}
      <Link href="/loading">
        <button
            onClick={() => console.log('Search triggered')}
            onMouseEnter={() => setImageSrc('/image.png')}
            onMouseLeave={() => setImageSrc('/image2.png')}
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
        >
            <img src={imageSrc} alt="Search Input" className="w-6 h-6" />
        </button>
      </Link>
    </div>
  );
};

export default SearchButton;