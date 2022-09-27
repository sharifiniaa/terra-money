import type {NextPage} from 'next';
import Image from 'next/image';
import {Card} from '../components/card';

const Dashboard: NextPage = () => {
  return (
    <div className='py-5'>
      <section className='d-flex flex-column flex-md-row align-items-baseline justify-content-between color-black-3 mb-3'>
        <h1 className='text-weight-900 text-9'>Dashboard</h1>
        <div className='d-flex align-items-center text-5 text-weight-500'><strong className='me-1'>1</strong> <small>aUST</small>
          <Image className='mx-1' src='/aust.svg'
                 width='25px'
                 height='25px' />
          <span
            className='mx-1'>≈ <strong>1.263</strong><small className='ms-1'>UST</small></span>
          <Image className='mx-1' src='/ust.svg' width='25px'
                 height='25px' /></div>
      </section>

      <div className='row'>
        <div className='col-12'>
          <Card title='TOTAL VALUE LOCKED' price={5619959922} secondPrice={119124919} secondTitle='YIELD RESERVE' secondUnit='UST' unit='UST' />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
