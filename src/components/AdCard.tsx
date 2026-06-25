import React from "react";

interface AdCardProps {
  status?: "PENDING" | "COMPLETED";
  onAction?: () => void;
}

const AdCard: React.FC<AdCardProps> = ({ status = "PENDING", onAction }) => {
  return (
    <div className="w-full flex justify-center">
      {/* Card container */}
      <div className="bg-gray-900 text-white rounded-lg p-6 w-full shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">📺</span>
            <span className="font-semibold">Watch & Click Ad</span>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              status === "PENDING"
                ? "bg-yellow-600 text-black"
                : "bg-green-600 text-white"
            }`}
          >
            {status}
          </span>
        </div>

        {/* Instruction */}
        <p className="text-gray-400 text-sm mb-6">
          Watch the video and tap the action button inside the ad to qualify.
        </p>

        {/* Action Button */}
        <button
          onClick={onAction}
          className="mt-3 w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition"
        >
          ► Watch & Click Ad
        </button>
      </div>
    </div>
  );
};

export default AdCard;
