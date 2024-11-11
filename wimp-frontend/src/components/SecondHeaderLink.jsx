import React from 'react';
import { Link } from 'react-router-dom';

const SecondHeaderLink = ({ url, label }) => (
    <Link to={url} className="px-4 py-2 rounded-md hover:bg-violet-500 transition duration-300">
        {label}
    </Link>
);

export default SecondHeaderLink;