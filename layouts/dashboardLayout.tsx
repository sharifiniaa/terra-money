import React from "react";
import {Header} from "components/header";


type Props = {
    children: React.ReactNode
}

export const DashboardLayout = ({children}: Props) => {
    return (
        <div>
            <Header/>
            <main className='container'>
                {children}
            </main>
        </div>
    )
}