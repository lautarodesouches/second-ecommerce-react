// Components
import Filter from "components/Filter";
import ItemCard from "components/ItemCard";
import Loading from "components/Loading";
// Firebase
import { collection, getDocs, query } from "firebase/firestore";
// React
import { useCallback, useEffect, useState } from "react";
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

    const filter = useCallback((array) => {
        searchParams.get('category') !== null && (array = array.filter( e => e.category === searchParams.get('category')))
        searchParams.get('brand') !== null && (array = array.filter( e => e.brand === searchParams.get('brand')))
        setItems(array);
    }, [searchParams])

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
    },[filter])

    return(
        <>
            {
                loadign
                ?
                <Loading />
                :
                (
                    <section className="min-h-screen text-center flex flex-col md:flex-row" >
                        <div id="filtros" className="fade md:w-1/3 text-left p-4">
                            {
                                // title, param, array, handleFilter
                            }
                            <Filter title='Categorias' param='category' array={categories} handleFilter={handleFilter} searchParams={searchParams} />
                            <Filter title='Marcas' param='brand' array={brands} handleFilter={handleFilter} searchParams={searchParams} />
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
                    </section>
                )
            }
        </>
    );
}

export default Search;