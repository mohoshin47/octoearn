import React from 'react';

interface VerifyCardProps {
  watched: number;
  total: number;
  status?: 'LOCKED' | 'UNLOCKED';
  onVerify?: () => void;
}

const VerifyCard: React.FC<VerifyCardProps> = ({ watched, total, status = 'LOCKED', onVerify }) => {
  return (
    <div className="w-full">
      {/* Card container */}
      <div className="bg-gray-900 text-white rounded-lg p-6 shadow-lg mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔒</span>
            <span className="font-semibold">Verify & Claim</span>
          </div>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              status === 'LOCKED' ? 'bg-orange-500 text-black' : 'bg-green-600 text-white'
            }`}
          >
            {status === 'LOCKED' ? 'PENDING' : 'READY'}
          </span>
        </div>

        {/* Instruction */}
        <p className="text-gray-400 text-sm !mb-4">Watch the ad to unlock.</p>

        {/* Action Button */}
        <button
          onClick={onVerify}
          disabled={status === 'LOCKED'}
          className={`w-full font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition ${
            status === 'LOCKED'
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white'
          }`}
        >
          ► Verify & Claim
        </button>

        {/* Progress */}
        <div className="mt-4 text-sm text-gray-400">
          watched: <span className="text-white font-bold">{watched}</span>/
          <span className="text-white font-bold">{total}</span>
        </div>
      </div>
    </div>
  );
};

export default VerifyCard;
