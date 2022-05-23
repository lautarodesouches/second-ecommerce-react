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

    const filter = useCallback((data) => {
        // Get all filters
        let query = searchParams.get('query');
        let category = searchParams.get('category');
        let brand = searchParams.get('brand');
        // Use filter
        query && (data = data.filter( e => e.category.toLowerCase().includes(query) || e.brand.toLowerCase().includes(query) || e.name.toLowerCase().includes(query)))
        category && (data = data.filter( e => e.category === category))
        brand && (data = data.filter( e => e.brand === brand))
        // Set result
        setItems(data);
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
                const data = shuffle(
                    result.docs.map( (doc) => (
                        { id: doc.id, ...doc.data() }
                        )
                    )
                )
                setItems(data);
                setCopyItems(data);

                // Filter data
                filter(data);

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
                        <div id="filtros" className="fade md:w-1/3 text-left pb-5 md:p-4">
                            {
                                searchParams.get('query') && <Filter title='Busqueda' param='query' array={[searchParams.get('query')]} handleFilter={handleFilter} searchParams={searchParams} />
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
                                                <ItemCard key={el.id} id={el.id} name={el.name} price={el.price} freeShipping={el.freeShipping} discount={el.discount} />
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