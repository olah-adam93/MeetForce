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
        <h1 className='about-title'>Who am i?</h1>
        <div className='about-body'>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ex ante, suscipit
            vitae lorem in, faucibus mollis lorem. Aliquam tellus dolor, gravida sed lacus
            eget, egestas condimentum justo. Duis et commodo ex. Aliquam at leo in massa
            venenatis rutrum quis vitae quam. Nulla facilisi.
          </p>
          <p>
            Phasellus turpis tortor, condimentum tristique velit vel, vestibulum porta
            nunc. Mauris posuere ex sit amet sapien malesuada volutpat. Duis vulputate
            risus et maximus mollis. Nunc molestie orci lorem, eget lobortis felis pretium
            quis.
          </p>
          <p>
            Curabitur volutpat ullamcorper sapien. Morbi venenatis ante sapien, id
            suscipit massa bibendum faucibus. In ligula dui, tincidunt ac eros vitae,
            ultricies semper ligula.
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
