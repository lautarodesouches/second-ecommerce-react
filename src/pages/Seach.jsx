// Components
import FilterOptions from "components/FilterOptions";
import ItemCard from "components/ItemCard";
import ItemsContainer from "components/ItemsContainer";
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

    const [items, setItems] = useState([]);
    const [copyItems, setCopyItems] = useState([]);

    const [loadign, setLoadign] = useState(true);

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    // Get search params
    let [searchParams, setSearchParams] = useSearchParams();

    const handleFilter = (type, value) => {
        // Delete or Set param
        searchParams.get(type) === value ? searchParams.delete(type) : searchParams.set(type, value);
        // Update params
        setSearchParams(searchParams);
        //
        filter(copyItems);
    }

    const filter = useCallback(() => {
        // Get all filters
        let query = searchParams.get('query');
        let category = searchParams.get('category');
        let brand = searchParams.get('brand');
        // Copy data
        let data = [...copyItems];
        // Filter data
        query && (data = data.filter(e => e.category.toLowerCase().includes(query) || e.brand.toLowerCase().includes(query) || e.name.toLowerCase().includes(query)));
        category && (data = data.filter(e => e.category === category));
        brand && (data = data.filter(e => e.brand === brand));
        // Set result
        setItems(data);
    }, [copyItems, searchParams])

    // Get data
    useEffect(() => {
        (async function () {
            const querySnapshot = query(collection(db, "products"));
            return await getDocs(querySnapshot);
        })()
            .then((result) => {
                // Set Items
                const data = shuffle(
                    result.docs.map((doc) => (
                        { id: doc.id, ...doc.data() }
                    )
                    )
                )
                setItems(data);
                setCopyItems(data);

                setCategories(
                    [
                        ...new Set(
                            data.map(e => e.category)
                        )
                    ]
                );

                setBrands(
                    [
                        ...new Set(
                            data.map(e => e.brand)
                        )
                    ]
                );

                // Loadign finished
                setLoadign(false);

            })
            .catch((error) => {
                console.log(error, ' error');
            })
    }, []);


    useEffect(() => {
        filter();
    }, [filter])

    return (
        <>
            {
                loadign
                    ?
                    <Loading />
                    :
                    (
                        <section className="container min-h-screen text-center flex flex-col md:flex-row" >
                            <div id="filtros" className="fade md:w-1/3 text-left pb-5 md:p-4">
                                {
                                    searchParams.get('query') &&
                                    <FilterOptions
                                        title='Busqueda'
                                        param='query'
                                        array={[searchParams.get('query')]}
                                        handleFilter={handleFilter}
                                    />
                                }
                                {
                                    categories.length &&
                                    <FilterOptions
                                        title='Categorias'
                                        param='category'
                                        array={categories}
                                        handleFilter={handleFilter}
                                    />
                                }
                                {
                                    brands.length &&
                                    <FilterOptions
                                        title='Marcas'
                                        param='brand'
                                        array={brands}
                                        handleFilter={handleFilter}
                                    />
                                }
                            </div>
                            <div id="resultados">
                                {
                                    items.length > 0
                                        ?
                                        <ItemsContainer items={items} />
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