import { MonitorPlay, ShieldCheck, Gift } from 'lucide-react';

interface Props {
  step: 1 | 2 | 3;
}

export default function ProgressCard({ step }: Props) {
  const steps = [
    {
      title: 'Watch',
      icon: MonitorPlay,
    },
    {
      title: 'Verify',
      icon: ShieldCheck,
    },
    {
      title: 'Done',
      icon: Gift,
    },
  ];

  return (
    <div className="mx-4 mt-6 rounded-[28px] border border-[#2A3146] bg-[#151822] p-6">
      <h2 className="flex mb-8 text-sm font-medium uppercase tracking-[6px] !text-[#5E6585]">Progress</h2>

      <div className="grid grid-cols-3">
        {steps.map((item, index) => {
          const Icon = item.icon;

          const active = step === index + 1;
          const completed = step > index + 1;

          return (
            <div key={index} className=" flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`relative flex h-18 w-18 items-center justify-center rounded-full transition

                  ${active ? 'ring-4 ring-violet-500 bg-[#292448]' : completed ? 'bg-green-600' : 'bg-[#24283D]'}`}
                >
                  <Icon size={30} className="text-white" />
                </div>

                <span
                  className={`mt-4 text-[17px] font-medium

                  ${active ? 'text-violet-400' : completed ? 'text-green-400' : 'text-[#646C90]'}`}
                >
                  {item.title}
                </span>
              </div>

              {index !== steps.length - 1 && <div className="mx-6 h-[3px] flex-1 rounded-full bg-[#313752]" />}
            </div>
          );
        })}
      </div>
    </div>
  );
}
