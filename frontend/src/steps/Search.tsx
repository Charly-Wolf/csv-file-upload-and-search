import { useEffect, useState } from 'react'
import { type Data } from '../types'
import { searchData } from '../services/search'
import { toast } from 'sonner'
import { useDebounce } from '@uidotdev/usehooks'

const DEBOUNCE_TIME = 500

export const Search = ({ initialData }: { initialData: Data }) => {
  const [data, setData] = useState<Data>(initialData)
  const [search, setSearch] = useState<string>(() => {
    // Initial search according to search params (q) in the url
    const searchParams = new URLSearchParams(window.location.search)
    return searchParams.get('q') ?? ''
  })
  const debouncedSearch = useDebounce(search, DEBOUNCE_TIME) // Change 'search' value after 500 ms of typing in the input field

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
  }

  useEffect(() => {
    const newPathname =
      debouncedSearch === ''
        ? window.location.pathname
        : `?q=${debouncedSearch}`

    window.history.replaceState({}, '', newPathname)
  }, [debouncedSearch])

  useEffect(() => {
    if (!debouncedSearch) {
      setData(initialData)
      return
    }
    // Call API to filter results
    searchData(debouncedSearch).then(response => {
      const [err, newData] = response
      if (err) {
        toast.error(err.message)
        return
      }

      if (newData) {
        setData(newData)
      }
    })
  }, [debouncedSearch, initialData])

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
