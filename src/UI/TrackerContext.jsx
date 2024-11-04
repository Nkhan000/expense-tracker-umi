/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

export const TrackerContext = createContext();

export function TrackerProvider({ children }) {
  const [selectedTracker, setSelectedTracker] = useState(null);
  const [selectedTrackerObj, setSelectedTrackerObj] = useState({});
  const setName = setSelectedTracker;
  const setObj = setSelectedTrackerObj;
  const removeObj = () => setSelectedTrackerObj({});
  const removeName = () => setSelectedTracker(null);
  return (
    <TrackerContext.Provider
      value={{
        selectedTracker,
        setName,
        removeName,
        setObj,
        removeObj,
        selectedTrackerObj,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
}
