import React from 'react';
import './Style/PrivacyView.css';
import privacy from '../others/decoration/privacy.svg'

const PrivacyView = () => {
  return (
    <div className='privacy-main-container'>
    <div className='privacy-container'>
      <h1 className='privacy-title'>Privacy Policy</h1>
      <div className='privacy-body'>
        <h2>What Data We Collect</h2>
        <p className='privacy-paragraph'><h4>General Data:</h4> The use of our services will automatically create information that will be collected. For example, when you use our
Services, your geographic location, how you use the Services, information about the type of device you use, your Open Device
Identification Number, date/time stamps for your visit, your unique device identifier, your browser type, operating system, Internet
Protocol (IP) address, and domain name are all collected. This information is generally used to help us deliver the most relevant
information to you and administer and improve the Site.</p>
        <p className='privacy-paragraph'><h4>Log Files:</h4> As is true of most websites, we gather certain information automatically and store it in log files. This information includes
IP addresses, browser type, Internet service provider (ISP), referring/exit pages, operating system, date/time stamp, and
clickstream data. We use this information to maintain and improve the performance of the Services.</p>
        <p className='privacy-paragraph'><h4>Analytics:</h4> We use analytics services (including, but not limited to, Google Analytics) to help analyze how users use the Site.
Analytics services use Cookies to collect information such as how often users visit the Site and we use the information to improve
our Site and Services. The analytics services' ability to use and share information collected by them is restricted by their terms of
use and privacy policy, which you should refer to for more information about how these entities use this information.
Location Information: If you have enabled location services on your mobile device, we may collect your location information to
improve the Services we offer. If you do not want this information collected, you can disable location services on your device.</p>
        <p className='privacy-paragraph'><h4>Cookies:</h4> “Cookies” are small pieces of information (text files) that a website sends to your computer’s hard drive while you are
viewing the website. These text files can be used by websites to make the users experience more efficient. The law states that we
can store these cookies on your device if they are strictly necessary for the operation of this site. For all other types of cookies we
need your permission. To that end, this site uses different types of cookies. Some cookies are placed by third party services that
appear on our pages. We and some third parties may use both session Cookies (which expire once you close your web browser)
and persistent Cookies (which stay on your computer until you delete them) to provide you with a more personal and interactive
experience on our Services and to market the Services or other products. Marketing cookies are used to track visitors across
websites. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for
publishers and third party advertisers. This tracking is done on an anonymous basis and, while not an exhaustive list, some of the
companies we work with are Google, AppNexus, Criteo, Rubicon, Pubmatic and DistrictM. To learn more about this practice,
including the Self Regulatory Principles for Online Advertising, to which we adhere, you can visit www.aboutads.info/choices,
optout.networkadvertising.org and www.youronlinechoices.com</p>

        <h2>Use of Your Personal information</h2>
        <p className='privacy-paragraph'>In general, personal information you submit to us is used either to respond to requests that you make, aid us in serving you better,
or market our Services. We use your personal information in the following ways:</p>
        <ul>
          <li>Operate, maintain, and improve our site(s), products, and services;</li>
          <li>Respond to comments and questions and provide customer service;</li>
          <li>Link or combine user information with other personal information we get from third parties, to help understand your needs
and provide you with better service;</li>
          <li>Develop, improve, and deliver marketing and advertising for the Services;</li>
          <li>Provide and deliver products and services you request;</li>
          <li>Identify you as a user in our system;</li>
        </ul>
        <p className='privacy-paragraph'>We may store and process your personal information on servers located in both the United States and Europe. We may also create
anonymous data records from your personal information by completely excluding information (such as your name) that makes the
data personally identifiable to you. We use this anonymous data to analyze request and usage patterns so that we may enhance
the content of our Services and improve Site functionality. We reserve the right to use anonymous data for any purpose and
disclose anonymous data to third parties at our sole discretion.</p>
        <p className='privacy-paragraph'>We may receive testimonials and comments from users who have had positive experiences with our Services. We may publish such
content. When we publish this content, we may identify our users by their first and last name. We obtain the user's consent prior to
posting this information along with the testimonial.</p> 
      </div>
    </div>
    <div className="privacy-image-container">
      <img className="privacy-image" src={privacy}></img>
    </div>
    </div>
  );
};

export default PrivacyView;
