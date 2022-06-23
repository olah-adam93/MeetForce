import './Style/GaleryImage.css'

const GaleryImage = ({pic}) => {
  return (
    <div className='galery-image'>
      <div key={pic.id}>
        <img src={pic.url} alt={pic.title} />
        <p>{pic.title}</p>
      </div>
    </div>
  );
};
export default GaleryImage;
