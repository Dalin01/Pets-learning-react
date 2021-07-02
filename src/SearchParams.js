import { useState, useEffect } from "react";
import Pet from './Pet'
import useBreedList from './useBreedList'
import Result from './Results';

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  // useState returns an array where index 0 is the current value and indx 1 is a func to update
  const [ location, setLocation ] = useState('Salt Lake City');
  const [ animal, setAnimal ] = useState('');
  const [ breed, setBreed ] = useState('');
  //const breeds = [];
  const breeds = useBreedList(animal)[0]; // using the custom hook -> useBreedList. 

  const [ pets, setPet ] = useState([]);

  // run the function after the dom updates!
  // empty arr enables it to run only once upon creation
  useEffect(() => {requestPets()}, []); // very similar to componentDidMount & componentDidUpdate
  async function requestPets() {
    const res = await 
      fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`);
  
    const json = await res.json();
  
    setPet(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={e => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input id="location" value={location} placeholder="Location" onChange={(e) => setLocation(e.target.value)}/>
        </label>
        {/* animal label */}
        <label htmlFor="animal">
          Animal
          <select id="animal" value={animal}
            onChange={(e) => setAnimal(e.target.value)}
            onBlur={(e) => setAnimal(e.target.value)}
          >
            <option />
            {
              ANIMALS.map((animal) => 
                <option value={animal} key={animal}>
                  {animal}
                </option>) // single line js arrow function returns
            }
          </select>
        </label>
        {/* breed label */}
        <label htmlFor="breed">
          Breed
          <select id="animal" value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
            disabled={!breeds.length}
          >
            {
              breeds.map((breed) => 
                <option value={breed} key={breed}>
                  {breed}
                </option>) // single line js arrow function returns
            }
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Result pets={pets} />
      {/* {
        pets.map((pet) => 
          <Pet name={pet.name} animal={pet.animal} breed={pet.breed} key={pet.id} />
        )
      } */}
    </div>
  );
};

export default SearchParams;