import {ConnectType, useWallet, WalletStatus} from '@terra-money/wallet-provider';
import Styles from './connect.module.scss';
import {useWalletMount} from 'utils/hooks/useWalletAmount';

type Props = {
  showTransAction: (arg: boolean) => void;
  showTeraConnect: (arg: boolean) => void;
}

export const ConnectToWallet = ({showTransAction, showTeraConnect}: Props) => {
  const {
    status,
    wallets,
    availableConnectTypes,
    availableInstallTypes,
    availableConnections,
    connect,
    install,
    disconnect,
  } = useWallet();
  const [LUNA] = useWalletMount();

  const handleClickTransAction = () => {
    showTeraConnect(false);
    showTransAction(true);
  };


  return (
    <div className={Styles['connect-wallet']}>

      {status === WalletStatus.WALLET_CONNECTED && (
        <section>
          <p className='color-green text-center text-2'>TERRA STATION WALLET</p>
          <p className='text-weight-bold'
             style={{textOverflow: 'ellipsis', maxWidth: '80%', overflow: 'hidden'}}>{wallets[0]?.terraAddress}</p>
          <hr />
          <div className='d-flex align-items-center justify-content-between mb-3'>
            <span>LUNA:</span>
            <span>{LUNA ? LUNA : (<div className='spinner-border text-success' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </div>)}</span>
          </div>

          <div className='btn-group w-100 mb-3' role='group'>
            <button type='button' className='btn btn-success me-1'><strong>Terra</strong>Bridge</button>
            <a type='button' href='https://docs.anchorprotocol.com/anchor-2/user-guide/interchain-transfers'
               target='_blank' className='btn btn-success'>Docs <i className='bi bi-box-arrow-up-right' /></a>
          </div>

          <button className='btn btn-success rounded-4 d-block w-100 mb-3' onClick={handleClickTransAction}>SEND
          </button>
        </section>
      )}
      {status === WalletStatus.INITIALIZING && (
        <div className='d-flex flex-column align-items-center justify-content-center'>
          <div className='spinner-border text-success' role='status'>
            <span className='visually-hidden'>Loading...</span>
          </div>
          <p className='mb-0 mt-2 text-success text-weight-600'>
            {status}...
          </p>
        </div>
      )}

      <section className='d-flex flex-column'>
        {status === WalletStatus.WALLET_NOT_CONNECTED && (
          <>
            <h1 className='text-4 text-weight-bold color-black-3 text-center mb-3'>Connect Wallet</h1>

            {availableConnections.filter(el => el.type !== ConnectType.READONLY).map(
              ({type, name, icon, identifier = ''}) => (
                <button
                  className='btn bg-color-gray-1 text-2 text-weight-600 color-black border rounded-4 mb-2 d-flex align-items-center justify-content-between'
                  key={'connection-' + type + identifier}
                  onClick={() => connect(type, identifier)}
                >
                  {name}
                  <img
                    src={icon}
                    alt={name}
                    style={{width: '1em', height: '1em'}}
                  />
                </button>
              ),
            )}
            {availableConnectTypes.map((connectType) => (
              <button
                className='btn text-2 text-weight-600 color-black border rounded-4 mb-2 d-flex align-items-center justify-content-between'
                key={'connect-' + connectType}
                onClick={() => connect(connectType)}
              >
                Connect {connectType}
              </button>
            ))}
            {availableInstallTypes.map((connectType) => (
              <button
                className='btn text-2 text-weight-600 color-black border rounded-4 mb-2 d-flex align-items-center justify-content-between'
                key={'install-' + connectType}
                onClick={() => install(connectType)}
              >
                Install {connectType}
              </button>
            ))}

            <hr />

            {availableConnections.filter(el => el.type === ConnectType.READONLY).map(
              ({type, name, icon, identifier = ''}) => (
                <button
                  className='btn btn-lg text-3 text-weight-600 color-gray border rounded-4 mb-2 d-flex align-items-center justify-content-center'
                  key={'connection-' + type + identifier}
                  onClick={() => connect(type, identifier)}
                >
                  {name}
                </button>
              ),
            )}

            <p className='mt-3 text-1 color-gray-2'>
              <span className='d-inline-block' style={{letterSpacing: '1px'}}>By connecting, I accept Anchor's </span>
              <br />
              <a target='_blank' className='color-green text-decoration-none text-weight-600 text-le'
                 href='https://app.anchorprotocol.com/earn#/terms'>Terms of Service</a>
            </p>
          </>
        )}
        {status === WalletStatus.WALLET_CONNECTED && (
          <button
            className='btn text-2 d-block mx-auto w-100 text-center text-weight-600 color-black border rounded-4 mb-2 btn-outline-danger'
            onClick={() => disconnect()}>Disconnect</button>
        )}
      </section>
    </div>
  );
};
