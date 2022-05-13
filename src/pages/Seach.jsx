import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import db from "utils/firebaseConfig";

const Search = () => {

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        (async function () {
            const querySnapshot = query(collection(db, "products"))
            return await getDocs(querySnapshot);
        })()
            .then((result) => {
                // Get unique values
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
            })
            .catch((error) => {
                console.log(error);
            })
    },[])

    return(
        <section className="min-h-screen text-center flex flex-col md:flex-row">
            <div id="filtros" className="fade md:w-1/3 text-left p-4">
                <div className="flex flex-col">
                    <h4 className="text-xl">Categorias:</h4>
                    <ul className="pl-4 pt-2">
                        {
                            categories.map(category => <li onClick={() => {console.log(category);}} key={category}>{category}</li>)
                        }
                    </ul>
                </div>
                <div className="flex flex-col mt-4">
                    <h4 className="text-lg">Marcas:</h4>
                    <ul className="pl-4 pt-2">
                        {
                            brands.map(brand => <li onClick={() => {console.log(brand);}} key={brand}>{brand}</li>)
                        }
                    </ul>
                </div>
            </div>
            <div id="resultados">
                {
                    false
                    ?
                    null
                    :
                    <h2 className="fade py-10 md:pt-40">No se han encontrado productos que coincidan con tu búsqueda</h2>
                }
            </div>
        </section>
    );
}

export default Search;