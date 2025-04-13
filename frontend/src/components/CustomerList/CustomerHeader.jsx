"use client";

export default function CustomerHeader() {
  return (
    <div className="rounded-lg bg-white flex w-full px-8 py-4 items-center justify-between font-poppins max-sm:flex-col max-sm:gap-2.5">
      <div className="flex gap-2 items-center">
        <span className="text-sm text-indigo-700">Customer</span>
        <span className="text-sm text-indigo-700">/</span>
        <span className="text-sm text-gray-500">Customer List</span>
      </div>

      <button className="px-5 py-2.5  rounded-xl border border-solid cursor-pointer bg-indigo-700 bg-opacity-10 border-indigo-700 border-opacity-10 max-sm:w-full">
        Refresh
      </button>
    </div>
  );
}
