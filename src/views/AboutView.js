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
        <h1 className='about-title'>Who are we?</h1>
        <div className='about-body'>
          <p>
            Once upon a time, there were six young people on the planet Earth. One day,
            these six, different person decided to sign up to the course of the Progmatic
            School.
          </p>
          <p>
            After a long period, they learnt the basics of the frontend programming, met a
            the way of the coding or something more. At the end of the course, they had to
            create their frist project, as some kind of final exam. Their goal was to create
            an online page, were people could browse between events, in various theme.
          </p>
          <p>
            Just a little help for those who want to join communities, or just want to spend
            somehow their free tirm. The time was short, they worked a lot, but in the end,
            the project coming alive. Or at least they hoped, becouse when I wrote this we
            were only in the middle of the progress. But be positive, we will prevail.
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
