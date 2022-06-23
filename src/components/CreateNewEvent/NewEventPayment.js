import { data } from 'dom7';
import { useState } from 'react';

const NewEventPayment = ({ setData, data }) => {
  const changeHandler = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className='new-event-payment-container'>
      <h2>Event Pricing</h2>
      <div className='payment-type-btn-box'>

        <label htmlFor='free'>Free*</label>
        <input
          type='radio'
          name='paymentType'
          value='free'
          id='free'
          onChange={changeHandler}
          defaultChecked={data?.paymentType === 'free'}
        />
        <label htmlFor='ticket'>Ticket*</label>
        <input
          type='radio'
          name='paymentType'
          value='ticket'
          onChange={changeHandler}
          id='ticket'
          defaultChecked={data?.paymentType === 'ticket'}
        />
      </div>
      {data?.paymentType === 'ticket' ? (
        <div className='ticket-details-flex'>
          <div className='ticket-details'>
            <h3>Ticket</h3>
            <p>Please fill out the ticket information</p>
            {/*ha requiring akkor azt is be lehet állítani mennyi a bérlet!!! */}
            <div className="payment-details">
              <div className="ticket-pricing-information">
                <label htmlFor='ticket-price'>Ticket Price*</label>
                {/* <input
                  type='number'
                  id='ticket-price'
                  name='ticketPrice'
                  onChange={changeHandler}
                  value={data?.ticketPrice}
                /> */}
                <select
                  id='ticket-price'
                  name='ticketPrice'
                  onChange={changeHandler}
                  value={data?.ticketPrice}
                >
                  <option value=''>Price</option>
                  <option value='1000'>1000 Ft</option>
                  <option value='2000'>2000 Ft</option>
                  <option value='5000'>5000 Ft</option>
                  <option value='10000'>10000 Ft</option>
                  <option value='20000'>20000 Ft</option>
                </select>
                <label htmlFor='ticket-currency'>Ticket Currency</label>
                <select
                  name='ticketCurrency'
                  id='ticket-currency'
                  onChange={changeHandler}
                  value={data?.ticketCurrency}
                >
                  <option value=''>Currency</option>
                  <option value='huf'>HUF</option>
                  <option value='eur'>EUR</option>
                  <option value='usd'>USD</option>
                </select>
              </div>
              <div className="ticket-validation">
                <p>Ticket validation</p>
                <label htmlFor='valid-ticket-from'>Valid from</label>
                <input
                  type='date'
                  id='valid-ticket-from'
                  name='validTicketFrom'
                  onChange={changeHandler}
                  value={data?.validTicketFrom}
                />
                <label htmlFor='valid-ticket-to'>Valid to</label>
                <input
                  type='date'
                  id='valid-ticket-to'
                  name='validTicketTo'
                  onChange={changeHandler}
                  value={data?.validTicketTo}
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
export default NewEventPayment;
