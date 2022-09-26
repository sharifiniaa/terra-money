import React from "react";
import { useRouter } from 'next/router'
import Styles from './navbarLink.module.scss'
import cn from "classnames";


type Props = {
    children: React.ReactNode;
    href: string;
    classNames?: string;
}

function NavbarLink({ children, href }: Props) {
    const router = useRouter();


    return (
        <a href={href} onClick={() => router.push(href)} className={cn(Styles['link'], router.asPath === href ? Styles['link--active'] : '')}>
            {children}
        </a>
    )
}

export default NavbarLink