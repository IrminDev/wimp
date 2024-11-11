import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(query)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
      <input
        type="search"
        placeholder="Buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow w-full rounded-md border border-gray-400 bg-white px-4 py-2 text-sm focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
      />
      <button
        type="submit"
        className="inline-flex items-center rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2"
      >
        <FaSearch className="mr-2 h-4 w-4" />
            Buscar
      </button>
    </form>
  )
}