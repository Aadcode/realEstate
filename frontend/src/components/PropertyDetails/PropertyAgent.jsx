import React from "react";

const PropertyAgent = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="bg-indigo-600 text-white rounded-xl p-8 text-center mb-8">
        <h2 className="text-3xl font-semibold">SALE</h2>
        <p className="text-sm font-light mt-2">$400.000 - $600.000</p>
      </div>

      <div className="text-center">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/2bda6eb423efd913f3b419867929d97fe689db6b?placeholderIfAbsent=true"
          alt="Agent"
          className="w-36 h-36 rounded-xl mx-auto object-cover"
        />
        <h3 className="text-xl font-semibold mt-4">Samuel Rodriguez</h3>
        <p className="text-sm mt-4">Agent</p>
        <p className="text-gray-500 text-sm leading-relaxed mt-6">
          Midnight Corner St. Suite 600 San Francisco,
          <br />
          CADGE 94107
        </p>

        <div className="flex justify-center gap-2.5 mt-6">
          {[
            "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/fc202582384498477e8e33356b8893cc58c0406d?placeholderIfAbsent=true",
            "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/be96a48cd89538e9874d2c2c170fcb422f01729a?placeholderIfAbsent=true",
            "https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/c45f805667b9ed36ab7532e980fe765910038796?placeholderIfAbsent=true",
          ].map((icon, index) => (
            <button
              key={index}
              className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center hover:bg-indigo-200 transition-colors"
            >
              <img src={icon} alt="Social" className="w-6 h-6" />
            </button>
          ))}
        </div>

        <button className="w-full mt-8 border border-indigo-600 text-indigo-600 rounded-xl py-3 flex items-center justify-center gap-2 hover:bg-indigo-50 transition-colors">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/53f320a0e0e6dc706b2becd515691efaa0225c9c?placeholderIfAbsent=true"
            alt="Phone"
            className="w-6"
          />
          <span>+12 5123 5512 66</span>
        </button>
      </div>
    </div>
  );
};

export default PropertyAgent;
