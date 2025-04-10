"use client";
import React from "react";

const PropertyCard = ({
  title,
  description,
  status,
  address,
  city,
  state,
  price,
  bedrooms,
  bathrooms,
  squareFeet,
  yearBuilt,
  features,
  imageUrls,
  agent,
}) => {
  // Random property images from Unsplash
  const randomImages = [
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800",
    "https://images.unsplash.com/photo-1600047509807-ba8fdbd844c7?auto=format&fit=crop&w=800",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800",
    "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=800",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800",
    "https://images.unsplash.com/photo-1600607687644-c7171b4249b8?auto=format&fit=crop&w=800",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800"
  ];

  // Get a random image from the collection
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * randomImages.length);
    return randomImages[randomIndex];
  };

  // Hardcoded fallback data
  const fallbackData = {
    image: getRandomImage(),
    location: {
      name: "Mumbai",
      icon: "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/9dfee8e5241317d1b0cef59fdae991532e6ddb33?placeholderIfAbsent=true",
    },
    price: "5,400,000",
    beds: {
      count: 3,
      icon: "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/5a1ea3a9ed0d1553c9ed8a1ce7b09cc2124079d7?placeholderIfAbsent=true",
    },
    baths: {
      count: 2,
      icon: "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/c8bfb39a7abfcd6bb64ee1eddc31d4580405e68e?placeholderIfAbsent=true",
    },
    sqft: {
      value: "1000",
      icon: "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/db4d3d001eec5b9a78bc3ed73ab7e23b474df7b3?placeholderIfAbsent=true",
    },
    description: "Beautiful property with modern amenities and great location. Perfect for families and professionals alike.",
    agent: {
      name: "Jane Cooper",
      image: "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/aaa2156d308858a882e6b44541bbb63e2ccc90c2?placeholderIfAbsent=true",
      socialLinks: [
        {
          icon: "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/11245689f2e69ced2e57fc99382f95e55e54c2ba?placeholderIfAbsent=true",
        },
        {
          icon: "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/ebca5245924919e9282c6d76deeb7a2225833d0e?placeholderIfAbsent=true",
        },
        {
          icon: "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/0985aa3b30ca68cea12d4fcfa17ff71c18c5e59d?placeholderIfAbsent=true",
        },
      ],
    },
  };

  // Use API data when available, fallback to hardcoded data
  const propertyData = {
    image: imageUrls?.[0] || fallbackData.image,
    location: {
      name: city || fallbackData.location.name,
      icon: fallbackData.location.icon,
    },
    price: price ? price.toLocaleString() : fallbackData.price,
    beds: {
      count: bedrooms || fallbackData.beds.count,
      icon: fallbackData.beds.icon,
    },
    baths: {
      count: bathrooms || fallbackData.baths.count,
      icon: fallbackData.baths.icon,
    },
    sqft: {
      value: squareFeet || fallbackData.sqft.value,
      icon: fallbackData.sqft.icon,
    },
    description: description || fallbackData.description,
    agent: {
      name: agent?.name || fallbackData.agent.name,
      image: fallbackData.agent.image,
      socialLinks: fallbackData.agent.socialLinks,
    },
  };

  return (
    <div className="overflow-hidden w-full bg-white rounded-md shadow-[0px_15px_55px_rgba(34,34,34,0.15)] hover:shadow-[0px_15px_55px_rgba(34,34,34,0.25)] transition-shadow duration-300">
      <div className="relative w-full aspect-[1.2]">
        <img
          src={propertyData.image}
          className="absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          alt={title || "Property"}
          onError={(e) => {
            e.target.src = fallbackData.image;
          }}
        />
        <div className="absolute top-4 left-4 flex gap-1 px-2.5 py-1.5 text-indigo-700 rounded-md bg-white/90 backdrop-blur-sm">
          <img
            src={propertyData.location.icon}
            className="object-contain shrink-0 w-3.5 aspect-square"
            alt={propertyData.location.name}
          />
          <div>{propertyData.location.name}</div>
        </div>
        <div className="absolute top-4 right-4 px-2.5 py-1.5 text-white bg-indigo-700 rounded-md">
          {status ? status.replace('_', ' ') : "For Sale"}
        </div>
      </div>
      <div className="p-8 w-full max-md:px-5">
        <div className="w-full text-2xl font-semibold leading-none text-black">
          ${propertyData.price}
        </div>
        <div className="flex gap-5 items-start mt-2 w-full text-sm font-medium text-black">
          <div className="flex gap-1.5 items-start">
            <img
              src={propertyData.beds.icon}
              className="object-contain shrink-0 w-6 aspect-square"
              alt="Beds"
            />
            <div>{propertyData.beds.count} Beds</div>
          </div>
          <div className="flex gap-1.5 items-start">
            <img
              src={propertyData.baths.icon}
              className="object-contain shrink-0 w-6 aspect-square"
              alt="Baths"
            />
            <div>{propertyData.baths.count} Baths</div>
          </div>
          <div className="flex gap-1.5 items-start">
            <img
              src={propertyData.sqft.icon}
              className="object-contain shrink-0 w-6 aspect-square"
              alt="Square feet"
            />
            <div>{propertyData.sqft.value} Sqft</div>
          </div>
        </div>
        <div className="pt-px pb-2 mt-2 w-full text-sm leading-6 text-zinc-500">
          {propertyData.description}
        </div>
        {features && features.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {features.map((feature, index) => (
              <span key={index} className="px-2 py-1 text-xs bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                {feature}
              </span>
            ))}
          </div>
        )}
        <div className="flex mt-2 w-full border-t border-zinc-500 min-h-px" />
        <div className="flex gap-10 justify-between items-center pt-2 mt-2 w-full">
          <div className="flex items-center self-stretch my-auto">
            <div className="flex flex-col items-start self-stretch pr-2.5 my-auto w-10 min-h-[30px]">
              <div className="flex flex-col justify-center min-h-[30px] w-[30px]">
                <img
                  src={propertyData.agent.image}
                  className="object-contain flex-1 w-full aspect-square rounded-[50px] hover:ring-2 hover:ring-indigo-500 transition-all"
                  alt={propertyData.agent.name}
                />
              </div>
            </div>
            <div className="self-stretch my-auto text-base font-semibold leading-none text-black">
              {propertyData.agent.name}
            </div>
          </div>
          <div className="flex flex-col items-start self-stretch my-auto w-[104px]">
            <div className="flex gap-4 items-start pr-3">
              {propertyData.agent.socialLinks.map((link, index) => (
                <div key={index} className="flex items-start w-6">
                  <img
                    src={link.icon}
                    className="object-contain w-6 aspect-square hover:scale-110 transition-transform"
                    alt={`Social link ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
