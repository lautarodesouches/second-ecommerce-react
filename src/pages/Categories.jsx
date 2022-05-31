// Firebase
import { collection, getDocs, query } from "firebase/firestore";
// React
import { useEffect, useState } from "react";
// React Router DOM
import { Link } from "react-router-dom";
// Routes
import { search } from "routes/Routes";
// Utils
import db from "utils/firebaseConfig";
// Components
import Loading from "components/Loading";

const Categories = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

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

                // Loading finished
                setLoading(false);
            })
            .catch((error) => {
                console.log(error, ' error');
            })
    },[])

    return(
        <>
            {
                loading
                ?
                <Loading />
                :
                <section className="p-8 grid md:grid-cols-4 gap-8 md:pt-16">
                    {
                        categories.map(category => (
                            <Link to={`${search}?category=${category}`} key={category} >
                                <div className="fade p-4 text-center text-white bg-gradient-to-br from-sky-700 to-blue-700 hover:from-sky-500 hover:to-blue-500 rounded hover:-translate-y-1 transition-all">
                                    {category}
                                </div>
                            </Link>
                        ))
                    }
                </section>
            }
        </>
    );
}

export default Categories;