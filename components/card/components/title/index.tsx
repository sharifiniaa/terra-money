type Props = {
  title: string;
  price: number;
  unit: string;
}

export const CardTitle = ({title, price, unit}: Props) => {
  return (
    <section className='text-uppercase color-black-2'>
      <h2 className='text-2 text-weight-600 mb-0'>{title}</h2>
      <div>
        <span className='text-7 text-weight-600'>{price.toLocaleString()}</span> <span className='text-weight-600'>{unit}</span>
      </div>
    </section>
  );
};