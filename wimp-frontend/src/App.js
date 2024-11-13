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
                setFilteredProfessors(data); // Inicializamos con todos los profesores
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        // Filtramos los profesores según el término de búsqueda
        const filtered = professors.filter(professor =>
            professor.name.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredProfessors(filtered);
        setCurrentPage(1); // Reiniciamos la página actual al cambiar la búsqueda
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
            <div className="absolute bg-main bg-cover h-screen w-full" />
            <div className="flex flex-col justify-between items-start h-screen w-full backdrop-blur-3xl">
                <SecondHeader main={true} />

                <div className="flex flex-col items-start ml-10 justify-center w-auto h-full">
                    <h1 className="text-6xl font-semibold text-white">Bienvenido a W<span className="text-violet-600">i</span>MP</h1>
                    <p className="text-2xl font-medium text-white"><span className="text-violet-600">W</span>here <span className="text-violet-600">i</span>s <span className="text-violet-600">M</span>y <span className="text-violet-600">P</span>rofessor</p>

                    <p className="text-xl text-white mt-10 w-[40%]">
                        Si eres alumno de la Escuela superior de cómputo, esta plataforma tiene como objetivo ayudarte
                        a encontrar información relacionada de dónde se encuentra actualmente tu profesor, así como información de contacto
                        pública que podría ser de utilidad para ponerte en contacto con él.
                    </p>

                    <div className="mt-10">
                        <ButtonLink isPrimary url="/" label="Empieza ahora" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col my-20 w-full px-20">
                <h1 className="text-4xl font-semibold text-slate-900 mb-5 w-full text-center">Buscar profesor</h1>
                <SearchBar onSearch={handleSearch} />

                <div className="flex flex-col mt-10 px-5 w-full py-5 items-center justify-start border-2">
                    {currentProfessors.map((professor) => (
                        <ProfessorInfo key={professor.id} professor={professor} />
                    ))}

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
