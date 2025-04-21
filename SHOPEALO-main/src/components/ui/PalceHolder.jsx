import React from "react";

export default function PalceHolder() {
  return (
    <>
      <div className="w-full md:w-1/4 mb-5 px-2">
        <div className="bg-white shadow rounded-lg" aria-hidden="true">
          <div
            className="w-full"
            style={{ height: "180px", backgroundColor: "lightgray" }}
          ></div>
          <div className="p-4">
            <p className="space-y-2 animate-pulse">
              <span className="block h-4 bg-gray-300 rounded w-full"></span>
              <span className="block h-4 bg-gray-300 rounded w-full"></span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
