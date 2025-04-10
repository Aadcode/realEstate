import React from "react";

const RecentProperty = () => {
  return (
    <section className="px-4 w-full max-w-[424px] min-h-[664px] max-md:max-w-full">
      <article className="w-full bg-white rounded-xl min-h-[634px] shadow-[0px_5px_5px_rgba(82,63,105,0.05)]">
        <header className="flex justify-between items-center px-8 pt-6 w-full rounded-xl max-md:px-5">
          <h2 className="self-stretch pb-2 my-auto text-lg font-semibold text-black">
            Recent Property
          </h2>
          <div className="flex-1 shrink self-stretch pl-40 my-auto basis-0 min-w-6">
            <button>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/529af6ee19755d0e700079e58c6a1800403ddd80?placeholderIfAbsent=true"
                alt="Menu"
                className="object-contain w-6 aspect-square"
              />
            </button>
          </div>
        </header>

        <div className="flex flex-col flex-1 justify-center p-8 w-full max-md:px-5">
          <div className="w-full">
            <div className="overflow-hidden w-full">
              <div className="w-full min-h-px">
                <div className="flex flex-col w-full">
                  <a href="#" className="flex justify-center items-start">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/1477a28a2d7a69d6d67cfc6ab6aedd5df7764db2?placeholderIfAbsent=true"
                      alt="Property"
                      className="object-contain flex-1 shrink w-full rounded-xl aspect-[1.3] basis-0 max-w-[334px] min-w-60"
                    />
                  </a>
                  <h3 className="flex flex-col items-start mt-4 w-full text-base font-semibold text-black">
                    <a href="#">98AB Alexander Court, London</a>
                  </h3>
                  <address className="text-sm text-zinc-500 not-italic">
                    45 Connor St. London, 44523
                  </address>
                  <div className="flex gap-5 self-start mt-5">
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/311053d3fc50e2e6cde9bb9c0f11660b95d041dd?placeholderIfAbsent=true"
                      alt="Badge 1"
                      className="object-contain shrink-0 w-14 rounded-xl aspect-[2]"
                    />
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/fc301e310baf307c4fc3d31a4807b70ce06fd267?placeholderIfAbsent=true"
                      alt="Badge 2"
                      className="object-contain shrink-0 w-16 rounded-xl aspect-[2.28]"
                    />
                  </div>
                  <p className="mt-3.5 text-sm leading-5 text-zinc-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad mini
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-10 justify-between pt-px mt-6 w-full border-t border-zinc-100">
              <button className="pt-2 pb-2.5 w-[35px]">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/15a569a74c2b196f3e07ba3fd6c23574e0ef95c5?placeholderIfAbsent=true"
                  alt="Action 1"
                  className="object-contain aspect-[0.97] w-[34px]"
                />
              </button>
              <button className="pt-2 pb-2.5 w-[35px]">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/3911420c7fc948b98bd6faf80795a0cb/2610c146951cd87f59f020952bb8ca3566955975?placeholderIfAbsent=true"
                  alt="Action 2"
                  className="object-contain aspect-square w-[35px]"
                />
              </button>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default RecentProperty;
