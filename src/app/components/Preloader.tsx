"use client";
import { useState, useEffect } from "react";

function Preloader({ done }: { done: boolean }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false); // after images/fonts loaded and small delay
      }, 1000); // you can adjust duration
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

return (
    <div
      className={`fixed inset-0 bg-body-bg z-50 flex items-center justify-center transition-opacity duration-700 ${
        done ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="loader"></div>
    </div>
  );
}

export default Preloader;


