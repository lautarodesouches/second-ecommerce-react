import { collection, getDocs, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { products } from "routes/Routes";
import db from "utils/firebaseConfig";

const Categories = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        (async function () {
            const querySnapshot = query(collection(db, "products"))
            return await getDocs(querySnapshot);
        })()
            .then((result) => {
                // Get unique values
                const array = new Set(
                    result.docs.map( (doc) => (
                            doc.data().category
                        )
                    )
                )
                setCategories([...array]);
            })
            .catch((error) => {
                console.log(error);
            })
    },[])

    return(
        <section className="p-8 grid lg:grid-cols-4 gap-8 md:pt-16">
            {
                categories.map(category => (
                    <Link to={`${products}/?category=${category.toLowerCase()}`} >
                        <div key={category} className="fade p-4 text-center text-white bg-sky-700 cursor-pointer rounded hover:-translate-y-1 transition-all hover:bg-sky-500">
                            {category}
                        </div>
                    </Link>
                ))
            }
        </section>
    );
}

export default Categories;