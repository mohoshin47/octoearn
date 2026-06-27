import React from "react";

interface WarningBoxProps {
  message: string;
}

const WarningBox: React.FC<WarningBoxProps> = ({ message }) => {
  return (
    <div className="w-full">
      <div className="flex items-start gap-3 bg-gray-900 border border-yellow-500/40 rounded-lg p-4 shadow-lg mx-auto">
        {/* Icon */}
        <span className="text-yellow-400 text-2xl">⚠️</span>

        {/* Message */}
        <p className="text-yellow-400 text-sm font-medium">{message}</p>
      </div>
    </div>
  );
};

export default WarningBox;
