// React Router DOM
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
// Routes
import { search } from "routes/Routes";
// Assets
import SeachIcon from "assets/SearchIcon";

const SearchForm = () => {

    let navigate = useNavigate();

    const location = useLocation();

    // Get search params
    let [ searchParams, setSearchParams ] = useSearchParams();

    return(
        <form className="flex bg-white rounded h-10" onSubmit={(e) => {
                    e.preventDefault();
                    //
                    if (e.target[0].value != null) {
                        // Set params
                        searchParams.set('query', e.target[0].value);
                        setSearchParams(searchParams);
                    }
                    // Redirect
                    location.pathname !== search && navigate(search);
                    // Clean bar
                    e.target[0].value = "";
                }}>
            <input type="text" className="py-1 px-2 text-black w-4/5 sm:w-5/6 md:w-11/12 rounded-l focus-visible:outline-none border-r border-solid border-gray-500" placeholder="Buscar" />
            <div className="w-1/5 sm:w-1/6 md:w-1/12">
                <button className="p-1 w-full h-full m-auto">
                    <SeachIcon svgClass="fill-black h-1/2 m-auto" />
                </button>
            </div>
        </form>
    );
}

export default SearchForm;