import cn from 'classnames';
import Styles from './header.module.scss';
import NavbarLink from '../navbar/navbarLink';
import {useRef, useState} from 'react';
import Image from 'next/image';
import {ConnectToWallet} from 'components/Connect';
import {useClickOutside} from 'utils/hooks/useClickOutside';
import {useWallet} from '@terra-money/wallet-provider';
import {TransAction} from '../transaction';


export const Header = () => {
const{status, wallets} = useWallet();
  const [isMobileNavbarShow, setIsShowNavbar] = useState(false);
  const [showTeraConnect, setShowTeraConnect] = useState(false);
  const [showTransAction, setShowTransAction] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setShowTeraConnect(false));


  return (
    <div className={cn(Styles['header'], 'bg-color-black')}>
      <header className='container pt-3 pb-3 pb-md-0'>
        <section className='d-flex d-md-block justify-content-between align-items-center'>
          <div className='d-inline-block mb-2'><Image src='/logo.jpg' width='28px' height='28px' /></div>
          <div className='align-items-center justify-content-md-between d-flex justify-content-end'>
            <nav className={cn(Styles['header__items'], 'text-4 text-weight-800 d-none d-md-flex')}>
              <NavbarLink href='/'>DASHBOARD</NavbarLink>
              <NavbarLink href='/my-page'>MY PAGE</NavbarLink>
              <NavbarLink href='/earn'>EARN</NavbarLink>
            </nav>
            <div className='text-2 text-weight-500 d-flex flex-md-row align-items-end cursor-pointer position-relative'>
              <span className={cn(Styles['header__action'], 'me-1')}>Terra</span>
              <span onClick={() => setShowTeraConnect(true)} className={Styles['header__action']}>
                <i className='bi bi-wallet2 me-1 ' /> | {status === 'WALLET_CONNECTED' ? <span className={Styles['header__value']}>${wallets[0]?.terraAddress}</span> : 'Connect Wallet'}
              </span>
              {showTeraConnect && (
                <div ref={ref}>
                  <ConnectToWallet showTransAction={setShowTransAction} showTeraConnect={setShowTeraConnect}/>
                </div>
              )}
            </div>
            <div className='color-white d-block d-md-none ms-3 text-6'>
              <span onClick={() => setIsShowNavbar(!isMobileNavbarShow)}>
                {isMobileNavbarShow ? <i className='bi bi-x-square color-white' /> :
                  <i className='bi bi-filter-square color-green' />}
              </span>
            </div>
          </div>
        </section>
        {isMobileNavbarShow && (
          <nav
            className={cn(Styles['header__navbar-mobile'], isMobileNavbarShow ? Styles['header__navbar-mobile--open'] : '')}>
            <nav className='text-4 text-weight-900 flex-column d-flex'>
              <NavbarLink href='/'>DASHBOARD</NavbarLink>
              <NavbarLink href='/my-page'>MY PAGE</NavbarLink>
              <NavbarLink href='/earn'>EARN</NavbarLink>
            </nav>
          </nav>
        )}
      </header>
      {showTransAction && (
        <TransAction handleCloseTransAction={setShowTransAction} />
      )}
    </div>
  );
};
