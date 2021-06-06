import React, { createContext, useCallback, useContext, useState } from 'react';

import { LoaderContainer } from './components/LoaderContainer';

interface ILoaderContextData {
  isLoading: boolean;

  startLoader: (loadingText?: string) => void;
  stopLoader: VoidFunction;
}

interface ILoaderContextProps {}

const LoaderContext = createContext<ILoaderContextData>(
  {} as ILoaderContextData,
);

const LoaderContextProvider: React.FC<ILoaderContextProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string | undefined>(undefined);

  const startLoader = useCallback((loadingText = 'Loading') => {
    setIsLoading(true);
    setLoadingText(loadingText);
  }, []);

  const stopLoader = useCallback(() => {
    setIsLoading(false);
    setLoadingText(undefined);
  }, []);

  return (
    <LoaderContext.Provider
      value={{
        isLoading,

        stopLoader,
        startLoader,
      }}
    >
      <>
        {isLoading && <LoaderContainer loadingText={loadingText} />}

        {children}
      </>
    </LoaderContext.Provider>
  );
};

const useLoader = () => useContext(LoaderContext);

export { LoaderContextProvider, useLoader };
