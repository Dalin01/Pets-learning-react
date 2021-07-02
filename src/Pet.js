import { Link } from "react-router-dom";

const Pet = (props) => {
  const { name, animal, breed, images, location, id } = props;
  let def = 'http://pets-images.dev-apis.com/pets/none.jpg';
  if (images.length) def = images[0];

  // Link tag wouldnt reload the entire page like a tag.
  return (
    <Link to={`/details/${id}`} className='pet'> 
      <div className="image-container">
        <img src={def} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;