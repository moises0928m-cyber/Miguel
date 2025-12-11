import React from "react";
import { Link } from "react-router-dom";

export default function Regresar() {
  return (
    <>
      <div className="text-white w-35 p-2 ">
        <Link to="/" className="flex flex-row items-center gap-2 pl-4">
          <img
            className="invert"
            width="50"
            height="50"
            src="https://img.icons8.com/ios/50/left--v1.png"
            alt="left--v1"
          />
          <p className="text-xl font-medium">Regresar</p>
        </Link>
      </div>
    </>
  );
}
