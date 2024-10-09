import React from "react";

export default function moshizenLogo() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="flex items-center px-5 py-3 bg-white rounded-full shadow-md">
        <div className="text-4xl mr-3 text-blue-500">&#128222;</div>
        <div>
          <div className="text-3xl font-bold">
            <span className="text-gray-800">Sere</span>
            <span className="text-blue-500">moshi</span>
          </div>
          <div className="text-sm text-gray-600 mt-1">
            Your AI Virtual Receptionist
          </div>
        </div>
      </div>
    </div>
  );
}
