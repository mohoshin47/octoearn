import React from "react";

type Step = {
  label: string;
  icon: React.ReactNode;
};

const steps: Step[] = [
  {
    label: "Watch",
    icon: <span>📺</span>, // এখানে তুমি SVG/Icon ব্যবহার করতে পারো
  },
  {
    label: "Verify",
    icon: <span>🔑</span>,
  },
  {
    label: "Done",
    icon: <span>🎁</span>,
  },
];

interface ProgressProps {
  currentStep: number; // 0 = Watch, 1 = Verify, 2 = Done
}

const ProgressTracker: React.FC<ProgressProps> = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-center bg-gray-900 py-4 rounded-lg border border-[#2A3146] w-full">
      {steps.map((step, index) => (
        <div key={step.label} className="flex items-center">
          <div
            className={`flex flex-col items-center ${
              index === currentStep ? "text-purple-500" : "text-gray-400"
            }`}
          >
            <div
              className={`w-12 h-12 flex items-center justify-center rounded-full border-2 ${
                index === currentStep
                  ? "border-purple-500 bg-purple-900"
                  : "border-gray-600 bg-gray-800"
              }`}
            >
              {step.icon}
            </div>
            <span className="mt-2 text-sm font-medium">{step.label}</span>
          </div>
          {index < steps.length - 1 && (
            <div className="w-12 h-0.5 bg-gray-600 mx-4"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressTracker;
