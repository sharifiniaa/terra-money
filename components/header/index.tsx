import cn from 'classnames';
import Styles from './header.module.scss';
import NavbarLink from '../navbar/navbarLink';
import {useState} from 'react';


export const Header = () => {
  const [isMobileNavbarShow, setIsShowNavbar] = useState(false);

  return (
    <div className={cn(Styles['header'], 'bg-color-black')}>
      <header className='container pt-3 pb-3 pb-md-0'>
        <section className='d-flex d-md-block justify-content-between align-items-center'>
          <div className='bg-color-white d-inline-block mb-2'>logo</div>
          <div className='align-items-center justify-content-md-between d-flex justify-content-end'>
            <nav className={cn(Styles['header__items'], 'text-4 text-weight-800 d-none d-md-flex')}>
              <NavbarLink href='/'>DASHBOARD</NavbarLink>
              <NavbarLink href='/my-page'>MY PAGE</NavbarLink>
              <NavbarLink href='/earn'>EARN</NavbarLink>
            </nav>
            <div className='text-2 text-weight-500 d-flex flex-md-row align-items-end cursor-pointer'>
              <span className={cn(Styles['header__action'], 'me-1')}>Terra</span>
              <span className={Styles['header__action']}>Connect Wallet</span>
            </div>
            <div className='color-white d-block d-md-none ms-3 text-6'>
              <span onClick={() => setIsShowNavbar(!isMobileNavbarShow)}>
                {isMobileNavbarShow ? <i className="bi bi-x-square color-white"/> : <i className="bi bi-filter-square color-green"/>}
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
    </div>
  );
};
