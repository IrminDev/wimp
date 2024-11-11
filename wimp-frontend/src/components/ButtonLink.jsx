import React from 'react';
import { Link } from 'react-router-dom';

const SecondHeaderLink = ({ url, label, isPrimary = false }) => (
    <Link
        to={url}
        className={`px-5 py-2 rounded-full text-center transition duration-300 ${
            isPrimary
                ? 'bg-white text-violet-600 hover:bg-violet-100 shadow-md'
                : 'text-white hover:text-violet-100'
        }`}
    >
        {label}
    </Link>
);

export default SecondHeaderLink;