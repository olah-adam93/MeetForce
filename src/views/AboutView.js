import React from 'react';
import './Style/AboutView.css';
import about1 from '../others/decoration/about1.svg';
import about2 from '../others/decoration/about2.svg';
import about3 from '../others/decoration/about3.svg';
import about4 from '../others/decoration/about4.svg';

const AboutView = () => {
  return (
    <div className='about-container'>
      <div className='about-image-left-container'>
        <img className='about-image-left-one' src={about1}></img>
        <img className='about-image-left-two' src={about2}></img>
      </div>
      <div className='about-text-container'>
        <h1 className='about-title'>What is Eventforce?</h1>
        <div className='about-body'>
          <p>
            Eventforce is a global self-service ticketing platform for live experiences
            that allows anyone to create, share, find and attend events that fuel their
            passions and enrich their lives. From Kung-Fu presentation, marathons,
            conferences, community rallies, to gaming competitions and archery contest.
            Our mission is to bring the world together through live experiences.
          </p>
        </div>
      </div>
      <div className='about-image-right-container'>
        <img className='about-image-right-one' src={about3}></img>
        <img className='about-image-right-two' src={about4}></img>
      </div>
    </div>
  );
};
export default AboutView;
