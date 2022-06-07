import { useState } from "react";

const Sort = ({ handleFilter, searchParams }) => {

    const [sortVisible, setSortVisible] = useState(false);

    return (
        <div
            className="bg-white w-full md:w-1/6 mr-0 m-auto p-2 rounded cursor-pointer relative select-none"
            onClick={() => setSortVisible(!sortVisible)}
        >
            <div className="flex justify-center items-center gap-2">
                <h4 className="text-xl">Ordenar</h4>
            </div>
            <div className={`sm:absolute left-0 w-full bg-white rounded z-50 ${sortVisible ? 'visible' : 'hidden'} fade`}>
                <ul className="mt-2">
                    {
                        [
                            { text: 'Menor Precio', filter: 'min' },
                            { text: 'Mayor Precio', filter: 'max' },
                            { text: 'Random', filter: 'random' }
                        ].map(el =>
                            <li
                                key={el.filter}
                                className={`py-2 sm:border transition-all hover:text-white hover:bg-sky-700 rounded ${searchParams.get('sort') === el.filter ? 'bg-sky-500 text-white' : ''}`}
                                onClick={() => handleFilter('sort', el.filter)}
                            >
                                {el.text}
                            </li>
                        )
                    }
                </ul>
            </div>
        </div>
    );
}

export default Sort;