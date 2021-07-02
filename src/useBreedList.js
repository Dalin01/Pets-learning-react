import { useState, useEffect } from "react";

const cache = {};

function useBreedList (animal) {

  const [ breedList, setBreedList ] = useState([]);
  const [ status, setStatus ] = useState('unloaded');

  useEffect(() => {
    if (!animal) setBreedList([]);
    else if (cache[animal]) setBreedList(cache[animal]);
    else getBreedList();

    async function getBreedList () {
      setBreedList([]); // clear breedlist if not empty

      setStatus('loading'); // update status to loading.. 

      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      ) // retrieve breeds

      const json = await res.json();
      cache[animal] = json.breeds || []; // update cache
      setBreedList(cache[animal]); // update breedlist
      setStatus('loaded'); // update status
    }
  }, [animal]);

  return [breedList, status];
}

export default useBreedList;