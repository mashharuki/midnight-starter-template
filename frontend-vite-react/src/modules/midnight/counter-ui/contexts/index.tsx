import type { ContractAddress } from "@midnight-ntwrk/compact-runtime";
import { Logger } from "pino";
import { DeployedProvider } from "./counter-deployment";
import { LocalStorageProvider } from "./counter-localStorage";
import { Provider } from "./counter-providers";

export * from "./counter-deployment";
export * from "./counter-deployment-class";
export * from "./counter-localStorage";
export * from "./counter-localStorage-class";
export * from "./counter-providers";

interface AppProviderProps {
  children: React.ReactNode;
  logger: Logger;
  contractAddress: ContractAddress;
}

export const CounterAppProvider = ({
  children,
  logger,
  contractAddress,
}: AppProviderProps) => {
  return (
    <LocalStorageProvider logger={logger}>
      <Provider logger={logger}>
        <DeployedProvider logger={logger} contractAddress={contractAddress}>
          {children}
        </DeployedProvider>
      </Provider>
    </LocalStorageProvider>
  );
};
