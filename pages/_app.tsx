import 'styles/app.scss'
import {
  getChainOptions,
  StaticWalletProvider,
  WalletControllerChainOptions,
  WalletProvider,
} from '@terra-money/wallet-provider';
import { AppProps } from 'next/app';
import React from 'react';
import {DashboardLayout} from "layouts/dashboardLayout";

export default function App({
  Component,
  defaultNetwork,
  walletConnectChainIds,
}: AppProps & WalletControllerChainOptions) {
  const main = (
    <DashboardLayout>
      <Component />
    </DashboardLayout>
  );

  return typeof window !== 'undefined' ? (
    <WalletProvider
      defaultNetwork={defaultNetwork}
      walletConnectChainIds={walletConnectChainIds}
    >
      {main}
    </WalletProvider>
  ) : (
    <StaticWalletProvider defaultNetwork={defaultNetwork}>
      {main}
    </StaticWalletProvider>
  );
}

App.getInitialProps = async () => {
  const chainOptions = await getChainOptions();
  return {
    ...chainOptions,
  };
};