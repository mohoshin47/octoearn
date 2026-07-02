import React from 'react';
import { showRewardedPopup } from '../utils/monetagAds';
import { useEffect, useState } from 'react';
import { showAdsgramReward } from "../utils/adsgram";

interface AdCardProps {
  telegramId?: Number;
  MonetagZoneId?: string;
  disabled?: boolean;
  status?: 'PENDING' | 'COMPLETED';
  onAction?: () => void;
  firstadsshow?: boolean;
}

const AdCard: React.FC<AdCardProps> = ({
  telegramId = 0,
  MonetagZoneId = '00',
  disabled = false,
  status = 'PENDING',
  onAction,
  firstadsshow,
}) => {
  const [loadingAd, setLoadingAd] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    // console.log('firsadshow' + '' + firstadsshow);
    if (!loadingAd) return;
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setLoadingAd(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [loadingAd]);

  const handleShowAd = async () => {
    if (disabled || loadingAd) return;

    // Countdown Start
    setLoadingAd(true);
    setCountdown(30);

    if(!firstadsshow){
      try {
      const success = await showRewardedPopup(MonetagZoneId, telegramId.toString());
      if (success) {
        onAction?.();
      }
    } catch (err) {
      console.error('Ad failed:', err);
    }
    }

    if (firstadsshow) {
       const success = await showAdsgramReward();
    if(success){
        console.log("User watched Ads");
    }else{
        console.log("Ads Failed");
    }
    }

  };

  return (
    <div className="w-full flex justify-center mt-4 border border-[#2A3146] rounded-lg">
      {/* Card container */}
      <div className="bg-gray-900 text-white rounded-lg p-4 w-full shadow-lg">
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
          disabled={disabled || loadingAd}
          className={`mt-3 w-full py-3 rounded-lg flex items-center justify-center gap-2 font-semibold transition ${
            disabled || loadingAd
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-purple-800 text-white'
          }`}
        >
          {loadingAd ? `⏳ Wait ${countdown}s` : '▶ Watch & Click Ad'}
        </button>
      </div>
    </div>
  );
};

export default AdCard;
