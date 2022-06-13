// Components
import Error from "components/Error";
import Loading from "components/Loading";
import ItemsContainer from "components/ItemsContainer";
// Firebase
import { collection, getDocs, query } from "firebase/firestore";
// React
import { useEffect, useState } from "react";
// Utils
import { shuffle } from "utils/functions";
import db from "utils/firebaseConfig";

const Home = () => {


    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [ofertas, setOfertas] = useState([]);
    const [featured, setFeatured] = useState([]);
    const [recommended, setRecommended] = useState([]);

    useEffect(() => {
        (async function () {
            const querySnapshot = query(collection(db, "products"));
            return await getDocs(querySnapshot);
        })()
            .then(result => {

                // Get data
                const data = shuffle(
                    result.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                )

                // Recommended
                const recommended = [...data];
                // Sort by amount available
                recommended.sort((a, b) => b.amountAvailable - a.amountAvailable);
                // Limit array
                recommended.length = 4
                setRecommended(recommended);

                // Featured
                const featured = [...data];
                // Sort by sold
                featured.sort((a, b) => b.sold - a.sold);
                // Limit array
                featured.length = 4
                setFeatured(featured);

                // Offers
                const ofertas = data.filter(e => e.discount > 0);
                // Limit array
                ofertas.length = 4
                setOfertas(ofertas);

            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => setLoading(false))
    }, [])

    return (
        <>
            {
                error
                    ?
                    <Error error={error} />
                    :
                    (
                        loading
                            ?
                            <Loading />
                            :
                            <>
                                <ItemsContainer title="Productos Recomendados" items={recommended} />
                                <ItemsContainer title="Productos Destacados" items={featured} />
                                <ItemsContainer title="Ofertas" items={ofertas} />
                            </>
                    )
            }
        </>
    );
}

export default Home;