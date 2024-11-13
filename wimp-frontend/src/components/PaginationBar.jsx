import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function PaginationBar({
  currentPage = 1,
  totalPages = 10,
  onPageChange = () => {}
}) {
  const visiblePageNumbers = 5; // cantidad de números de página visibles
  
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Calcula el rango de páginas a mostrar
    let startPage = Math.max(currentPage - Math.floor(visiblePageNumbers / 2), 1);
    let endPage = startPage + visiblePageNumbers - 1;

    // Ajusta el rango si está al principio o al final de las páginas
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(totalPages - visiblePageNumbers + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <nav className="flex justify-center items-center space-x-2 my-8">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md bg-violet-100 text-violet-700 hover:bg-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="First page"
      >
        {"<<"}
      </button>

      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-md bg-violet-100 text-violet-700 hover:bg-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        <FaChevronLeft className="w-5 h-5" />
      </button>
      
      {getPageNumbers().map((number) => (
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

      <button
        onClick={() => onPageChange(totalPages)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md bg-violet-100 text-violet-700 hover:bg-violet-200 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Last page"
      >
        {">>"}
      </button>
    </nav>
  );
}
