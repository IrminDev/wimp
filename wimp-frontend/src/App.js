import ButtonLink from "./components/ButtonLink";
import SearchBar from "./components/SearchBar";
import ProfessorInfo from "./components/ProfessorInfo";
import PaginationBar from "./components/PaginationBar";
import SecondHeader from "./components/SecondHeader";

function App() {
    return (
        <div className="App">
            <div className=" absolute bg-main bg-cover h-screen w-full" />
            <div className="flex flex-col justify-between items-start h-screen w-full backdrop-blur-3xl">
                <SecondHeader main={true} />

                <div className="flex flex-col items-start ml-10 justify-center w-auto h-full">
                    <h1 className="text-6xl font-semibold text-white">Bienvenido a W<span className="text-violet-600">i</span>MP</h1>
                    <p className="text-2xl font-medium text-white"><span className="text-violet-600">W</span>here <span className="text-violet-600">i</span>s <span className="text-violet-600">M</span>y <span className="text-violet-600">P</span>rofessor</p>

                    <p className=" text-xl text-white mt-10 w-[40%]">
                        Si eres alumno de la Escuela superior de cómputo, esta plataforma tiene como objetivo ayudarte
                        a encontrar información relacionada de dónde se encuentra actualmente tu profesor, así cómo información de contacto
                        pública que podría ser de utilidad para ponerte en contacto con él.
                    </p>

                    <div className=" mt-10">
                        
                        <ButtonLink url="/" label="Empieza ahora" />
                    </div>
                </div>
            </div>

            <div className=" flex flex-col my-20 w-full px-20 ">
                <h1 className=" text-4xl font-semibold text-slate-900 mb-5 w-full text-center">Buscar profesor</h1>
                <SearchBar />

                <div className=" flex flex-col mt-10 px-5 w-full py-5 items-center justify-start border-2">
                    <ProfessorInfo />
                    <ProfessorInfo />
                    <ProfessorInfo />
                    <ProfessorInfo />
                    <ProfessorInfo />
                    <ProfessorInfo />
                    <ProfessorInfo />
                    <ProfessorInfo />
                    <ProfessorInfo />
                    <ProfessorInfo />

                    <div className=" w-full mt-5">
                        <PaginationBar />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
