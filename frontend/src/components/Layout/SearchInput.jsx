"use client";
import React from "react";

const SearchInput = () => {
  return (
    <div className="flex items-center self-stretch py-3.5 my-auto text-base font-light min-h-[72px] min-w-60 text-neutral-500 w-[401px]">
      <div className="flex flex-col justify-center self-stretch my-auto min-w-60 w-[401px]">
        <div className="flex flex-1 items-center size-full">
          <div className="overflow-hidden flex-1 shrink self-stretch pt-0.5 my-auto w-full rounded-xl basis-0 min-w-40">
            <div className="flex flex-wrap items-start w-full">
              <div className="flex overflow-hidden flex-col flex-1 shrink justify-center px-5 py-2.5 rounded-3xl basis-0 bg-neutral-100 bg-opacity-80 min-h-[45px] min-w-60">
                <div className="overflow-hidden py-px w-full">Search Here</div>
              </div>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/6db47ee460180b83c4e07926f25e151d61c1ab84?placeholderIfAbsent=true"
                className="object-contain shrink-0 aspect-[1.02] w-[45px]"
                alt="Search Icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
