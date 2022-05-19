// React
import { useState } from "react";


const Filter = ({title, param, array, handleFilter, searchParams}) => {

    const [hideOptions, setHideOptions] = useState(true);
    
    let ulClass = "md:pl-4 pt-2 md:block";

    return(
        <div className="flex flex-col my-2 bg-white md:bg-transparent p-2 rounded md:text-left text-center">
            <h4 className="text-xl" onClick={() => {setHideOptions(!hideOptions)}}>
                {title}
            </h4>
            <ul className={hideOptions ? ulClass + " hidden" : ulClass}>
                {
                    // If there is a param as filter in url
                    searchParams.get(param) !== null
                    ?
                    // Show current filter
                    <li className="my-1 fade">
                        <span className="cursor-pointer bg-sky-600 px-2 py-1 text-white rounded" onClick={ () => {handleFilter(param, searchParams.get(param)); setHideOptions(!hideOptions)} } >
                            {searchParams.get(param)}<span className="pl-2">X</span>
                        </span>
                    </li>
                    :
                    // Else show options
                    array.map( element =>
                            (
                                <li className="my-1 fade" key={element}>
                                    <span className="cursor-pointer" onClick={ () => {handleFilter(param, element)} }>
                                    {element}
                                    </span>
                                </li>
                            )
                    )
                }
            </ul>
        </div>
    );
}

export default Filter;