const Filter = ({title, param, array, handleFilter, searchParams}) => {
    return(
        <div className="flex flex-col my-2">
            <h4 className="text-xl">{title}:</h4>
            <ul className="pl-4 pt-2">
                {
                    // If there is a param as filter in url
                    searchParams.get(param) !== null
                    ?
                    // Show current filter
                    <li className="my-1 fade">
                        <span className="cursor-pointer bg-sky-600 px-2 py-1 text-white rounded" onClick={ () => {handleFilter(param, searchParams.get(param))} } >
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