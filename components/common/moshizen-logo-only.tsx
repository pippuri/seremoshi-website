import React from "react";

export function MoshizenLogo() {
  return (
    <svg
      width="200"
      height="40"
      viewBox="0 0 200 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="200" height="60" fill="white" />
      <circle cx="30" cy="30" r="20" fill="#4B0082" />
      <path
        d="M30 10C18.954 10 10 18.954 10 30C10 41.046 18.954 50 30 50"
        stroke="white"
        strokeWidth="2"
      />
      <path
        d="M50 30C50 18.954 41.046 10 30 10"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
}
