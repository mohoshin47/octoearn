import createAdHandler from 'monetag-tg-sdk';
// তোমার Monetag dashboard থেকে পাওয়া Zone ID বসাও
const showRewardedPopup = createAdHandler(11201566);
import React from 'react';

interface AdCardProps {
  disabled?: boolean;
  status?: 'PENDING' | 'COMPLETED';
  onAction?: () => void;
}

const AdCard: React.FC<AdCardProps> = ({ disabled = false, status = 'PENDING', onAction }) => {
  // useEffect(() => {
  //   const showOnLoad = async () => {
  //     try {
  //       await showRewardedPopup();
  //       console.log('Ad shown on page load ✅ (no reward)');
  //     } catch (err) {
  //       console.error('Ad failed ❌', err);
  //     }
  //   };
  //   // showOnLoad();
  // }, []);

  const handleShowAd = async () => {
    if (disabled) return;
    try {
      await showRewardedPopup();
      onAction?.();
    } catch (err) {
      console.error('Ad failed:', err);
      alert('Ad not available ❌');
    }
  };

  return (
    <div className="w-full flex justify-center mt-4 border border-[#2A3146] rounded-lg">
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
              status === 'PENDING' ? 'bg-yellow-600 text-black' : 'bg-green-600 text-white'
            }`}
          >
            {status}
          </span>
        </div>

        {/* Instruction */}
        <p className="text-gray-400 text-sm mb-6">
          Watch the video and tap the action button inside the ad to qualify.
        </p>

        {/* Action Butts===abchefghi n */}
        <button
          onClick={handleShowAd}
          disabled={disabled}
          className={`mt-3 w-full py-3 rounded-lg flex items-center justify-center gap-2 font-semibold transition
  ${
    disabled
      ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
      : 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white'
  }`}
        >
          {disabled ? '✔ Task Completed' : '► Watch & Click Ad'}
        </button>
      </div>
    </div>
  );
};

export default AdCard;
