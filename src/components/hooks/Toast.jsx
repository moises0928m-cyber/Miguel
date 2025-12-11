import { useState, useEffect } from "react";

export default function Toast({ message, type = "error", show }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (show) {
      setVisible(true);
      const time = setTimeout(() => setVisible(false), false);
      return () => clearTimeout(time);
    }
  }, [show]);

  return (
    <div
      className={`  fixed top-5 right-5 px-4 py-3 rounded-lg text-white shadow-lg
        transition-all duration-300 z-50 ${
          visible ? "opacity-100 translate-y-0" : "opacity-100 translate-y-0"
        }${type === "error" && "bg-red-600"}`}
    >
      {message}
    </div>
  );
}
