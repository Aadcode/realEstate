import React from "react";

const PropertyGallery = () => {
  return (
    <div className="relative">
      <div className="relative rounded-xl overflow-hidden min-h-[660px]">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/61ec60b8b61a729bc8bb884bd839574093042f40?placeholderIfAbsent=true"
          alt="Property Front View"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute top-8 right-8 flex gap-6">
          <button className="bg-white/80 p-2 rounded-lg hover:bg-white transition-colors">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/3d33feb54c12e7baa25166a887fa30301590ce32?placeholderIfAbsent=true"
              alt="Share"
              className="w-6"
            />
          </button>
          <button className="bg-white/80 p-2 rounded-lg hover:bg-white transition-colors">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/3d088a9e4f97a765f9e517e40dbc49201a566513?placeholderIfAbsent=true"
              alt="Favorite"
              className="w-6"
            />
          </button>
        </div>

        <div className="absolute bottom-12 left-12 right-12 text-white">
          <h2 className="text-2xl font-semibold">Front View</h2>
          <div className="flex justify-between items-end mt-6">
            <p className="max-w-xl leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi
            </p>
            <div className="flex gap-2.5">
              <div className="w-[67px] h-2 bg-white rounded-xl" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-[37px] h-2 bg-white/30 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <button className="mt-12 px-5 py-2.5 bg-indigo-600 text-white rounded-xl">
        Type XYZ
      </button>

      <div className="mt-8 flex flex-wrap justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold">
            98AB Alexander Court, London
          </h2>
          <div className="flex items-center mt-4 text-gray-500">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/aedeeae325659341de592c3cd8e291ee521f6b92?placeholderIfAbsent=true"
              alt="Location"
              className="w-6 h-6"
            />
            <span className="ml-2">45 Connor St. London, 44523</span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm">Price range</p>
          <p className="text-2xl font-semibold text-indigo-600 mt-4">
            $400.000 - $600.000
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-12">
        {[
          {
            icon: "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/c794b0c7c7090cfbb41f2edd057a4f60f69e8cad?placeholderIfAbsent=true",
            text: "4 Bedroom",
          },
          {
            icon: "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/32c7eaabf911c3ba6a20dfe6bc39bcd145bfa7ec?placeholderIfAbsent=true",
            text: "2 Bathroom",
          },
          {
            icon: "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/9e1f8d4e35b3ad14afe51595763178540af2007b?placeholderIfAbsent=true",
            text: "Wifi Available",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-5 py-3 bg-indigo-50 text-indigo-600 rounded-xl"
          >
            <img src={feature.icon} alt={feature.text} className="w-7" />
            <span>{feature.text}</span>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h3 className="text-lg font-semibold">Description</h3>
        <p className="mt-4 text-gray-500 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <p className="mt-6 text-gray-500 leading-relaxed">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem
          accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae
          ab illo inventore veritatis et quasi architecto beatae vitae dicta
          sunt explicabo.
        </p>
      </div>

      <div className="mt-8 relative overflow-hidden">
        <div className="flex gap-8 overflow-x-auto py-4">
          {[
            "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/c391f0c6a84b8bb09a190635ff2e25f90a3e317c?placeholderIfAbsent=true",
            "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/15ecc8aaa99d15260549bb2aed74b73a8ac099fb?placeholderIfAbsent=true",
            "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/95e316ec486df093fb3450a280651d9083d31910?placeholderIfAbsent=true",
          ].map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Property View ${index + 1}`}
              className="w-[298px] rounded-xl object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyGallery;
