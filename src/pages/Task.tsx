import AdCard from '../components/AdCard';
import ProfileCard from '../components/ProfileCard';
import ProgressTracker from '../components/ProgressTracker';
import VerifyCard from '../components/VerifyCard';
import WarningBox from '../components/WarningBox';

import { useEffect, useState } from 'react';
import type { Task } from '../types/task';
import { getGlobalConfig } from '../services/userService';
import type { GlobalConfig } from '../types/globalConfig';
import { completeTask, verifyAdClick } from '../services/userService';

export default function Task() {
  const [taskCompleted, setTaskCompleted] = useState(false);
  const [config, setConfig] = useState<GlobalConfig | null>(null);
  const [completedAds, setCompletedAds] = useState(0);
  const totalAds = config?.adSettings.adsPerSession ?? 0;
  const canVerify = completedAds >= totalAds && totalAds > 0;
  let currentStep = 0;
  // Watch
  if (completedAds < totalAds) {
    currentStep = 0;
  } else if (completedAds >= totalAds) {
    currentStep = 1;
  }
  if (taskCompleted) {
    currentStep = 2;
  }

  const startParam = window.Telegram.WebApp.initDataUnsafe.start_param;
  const taskId = startParam?.replace('task_', '');
  let telegramId = 0;
  const tg = window.Telegram?.WebApp;
  if (tg?.initDataUnsafe?.user) {
    telegramId = tg.initDataUnsafe.user.id;
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
      // Step 1: Verify Ad Click
      const verify = await verifyAdClick(telegramId);

      if (!verify.verified) {
        window.Telegram.WebApp.showPopup(
          {
            title: '❌ Verification Failed',
            message: verify.message || 'Please click the ad first.',
            buttons: [
              {
                id: 'ok',
                type: 'default',
                text: 'OK',
              },
            ],
          },
          () => {}
        );

        return;
      }

      // Step 2: Complete Task
      const res = await completeTask(telegramId, taskId!);

      if (!res.success) return;

      setTaskCompleted(true);
      setCompletedAds(0);

      window.Telegram.WebApp.showPopup(
        {
          title: '🎉 Success',
          message: 'Task completed successfully.',
          buttons: [
            {
              id: 'ok',
              type: 'default',
              text: 'Back',
            },
          ],
        },
        (buttonId: string) => {
          if (buttonId === 'ok') {
            window.Telegram.WebApp.close();
          }
        }
      );
    } catch (err: any) {
      window.Telegram.WebApp.showPopup({
        title: '❌ Error',
        message: err.response?.data?.message || 'Verification failed.',
        buttons: [
          {
            id: 'ok',
            type: 'default',
            text: 'OK',
          },
        ],
      });
    }
  };

  // if (loading) {
  //   return <div className="text-white p-5">Loading...</div>;
  // }

  return (
    <div className=" min-h-screen bg-[#090D14] ">
      <ProfileCard completed={completedAds} total={totalAds} />

      <div className="m-4">
        <WarningBox message={config?.adSettings?.adsAler ?? ''.toString()} />
        {/* <ProgressCard step={1} /> */}
        <div className="flex  justify-center mt-4 ">
          <ProgressTracker currentStep={currentStep} />
        </div>
        <div className="flex justify-center">
          <AdCard
            telegramId={telegramId}
            MonetagZoneId={config?.adSettings?.MonetagZoneId}
            disabled={taskCompleted}
            status={canVerify ? 'COMPLETED' : 'PENDING'}
            onAction={() => {
              setCompletedAds((prev) => prev + 1);
            }}
            firstadsshow={config?.adSettings?.firstadsshow}
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
        {/* <TestCard
          message={`Telegram ID: ${telegramId}
Task ID: ${taskId}`}
        /> */}
      </div>
    </div>
  );
}
