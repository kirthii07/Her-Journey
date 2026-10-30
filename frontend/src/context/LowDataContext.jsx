import React, { createContext, useContext, useState, useEffect } from 'react';

const LowDataContext = createContext();

export function LowDataProvider({ children }) {
  const [lowDataMode, setLowDataMode] = useState(() => {
    return localStorage.getItem('herjourney_low_data') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('herjourney_low_data', lowDataMode);
  }, [lowDataMode]);

  const toggleLowDataMode = () => {
    setLowDataMode(prev => !prev);
  };

  return (
    <LowDataContext.Provider value={{ lowDataMode, setLowDataMode, toggleLowDataMode }}>
      {children}
    </LowDataContext.Provider>
  );
}

export function useLowData() {
  const context = useContext(LowDataContext);
  if (!context) {
    throw new Error('useLowData must be used within a LowDataProvider');
  }
  return context;
}

