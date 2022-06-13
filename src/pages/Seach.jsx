// Components
import Loading from "components/Loading";
import SearchContainer from "components/SearchContainer";
// Firebase
import { collection, getDocs, query } from "firebase/firestore";
// React
import { useCallback, useEffect, useState } from "react";
// React DOM
import { useSearchParams } from "react-router-dom";
// Utils
import { shuffle } from "utils/functions";
import db from "utils/firebaseConfig";
import Error from "components/Error";

const Search = () => {

    const [error, setError] = useState('');
    const [items, setItems] = useState([]);
    const [brands, setBrands] = useState([]);
    const [loadign, setLoadign] = useState(true);
    const [copyItems, setCopyItems] = useState([]);
    const [categories, setCategories] = useState([]);

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
        let sort = searchParams.get('sort');
        // Copy data
        let data = [...copyItems];
        // Filter data
        query && (data = data.filter(e => e.category.toLowerCase().includes(query) || e.brand.toLowerCase().includes(query) || e.name.toLowerCase().includes(query)));
        category && (data = data.filter(e => e.category === category));
        brand && (data = data.filter(e => e.brand === brand));
        // Sort data
        sort === 'min' && data.sort((a, b) => a.price - b.price);
        sort === 'max' && data.sort((a, b) => b.price - a.price);
        sort === 'random' && shuffle(data);
        // Set result
        setItems(data);
    }, [copyItems, searchParams])

    // Get data
    useEffect(() => {
        (async function () {
            const querySnapshot = query(collection(db, "products"));
            return await getDocs(querySnapshot);
        })()
            .then(result => {

                if (result.docs.length < 1) throw new TypeError("Hubo un error por favor intente mas tarde");
                
                // Set Items
                const data = shuffle(
                    result.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
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
            .catch(error => setError({message: error.message}))
    }, []);

    useEffect(() => filter(), [filter]);

    return (
        <>
            {
                error
                    ?
                    <Error error={error} />
                    :
                    (
                        loadign
                            ?
                            <Loading />
                            :
                            <SearchContainer
                                items={items}
                                brands={brands}
                                categories={categories}
                                searchParams={searchParams}
                                handleFilter={handleFilter}
                            />
                    )
            }
        </>
    );
}

export default Search;