import AdCard from '../components/AdCard';
import Header from '../components/ProfileCard';
import ProgressTracker from '../components/ProgressTracker';
import VerifyCard from '../components/VerifyCard';
import WarningBox from '../components/WarningBox';

export default function Task() {
  return (
    <div className=" min-h-screen bg-[#090D14]">
      <Header completed={0} total={1} />

      <WarningBox message="Watch the ad fully and interact. You must tap/click the ad button or action window. Pure views without a click are rejected." />

      {/* <ProgressCard step={1} /> */}
      <div className="flex  justify-center mt-6 bg-gray-900 rounded-lg mx-5 border border-[#2A3146]">
        <ProgressTracker currentStep={1} />
      </div>
      <div className="flex justify-center m-6 border border-[#2A3146] rounded-lg">
        <AdCard status="PENDING" onAction={() => console.log('Ad action clicked')} />
      </div>

      <div className="flex justify-center m-6 border border-[#2A3146] rounded-lg">
        <VerifyCard watched={0} total={1} status="LOCKED" onVerify={() => console.log('Verify action clicked')} />
      </div>
    </div>
  );
}
