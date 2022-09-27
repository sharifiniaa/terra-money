import { Fee, MsgSend, SyncTxBroadcastResult } from '@terra-money/terra.js';
import {
  createLCDClient,
  CreateTxFailed,
  SignResult,
  Timeout,
  TxFailed,
  TxUnspecifiedError,
  useConnectedWallet,
  UserDenied,
} from '@terra-money/wallet-provider';
import { useCallback, useState } from 'react';


export const useSignTransAction = () => {
  const [txResult, setTxResult] = useState<SyncTxBroadcastResult & {code?: number | string} | null>(null);
  const [txError, setTxError] = useState<string | null>(null);

  const connectedWallet = useConnectedWallet();

  const send = useCallback(({address, amount} : {address: string; amount: number}) => {
    if (!connectedWallet) {
      return;
    }


    if (connectedWallet.network.chainID.startsWith('columbus')) {
      alert(`Please only execute this example on Testnet`);
      return;
    }

    setTxResult(null);
    setTxError(null);

    connectedWallet
      .sign({

        fee: new Fee(100000, {uluna: amount * 100000}),
        msgs: [
          new MsgSend(connectedWallet.walletAddress, address, {
            uluna: amount * 1000000,
          }),
        ],
      })
      .then((nextSignResult: SignResult) => {
        // broadcast
        const tx = nextSignResult.result;

        const lcd = createLCDClient({network: connectedWallet.network});

        return lcd.tx.broadcastSync(tx);
      })
      .then((nextTxResult: SyncTxBroadcastResult) => {
        setTxResult(nextTxResult);
      })
      .catch((error: unknown) => {
        if (error instanceof UserDenied) {
          setTxError('User Denied');
        } else if (error instanceof CreateTxFailed) {
          setTxError('Create Tx Failed: ' + error.message);
        } else if (error instanceof TxFailed) {
          setTxError('Tx Failed: ' + error.message);
        } else if (error instanceof Timeout) {
          setTxError('Timeout');
        } else if (error instanceof TxUnspecifiedError) {
          setTxError('Unspecified Error: ' + error.message);
        } else {
          setTxError(
            'Unknown Error: ' +
            (error instanceof Error ? error.message : String(error)),
          );
        }
      });
  }, [connectedWallet]);

  return {send, txError, txResult, connectedWallet}

}