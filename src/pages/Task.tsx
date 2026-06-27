import AdCard from '../components/AdCard';
import ProfileCard from '../components/ProfileCard';
import ProgressTracker from '../components/ProgressTracker';
import VerifyCard from '../components/VerifyCard';
import WarningBox from '../components/WarningBox';

import { useEffect, useState } from 'react';
import type { Task } from '../types/task';
import { getGlobalConfig } from '../services/userService';
import type { GlobalConfig } from '../types/globalConfig';
import { completeTask } from '../services/userService';
import { initData } from '@telegram-apps/sdk';

export default function Task() {
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [config, setConfig] = useState<GlobalConfig | null>(null);
  const [completedAds, setCompletedAds] = useState(0);
  const totalAds = config?.adsPerSession ?? 0;
  const canVerify = completedAds >= totalAds && totalAds > 0;
  let currentStep = 0;
  // Watch
  if (completedAds < totalAds) {
    currentStep = 0;
  } else if (completedAds >= totalAds) {
    currentStep = 1;
  }

  // Done (Verify success হলে)
  if (taskCompleted) {
    currentStep = 2;
  }

  console.log({
    completedAds,
    totalAds,
    canVerify,
  });

  const params = new URLSearchParams(window.location.search);
  const taskId = params.get('taskId');
  // console.log(taskId);
  let telegramId = 0;
  const telegramUser = initData.user();
  if (telegramUser) {
    telegramId = telegramUser.id;
  } else {
    telegramId = 6249158607;
  }

  useEffect(() => {
    loadGlobalConfig();
  }, []);

  async function loadGlobalConfig() {
    try {
      const data = await getGlobalConfig();

      setConfig(data);
    } catch (err) {
      console.log(err);
    }
  }

  const handleVerify = async () => {
    try {
      const res = await completeTask(telegramId, taskId!);

      if (res.success) {
        alert('🎉 Task Completed Successfully!');

        setTaskCompleted(true);
        setCompletedAds(0);
      }
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to complete task');
    }
  };

  // if (loading) {
  //   return <div className="text-white p-5">Loading...</div>;
  // }

  return (
    <div className=" min-h-screen bg-[#090D14] ">
      <ProfileCard completed={completedAds} total={totalAds} />

      <div className="m-4">
        <WarningBox message="Watch the ad fully and interact. You must tap/click the ad button or action window. Pure views without a click are rejected." />
        {/* <ProgressCard step={1} /> */}
        <div className="flex  justify-center mt-6 ">
          <ProgressTracker currentStep={currentStep} />
        </div>
        <div className="flex justify-center">
          <AdCard
            status={canVerify ? 'COMPLETED' : 'PENDING'}
            onAction={() => {
              setCompletedAds((prev) => prev + 1);
            }}
          />
        </div>

        <div className="flex justify-center">
          <VerifyCard
            watched={completedAds}
            total={totalAds}
            status={canVerify ? 'PENDING' : 'LOCKED'}
            disabled={!canVerify}
            onVerify={() => {
              if (!canVerify) return;
              setCompletedAds(0);
              setTaskCompleted(true);
              handleVerify();
            }}
          />
        </div>
      </div>
    </div>
  );
}
