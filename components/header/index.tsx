import cn from 'classnames'
import Styles from './header.module.scss';
import ActiveLink from "../navbar/activeLink";

export const Header = () => {
    return (
        <div className={cn(Styles['header'], 'bg-color-black')}>
            <header className='container pt-3'>
                <div className='bg-color-white d-inline-block'>image</div>
               <div className='d-flex align-items-center justify-content-between'>
                   <nav className={cn(Styles['header__items'], 'text-4 text-weight-700')}>
                       <ActiveLink href='/'>DASHBOARD</ActiveLink>
                       <ActiveLink href='/my-page'>MY PAGE</ActiveLink>
                       <ActiveLink href='/earn'>EARN</ActiveLink>
                       {/*<ActiveLink href='borrow'>BORROW</ActiveLink>*/}
                       {/*<ActiveLink href='basset'>bASSET</ActiveLink>*/}
                       {/*<ActiveLink href='govern'>GOVERN</ActiveLink>*/}
                   </nav>
                   <div className='text-2 text-weight-700 d-flex flex-column flex-lg-row align-items-end'>
                       <span className={Styles['header__action']}>Terra</span>
                       <span className={Styles['header__action']}>Connect Wallet</span>
                   </div>
               </div>
            </header>
        </div>
    )
};
