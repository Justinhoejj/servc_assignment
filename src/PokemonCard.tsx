import { useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { getOne } from "./api/pokemons.api";

interface Pokemon {
  name: string;
  url: string;
}
function PokemonCard(props: Pokemon) {
  const [imageUrl, setImageUrl] = useState('')
  var pokemonId = '0'
  const regexRes = props.url.match(/\d+/g)
  if (regexRes != null) {
    pokemonId = regexRes.slice(1,)[0]
  } else {
    pokemonId = '0';
  }

  useEffect(() => {
    getOne(pokemonId)
    .then(resp => {
      // console.log(resp)
      setImageUrl(resp.data.sprites.front_shiny)
    })
    .catch(err => {
      console.log(err)
    })
  },[pokemonId]) 

  return <div className="card" key={pokemonId}>
    <Link to={`/servc_assignment/pokemons/${pokemonId}`}>
      <img src={imageUrl}/>
      <h2 className="h2-title-case"><b>{props.name} </b></h2>
      with id: {pokemonId}
    </Link>
  </div>

}

export default PokemonCard