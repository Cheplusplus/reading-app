import React from "react";

const Spinner: React.FC = () => {
  return (
    <svg width="40" height="40" viewBox="0 0 50 50" role="status" aria-label="Loading" style={{ animation: "rotate 2s linear infinite" }}>
      <circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="#4f46e5"
        strokeWidth="5"
        strokeLinecap="round"
        style={{
          strokeDasharray: "1, 150",
          strokeDashoffset: 0,
          animation: "dash 1.5s ease-in-out infinite",
        }}
      />
      <style>{`
        @keyframes rotate {
          100% {
            transform: rotate(360deg);
          }
        }
        @keyframes dash {
          0% {
            stroke-dasharray: 1, 150;
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -35;
          }
          100% {
            stroke-dasharray: 90, 150;
            stroke-dashoffset: -124;
          }
        }
      `}</style>
    </svg>
  );
};

export default Spinner;
