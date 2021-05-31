import React, { useEffect, useState } from 'react';

interface StorageBackendType {
  value: string,
  setBackend: (newValue: string) => void
}


export const StorageBackendContext = React.createContext<StorageBackendType | null>(null);

const StorageBackendProvider: React.FC = ({ children }) => {
  const [storageBackend, setStorageBackend] = useState<string>('');

  useEffect(() => {
    setStorageBackend(window.localStorage.getItem('md:settings:storage') || 'localstorage');
  }, []);

  useEffect(() => {  
    window.localStorage.setItem('md:settings:storage', storageBackend);
  }, [storageBackend]);

  const providerValue: StorageBackendType = { 
    value: storageBackend, 
    setBackend: setStorageBackend 
  }

  return (
    <StorageBackendContext.Provider value={providerValue}>
      {children}
    </StorageBackendContext.Provider>
  );
};

export default StorageBackendProvider;