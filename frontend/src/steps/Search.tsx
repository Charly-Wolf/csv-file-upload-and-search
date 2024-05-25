import { useEffect, useState } from 'react'
import { type Data } from '../types'
import { searchData } from '../services/search'
import { toast } from 'sonner'

export const Search = ({ initialData }: { initialData: Data }) => {
  const [data, setData] = useState<Data>(initialData)
  const [search, setSearch] = useState<string>(() => {
    // Initial search according to search params (q) in the url
    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.get('q') ?? ''
  })
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    const newPathname =
      search === '' ? window.location.pathname : `?q=${search}`

    window.history.replaceState({}, '', newPathname)
  }, [search])

  useEffect(() => {
    if (!search) {
      setData(initialData)
      return
    }
    // Call API to filter results
    searchData(search).then(response => {
      const [err, newData] = response
      if (err) {
        toast.error(err.message)
        return
      }

      if (newData) {
        setData(newData)
      }
    })
  }, [search, initialData])

  return (
    <>
      <h1>Search</h1>
      <form>
        <input
          onChange={handleSearch}
          type='search'
          placeholder='Search for info...'
          defaultValue={search}
        />
      </form>
      <ul>
        {data.map(row => (
          <li key={row.id}>
            <article>
              {Object.entries(row).map(([key, value]) => (
                <p key={key}>
                  <strong>{key}: </strong>
                  {value}
                </p>
              ))}
            </article>
          </li>
        ))}
      </ul>
    </>
  )
}
