import React from "react";

interface CircularProgressProps {
  percentage: number;
  status: string;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  status,
  size = 100,
  strokeWidth = 8,
  label,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Healthy":
        return "#10B981"; // green-500
      case "Warning":
        return "#F59E0B"; // yellow-500
      case "Critical":
        return "#EF4444"; // red-500
      default:
        return "#6B7280"; // gray-500
    }
  };

  const color = getStatusColor(status);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={strokeWidth}
        />

        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500 ease-in-out"
        />
      </svg>

      {/* Center text */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center text-center"
        style={{ transform: "rotate(0deg)" }}>
        <span className="text-xs font-semibold">
          {label || `${percentage}%`}
        </span>
      </div>
    </div>
  );
};

export default CircularProgress;
