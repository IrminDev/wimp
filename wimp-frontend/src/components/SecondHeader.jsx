import React from 'react';
import ButtonLink from './ButtonLink';

const SecondHeader = ({main}) => {
    const mainStyle = main ? 'w-full p-4' : 'w-full bg-gradient-to-r from-violet-700 to-violet-500 shadow-md p-4';

    return (
        <header className={mainStyle}>
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo Section */}
                <div className="flex items-center space-x-4">
                    <div className="bg-white rounded-full p-3 shadow-md">
                        <span className="text-3xl font-semibold">W<span className="text-violet-800">i</span>MP</span>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="hidden md:flex space-x-8 text-lg font-medium">
                    <ButtonLink url="/" label="Home" />
                    <ButtonLink url="/professors" label="Professors" />
                </nav>

                {/* Mobile Menu */}
                <div className="md:hidden">
                    <button className="text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 12h18M3 6h18M3 18h18"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default SecondHeader;