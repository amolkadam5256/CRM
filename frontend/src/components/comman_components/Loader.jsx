import { useState, useEffect } from "react";

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500); // wait a bit before calling onComplete
          return 100;
        }
        return prev + 2; // increase progress
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      {/* Spinner */}
      <div className="w-20 h-20 mb-8 relative">
        <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
        <div
          className="absolute inset-0 border-4 border-blue-600 rounded-full animate-spin"
          style={{ borderRightColor: 'transparent' }}
        ></div>
      </div>

      {/* Progress Bar */}
      <div className="w-64 bg-gray-200 rounded-full h-2 mb-4">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Progress Text */}
      <p className="text-gray-600 font-medium">Loading... {progress}%</p>

      {/* Animated Dots */}
      <div className="flex space-x-1 mt-2">
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '100ms' }}></div>
        <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '200ms' }}></div>
      </div>
    </div>
  );
};

export default Loader;
