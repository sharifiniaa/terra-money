import React from 'react';
import Styles from './card.module.scss';
import {CardTitle} from './components/title';


type Props = {
  title: string;
  secondTitle: string;
  price: number;
  unit: string;
  children?: React.ReactNode;
  secondPrice: number;
  secondUnit: string;
}


export const Card = ({title, children, price, secondTitle, secondUnit, secondPrice, unit}: Props) => {
  return (
    <div className={Styles['card']}>
     <CardTitle title={title} price={price} unit={unit} />


      {children && <div>{children}</div>}


      <div className={Styles['card__divider']}/>

      <CardTitle title={secondTitle} price={secondPrice} unit={secondUnit} />
    </div>
  );
};

