import React from "react";

const PropertyLocation = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-xl font-semibold">Property Location</h3>

      <div className="mt-8 rounded-xl overflow-hidden h-[350px] bg-gray-500">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/320980a9f43ec4bc0a98dd9772e9282478473734?placeholderIfAbsent=true"
          alt="Property Location"
          className="w-full h-full object-cover"
        />
      </div>

      <button className="w-full mt-8 bg-indigo-600 text-white rounded-xl py-3 hover:bg-indigo-700 transition-colors">
        View in Full Screen
      </button>

      <div className="mt-8">
        <h3 className="text-xl font-semibold">Owner History</h3>

        {[
          {
            name: "James Humbly",
            img: "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/1ce4ec0b20af07c2d764de9fb0e7e8975a081eee?placeholderIfAbsent=true",
          },
          {
            name: "Erico Lee",
            img: "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/c9561bac5f8ba14773833284981799d22bf0df4b?placeholderIfAbsent=true",
          },
          {
            name: "Cindy Samantha",
            img: "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/e0ad7b35ead4793f33ca4c2e29dbd1aa6cc106bd?placeholderIfAbsent=true",
          },
        ].map((owner, index) => (
          <div key={index} className="mt-6">
            <div className="flex gap-4">
              <img
                src={owner.img}
                alt={owner.name}
                className="w-13 h-13 rounded-xl"
              />
              <div>
                <h4 className="font-semibold">{owner.name}</h4>
                <p className="text-sm text-gray-500 mt-1">
                  2 June 2018 - 4 June 2019
                </p>
              </div>
            </div>
            <div className="flex gap-1 ml-[68px] mt-1">
              {[20, 21, 22, 23, 30].map((num) => (
                <img
                  key={num}
                  src={`URL_${num}`}
                  alt="Rating"
                  className="w-4 h-4"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyLocation;
