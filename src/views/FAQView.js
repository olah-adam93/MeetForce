import React from 'react';
import faq from '../others/decoration/FAQ.svg'
import './Style/FAQView.css';

const AboutView = () => {
  return (
    <div className='FAQ-main-container'>
      <div className='FAQ-container'>
        <h1 className='FAQ-title'>Frequently Asked Questions</h1>
        <div className='FAQ-about'>
           <div className='FAQ-summary'>Do you have a question about your subscription, a recent events, paying, premium membership
        or you want to suggest a new question? Here you can find some helpful answers to
        frequently asked questions (FAQ).</div>
            <p className="FAQ-question"><b>Q:</b> What is this page?</p>
            <p className="FAQ-answer"><b>A:</b> This is an event browser website. Our goal was to help people to find the perfect freetime activity, so we created a lot of category to help define exactly the events. A large amount of events waiting for people to join.</p>
            <p className="FAQ-question"><b>Q:</b> Do I have to pay for registration?</p>
            <p className="FAQ-answer"><b>A:</b> The registration is totally free.</p>
            <p className="FAQ-question"><b>Q:</b> I can't create new event, what can I do?</p>
            <p className="FAQ-answer"><b>A:</b> Please check that you filled every mandatory data. If the problem doesn't solved, contact one of the admins. We will help you.</p>
            <p className="FAQ-question"><b>Q:</b> Could I refund my money if I can't attend the event.</p>
            <p className="FAQ-answer"><b>A:</b> You can, but then your ticket become invalid. You must contact the event's organiser for more information.</p>
        </div>
      </div>
      <div className="FAQ-image-container">
         <img className="FAQ-image" src={faq} alt='FAQ'></img>
      </div>
    </div>
  );
};
export default AboutView;
