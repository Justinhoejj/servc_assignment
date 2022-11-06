import { useState, useEffect } from 'react'
import { getList } from "./api/pokemons.api"
import PokemonCard from './PokemonCard';

function AllPokemons() {
  const [pokemons, setPokemons] = useState<{ name: string, url: string }[]>([])
  const [limit, setLimit] = useState(8)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageOptions, setPageOptions] = useState<Number[]>([1, 2, 3, 4, 5])
  const [maxSize, setMaxSize] = useState(0)
  const [maxPage, setMaxPage] = useState(5)
  const [pageInputValue, setPageInputValue] = useState('')
  const limitOptions = [4, 8, 16, 20]

  useEffect(() => {
    getList((currentPage - 1) * limit, limit)
      .then(resp => {
        // console.log(resp)
        const data = resp.data
        setMaxSize(data.count)
        setPokemons(data.results)
        setPageInputValue(String(currentPage))
      })
      .catch(err => {
        console.log(err)
      });
  }, [limit, currentPage])

  useEffect(() => {
    setMaxPage(prev => (Math.round(maxSize / limit)))
  }, [limit, maxSize])

  useEffect(() => {
    // Define available pages
    if (currentPage < 4) {
      setPageOptions(prev => [1, 2, 3, 4, 5])
    } else if (currentPage >= (maxPage - 5)) {
      setPageOptions(prev => [maxPage - 4, maxPage - 3, maxPage - 2, maxPage - 1, maxPage])
    } else {
      setPageOptions(prev => [currentPage - 2, currentPage - 1, currentPage, currentPage + 1, currentPage + 2])
    }
  }, [currentPage])

  return <div>
    <h2>Page
      <input
        onChange={e => {
          const val = Number(e.target.value)
          setPageInputValue(e.target.value)
          if (val > 0 && val <= maxPage) {
            setCurrentPage(Number(e.target.value))
          }
        }}
        value={pageInputValue}
      />
      /{maxPage}
    </h2>
    <div className='select-size'>
      <h3>Size: </h3>
      <select
        defaultValue={8}
        title='size:'
        onChange={e => setLimit(Number(e.target.value))}>
        {limitOptions.map(n => <option value={n} key={n}>{n}</option>)}
      </select>
    </div>
    <div className='pokemons-table'>
      <div className='grid-container'>
        {pokemons.map(p =>
          <PokemonCard name={p.name} url={p.url} />
        )}
      </div>
    </div>
    <button
      disabled={currentPage <= 1}
      onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
    {pageOptions.map(p => {
      if (Number(p) == Number(currentPage)) {
        return <button
          className='button-selected-page'
          onClick={() => setCurrentPage(prev => Number(p))}>
          {String(p)}
        </button>
      } else {
        return <button
          onClick={() => setCurrentPage(prev => Number(p))}>
          {String(p)}
          <br />
        </button>
      }
    })}
    <button
      disabled={currentPage >= maxPage}
      onClick={() => setCurrentPage(prev => prev + 1)}>{"Next"}</button>
  </div>
}

export default AllPokemons