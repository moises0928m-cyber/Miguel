import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-row gap-4 items-center justify-center bg-black/50">
      <div className="w-8 h-8 rounded-full bg-white animate-bounce [animation-delay:.7s]" />
      <div className="w-8 h-8 rounded-full bg-white animate-bounce [animation-delay:.3s]" />
      <div className="w-8 h-8 rounded-full bg-white animate-bounce [animation-delay:.7s]" />
    </div>
  );
}
