import React from 'react';

interface VerifyCardProps {
  watched: number;
  total: number;
  status: 'LOCKED' | 'PENDING';
  disabled?: boolean;
  onVerify: () => void;
}

const VerifyCard: React.FC<VerifyCardProps> = ({ watched, total, status = 'LOCKED', disabled = false, onVerify }) => {
  return (
    <div className="w-full mt-4">
      {/* Card container */}
      <div className="bg-gray-900 text-white rounded-lg p-6 shadow-lg mx-auto border border-[#2A3146]">
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
          disabled={disabled}
          onClick={onVerify}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            disabled
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-violet-500 text-white'
          }`}
        >
          Verify & Claim
        </button>

        {/* Progress */}
        <div className="mt-4 text-sm text-gray-400">
          watched: <span className="text-white font-bold">{watched}</span>/
          <span className="text-white font-bold">{total}  </span>
          <div className='mt-4'>
            <h2 className='!text-white'>V 1.5</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyCard;
