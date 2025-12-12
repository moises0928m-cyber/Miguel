import React from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate("");

  return (
    <div className="min-h-screen flex flex-col bg-[#1A1A1A] text-white">
      <header className="bg-[#0E0E0E] p-4 border border-[#3A3A3A]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-[#B3B3B3]">
            <div className="w-12 h-12 rounded-md flex items-center justify-center font-bold">
              <Link to="/">
                <img
                  src="images/log.png"
                  onDoubleClick={() => navigate("/login")}
                  alt=""
                />
              </Link>
            </div>
            <h1 className="text-xl font-semibold">
              Demo Pecheras & Cangureras
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full ">
        <Outlet />
      </main>

      <footer className="bg-[#0E0E0E] p-4 text-center border border-[#3A3A3A]">
        footer
      </footer>
    </div>
  );
}
