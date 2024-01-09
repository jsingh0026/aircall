import { useState } from "react";
import { BottomTabValues } from "../../components/config";

export const useBottomTabs = () => {
  const [currentTab, setCurrentTab] = useState(BottomTabValues.allCalls);
  const isArchivedTab = BottomTabValues.archivedCalls === currentTab;
  return { isArchivedTab, currentTab, setCurrentTab };
};
