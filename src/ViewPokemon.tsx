import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { getOne } from "./api/pokemons.api";
import { Outlet, Link } from "react-router-dom";


function ViewPokemon() {
  let { id } = useParams();
  const [name, setName] = useState('')
  const [abilities, setAbilities] = useState<{ ability: { name: string } }[]>([])
  const [stats, setStats] = useState<{ base_stat: number, stat: { name: string } }[]>([])
  const [types, setTypes] = useState<{ type: { name: string } }[]>([])
  const [imageUrl, setImageUrl] = useState('')

  useEffect(() => {
    if (id != undefined) {
      getOne(id)
        .then(resp => {
          console.log(resp)
          setName(resp.data.name)
          setAbilities(resp.data.abilities)
          setStats(resp.data.stats)
          setTypes(resp.data.types)
          setImageUrl(resp.data.sprites.front_shiny)
        })
        .catch(err => {
          console.log(err)
        })
    }

  }, [])
  return <div>
    <Link to={`/pokemons`} className='pokemon-card-back'>
      <button>
        Home
      </button>
    </Link>
    <h1 className='h1-title-case'><b>{name}</b></h1>
    <img src={imageUrl}></img>
    <h2>Type</h2>
    <ul>
      {types.map(t => {
        return <li key={t.type.name}>
          {t.type.name}
        </li>
      })}
    </ul>
    <h2>Stats</h2>
    <ul>
      {stats.map(s => {
        return <li
          className='pokemon-view-stats'
          key={s.stat.name}>
          {s.stat.name} {s.base_stat}
        </li>
      })}
    </ul>
    <h2>Abilities</h2>
    <ul>
      {abilities.map(a => {
        return <li key={a.ability.name}>
          {a.ability.name}
        </li>
      })}
    </ul>
  </div>
}

export default ViewPokemon
