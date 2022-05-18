// Components
import ItemCard from "components/ItemCard";
// Firebase
import { collection, getDocs, query } from "firebase/firestore";
// React
import { useEffect, useState } from "react";
// React DOM
import { useSearchParams } from "react-router-dom";
// Utils
import db from "utils/firebaseConfig";
import { shuffle } from "utils/functions";

const Search = () => {

    const [ items, setItems ] = useState([]);
    const [ copyItems, setCopyItems ] = useState([]);
    const [ loadign, setLoadign ] = useState(true);

    // Get search params
    let [ searchParams, setSearchParams ] = useSearchParams();

    // Get filters values
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    
    const handleFilter = (type, value) => {
        // If param exist, delete it, else set it
        searchParams.get(type) === value ? searchParams.delete(type) : searchParams.set(type, value);
        setSearchParams(searchParams);
        filter(copyItems)
    }

    const filter = (array) => {
        searchParams.get('category') !== null && (array = array.filter( e => e.category === searchParams.get('category')))
        searchParams.get('brand') !== null && (array = array.filter( e => e.brand === searchParams.get('brand')))
        setItems(array);
    }

    // UseEffect for getting filters
    useEffect(() => {
        (async function () {
            const querySnapshot = query(collection(db, "products"))
            return await getDocs(querySnapshot);
        })()
            .then((result) => {
                // Get unique values for filters
                const getCategories = new Set(
                    result.docs.map( (doc) => (
                            doc.data().category
                        )
                    )
                )
                setCategories([...getCategories]);
                const getBrands = new Set(
                    result.docs.map( (doc) => (
                            doc.data().brand
                        )
                    )
                )
                setBrands([...getBrands]);

                // Set Items
                const array = shuffle(
                    result.docs.map( (doc) => (
                        { id: doc.id, ...doc.data() }
                        )
                    )
                )
                setItems(array);
                setCopyItems(array);

                // Filter data
                filter(array);

                // Loadign finished
                setLoadign(false);
            })
            .catch((error) => {
                console.log(error);
            })
    },[])

    return(
        // If is loadign center
        <section className="min-h-screen text-center flex flex-col md:flex-row" >
            {
                loadign
                ?
                <>
                    <h2 className="animate-pulse text-3xl self-center m-auto">Cargando</h2>
                </>
                :
                (
                    <>
                        <div id="filtros" className="fade md:w-1/3 text-left p-4">
                            <div className="flex flex-col">
                                <h4 className="text-xl">Categorias:</h4>
                                <ul className="pl-4 pt-2">
                                    {
                                        searchParams.get('category') !== null
                                        ?
                                        <li className="my-1 fade">
                                            <a className="cursor-pointer bg-sky-600 px-2 text-white rounded" onClick={ () => {handleFilter('category', searchParams.get('category'))} } >
                                                {searchParams.get('category')}
                                            </a>
                                        </li>
                                        :
                                        categories.map( category =>
                                                (
                                                    <li className="my-1 fade" key={category}>
                                                        <a className="cursor-pointer" onClick={ () => {handleFilter('category', category)} }>
                                                        {category}
                                                        </a>
                                                    </li>
                                                )
                                        )
                                    }
                                </ul>
                            </div>
                            <div className="flex flex-col mt-4">
                                <h4 className="text-lg">Marcas:</h4>
                                <ul className="pl-4 pt-2">
                                    {
                                        searchParams.get('brand') !== null
                                        ?
                                        <li className="my-1 fade">
                                            <a className="cursor-pointer bg-sky-600 px-2 text-white rounded" onClick={ () => {handleFilter('brand', searchParams.get('brand'))} } >
                                                {searchParams.get('brand')}
                                            </a>
                                        </li>
                                        :
                                        brands.map( brand =>
                                                (
                                                    <li className="my-1 fade" key={brand}>
                                                        <a className="cursor-pointer" onClick={ () => {handleFilter('brand', brand)} }>
                                                        {brand}
                                                        </a>
                                                    </li>
                                                )
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                        <div id="resultados">
                            {
                                items.length > 0
                                ?
                                (
                                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center">
                                        {
                                            items.map(el => (
                                                <ItemCard key={el.id} id={el.id} name={el.name} price={el.price} freeShipping={el.freeShipping} />
                                            ))
                                        }
                                    </div>
                                )
                                :
                                <h2 className="fade py-10 md:pt-40">No se han encontrado productos que coincidan con tu búsqueda</h2>
                            }
                        </div>
                    </>
                )
            }
        </section>
    );
}

export default Search;