import React, { useState } from "react";
import { TActiveTab } from "../types";

type TabsProps = {
  activeTab: TActiveTab;
  setActiveTab: React.Dispatch<React.SetStateAction<TActiveTab>>;
};

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div>
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "unpaid" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("unpaid")}
        >
          Unpaid
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === "paid" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setActiveTab("paid")}
        >
          Paid
        </button>
      </div>
    </div>
  );
};

export default Tabs;
