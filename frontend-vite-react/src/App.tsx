import { CounterAppProvider } from "@/modules/midnight/counter-ui";
import { MidnightMeshProvider } from "@meshsdk/midnight-react";
import {
  NetworkId,
  setNetworkId,
} from "@midnight-ntwrk/midnight-js-network-id";
import * as pino from "pino";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { MainLayout } from "./layouts/layout";
import { Counter } from "./pages/counter";
import { Home } from "./pages/home/";
import { WalletUI } from "./pages/wallet-ui";

export const logger = pino.pino({
  level: "trace",
});
// Update this network id, could be testnet or undeployed
setNetworkId(NetworkId.Undeployed);
// Update this with your deployed contract address
const contractAddress =
  "0200616f9ecf9710f508bf13f7f98dacbed239a0f38fb289f08d532d7b367dd57505";

/**
 * App Component
 * @returns
 */
function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <MidnightMeshProvider logger={logger}>
        <CounterAppProvider logger={logger} contractAddress={contractAddress}>
          <BrowserRouter basename="/">
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/wallet-ui" element={<WalletUI />} />
                <Route path="/counter" element={<Counter />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </CounterAppProvider>
      </MidnightMeshProvider>
    </ThemeProvider>
  );
}

export default App;
