import React, { useState, useEffect } from "react";
import ButtonLink from "./components/ButtonLink";
import SearchBar from "./components/SearchBar";
import ProfessorInfo from "./components/ProfessorInfo";
import PaginationBar from "./components/PaginationBar";
import SecondHeader from "./components/SecondHeader";
import teacherService from "./services/teacher.service";

function App() {
    const [professors, setProfessors] = useState([]);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredProfessors, setFilteredProfessors] = useState([]);

    useEffect(() => {
        teacherService.getTeachers()
            .then(data => {
                setProfessors(data);
                setFilteredProfessors(data);
                console.log(data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        try {
            const filtered = professors.filter((professor) => {
                return professor.name.toLowerCase().includes(search.toLowerCase());
            });

            setFilteredProfessors(filtered);
        } catch (error) {   
            console.log(error);
        }
    }, [search, professors]);

    const resultsPerPage = 10;
    const indexOfLastResult = currentPage * resultsPerPage;
    const indexOfFirstResult = indexOfLastResult - resultsPerPage;
    const currentProfessors = filteredProfessors.slice(indexOfFirstResult, indexOfLastResult);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (query) => {
        setSearch(query);
    };

    return (
        <div className="App">
            {/* Fondo principal */}
            <div className="absolute bg-main bg-cover h-screen w-full" />

            {/* Encabezado */}
            <div className="flex flex-col justify-between items-center lg:items-start h-screen w-full backdrop-blur-3xl p-5 lg:p-10">
                <SecondHeader main={true} />

                <div className="flex flex-col items-center lg:items-start justify-center w-full lg:w-auto h-full text-center lg:text-left">
                    <h1 className="text-4xl lg:text-6xl font-semibold text-white">
                        Bienvenido a W<span className="text-violet-600">i</span>MP
                    </h1>
                    <p className="text-xl lg:text-2xl font-medium text-white mt-2">
                        <span className="text-violet-600">W</span>here <span className="text-violet-600">i</span>s <span className="text-violet-600">M</span>y <span className="text-violet-600">P</span>rofessor
                    </p>

                    <p className="text-sm lg:text-xl text-white mt-5 lg:mt-10 w-full lg:w-[40%]">
                        Si eres alumno de la Escuela superior de cómputo, esta plataforma tiene como objetivo ayudarte
                        a encontrar información relacionada de dónde se encuentra actualmente tu profesor, así como información de contacto
                        pública que podría ser de utilidad para ponerte en contacto con él.
                    </p>

                    <div className="mt-5 lg:mt-10">
                        <ButtonLink isPrimary url="/" label="Empieza ahora" />
                    </div>
                </div>
            </div>

            {/* Sección principal */}
            <div className="flex flex-col my-10 lg:my-20 w-full px-5 lg:px-20">
                <h1 className="text-2xl lg:text-4xl font-semibold text-slate-900 mb-5 w-full text-center">
                    Buscar profesor
                </h1>
                <SearchBar onSearch={handleSearch} />

                <div className="flex flex-col mt-10 px-2 lg:px-5 w-full py-5 items-center justify-start border-2">
                    {Array.isArray(currentProfessors) ? (
                        currentProfessors.map((professor) => (
                            <ProfessorInfo key={professor.id} professor={professor} />
                        ))
                    ) : (
                        <p className="text-center">No hay datos disponibles</p>
                    )}

                    <div className="w-full mt-5">
                        <PaginationBar
                            currentPage={currentPage}
                            totalPages={Math.ceil(filteredProfessors.length / resultsPerPage)}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
