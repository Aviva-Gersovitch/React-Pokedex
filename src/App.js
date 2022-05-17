import './App.css';
import React, { useState, useEffect } from 'react';
import { getPokemon, getAllPokemon, getPokemonBio } from './Services/pokemon';
import Card from './Components/Card';
import NavBar from './Components/Navbar';
import backgroundImage from './Helpers/pokepattern.png';

function App() {

  const [pokemonData, setPokemonData] = useState([]);
  const urlEndpoint = 'https://pokeapi.co/api/v2/pokemon';
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [prevPageUrl, setPrevPageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  //Fetches only on current page url change because of empty dependency array
  useEffect(() => {
    
    async function fetchData() {
      let response = await getAllPokemon(urlEndpoint)
      setNextPageUrl(response.next);
      setPrevPageUrl(response.previous);
      await loadingPokemon(response.results);
      setLoading(false);
    }

    fetchData();

  }, []);

  //Pagination functions
  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextPageUrl);
    await loadingPokemon (data.results);
    setNextPageUrl(data.next);
    setPrevPageUrl(data.previous);
    setLoading(false);
  }
  

  const prev = async () => {
    if (!prevPageUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevPageUrl);
    await loadingPokemon(data.results)
    setNextPageUrl(data.next);
    setPrevPageUrl(data.previous);
    setLoading(false);
  }


  const loadingPokemon = async(data) => {
    let pokeData = await Promise.all(data.map(async pokemon => {
      let pokemonRecord = await getPokemon(pokemon);
      let bio = await getPokemonBio(pokemonRecord.id);
      //Adding pokemon entry bio into pokemon record
      pokemonRecord.bio = bio;
      return pokemonRecord;
    }))
    
    setPokemonData(pokeData);
  }

  return (
    <div className="App" style={{ background: `url(${backgroundImage})` }}>
      <NavBar   />
      <div>
        {loading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> : (
          <>
            <div className='btn'>
              <button onClick={prev}> Previous </button>
              <button onClick={next}> Next </button>
            </div>

            <div className='grid-container'>

              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />
              })}

            </div>

            <div className='btn'>
              <button onClick={prev}> Previous </button>
              <button onClick={next}> Next </button>
            </div>
            
          </>
        )}
        </div>
    </div>
  );
}

export default App;
