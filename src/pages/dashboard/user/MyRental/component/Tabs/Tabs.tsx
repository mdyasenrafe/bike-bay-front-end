import React from "react";
import { TActiveTab } from "../types";
import { Button } from "../../../../../../components/atoms";

type TabsProps = {
  activeTab: TActiveTab;
  setActiveTab: React.Dispatch<React.SetStateAction<TActiveTab>>;
};

const tabs = [
  { key: "unpaid", label: "Unpaid" },
  { key: "paid", label: "Paid" },
];

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div>
      <div className="flex justify-center space-x-4 mb-6">
        {tabs.map(({ key, label }) => (
          <Button
            key={key}
            onClick={() => setActiveTab(key as TActiveTab)}
            color={key === activeTab ? "primary" : "grey"}
            className={`h-[48px] w-[200px] rounded-full font-poppins text-[16px] ${
              key === activeTab ? "text-white" : "text-black"
            }`}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
