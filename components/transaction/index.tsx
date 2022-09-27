import Styles from './transaction.module.scss';
import {Controller, useForm} from 'react-hook-form';
import {FormValues, Props} from './TTransaction';
import {useSignTransAction} from 'utils/hooks/useSignTransAction';
import {prefixes} from 'next/dist/build/output/log';


export const TransAction = ({handleCloseTransAction}: Props) => {
  const {handleSubmit, control, formState, watch} = useForm<FormValues>({
    mode: 'all',
    defaultValues: {
      address: '',
      amount: 1,
    },
  });
  const {errors, isValid} = formState;
  const {send, txResult, txError, connectedWallet} = useSignTransAction();
  const onSubmit = ({amount, address}: FormValues) => {
    send({address, amount});
  };


  return (
    <div className={Styles['transactions']}>
      <div className='text-end'>
        <span onClick={() => handleCloseTransAction(false)}><i className='bi bi-x-lg' /></span>
      </div>

      {!(txResult) && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-3'>
            <label htmlFor='exampleFormControlInput1' className='form-label'>Send to</label>
            <Controller control={control} name='address'
                        rules={{required: true}}
                        render={({field}) => <input type='text' {...field} name='address'
                                                    className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                                                    id='exampleFormControlInput1'
                                                    placeholder='ADDRESS' />} />
          </div>
          <div className='mb-3'>
            <label htmlFor='amountID' className='form-label'>Amount <strong>(Luna)</strong></label>
            <Controller name='amount' control={control}
                        render={({field}) => <input  {...field} defaultValue={field.value} className='form-control'
                                                     type='number' id='amountID' />
                        } />
          </div>

          <div className='d-flex align-items-center justify-content-between text-2 mb-3'>
            <span>Tx Fee</span>
            <span>{watch('amount') == 0 ? '0.1' : (watch('amount') / 10).toFixed(2)} LUNA</span>
          </div>
          <button className='d-block btn btn-success rounded-4 w-100 mb-3' disabled={!isValid} type='submit'>SEND
          </button>
        </form>
      )}

      {(connectedWallet && txResult && !txResult?.code) &&  (
        <>
          <div className='alert alert-success my-3' role='alert'>
            Your Transaction was successful!
          </div>
          <a
            href={`https://finder.terra.money/${connectedWallet.network.chainID}/tx/${txResult.txhash}`}
            target='_blank'
            className='btn-outline-success btn rounded-4 w-100 text-center'
            rel='noreferrer'
          >
            Open Tx Result in Terra Finder
          </a>
        </>
      )}

      {
        txResult?.code && (
        <div className='alert alert-danger my-3' role='alert'>
          {txResult.raw_log}
        </div>
      )}



      {!connectedWallet && <p>Wallet not connected!</p>}
    </div>
  );
};