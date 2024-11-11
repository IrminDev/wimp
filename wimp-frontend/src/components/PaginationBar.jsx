import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

export default function PaginationBar({
  currentPage = 1,
  totalPages = 10,
  onPageChange = () => {}
}) {
  const pageNumbers = []
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className="flex justify-center items-center space-x-2 my-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md bg-violet-100 text-violet-700 hover:bg-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <FaChevronLeft className="w-5 h-5" />
      </button>
      
      {pageNumbers.map((number) => (
        <button
          key={number}
          onClick={() => onPageChange(number)}
          className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 ${
            currentPage === number
              ? 'bg-violet-500 text-white'
              : 'bg-violet-100 text-violet-700 hover:bg-violet-200'
          }`}
        >
          {number}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md bg-violet-100 text-violet-700 hover:bg-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        <FaChevronRight className="w-5 h-5" />
      </button>
    </nav>
  )
}