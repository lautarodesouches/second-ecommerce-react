// Components
import ItemsContainer from "components/ItemsContainer";
import Loading from "components/Loading";
// Firebase
import { collection, getDocs, query } from "firebase/firestore";
// React
import { useEffect, useState } from "react";
// Utils
import db from "utils/firebaseConfig";
import { shuffle } from "utils/functions";

const Home = () => {
    
    const [recommended, setRecommended] = useState([]);
    const [featured, setFeatured] = useState([]);
    const [ofertas, setOfertas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async function () {
            const querySnapshot = query(collection(db, "products"))
            return await getDocs(querySnapshot);
        })()
            .then((result) => {

                // Get data
                const data = shuffle(
                    result.docs.map( (doc) => (
                        { id: doc.id, ...doc.data() }
                        )
                    )
                )
                
                // Recommended
                const recommended = [...data];
                // Sort by amount available
                recommended.sort( (a,b) => b.amountAvailable - a.amountAvailable);
                // Limit array
                recommended.length = 4
                setRecommended(recommended);
                
                // Featured
                const featured = [...data];
                // Sort by sold
                featured.sort( (a,b) => b.sold - a.sold);
                // Limit array
                featured.length = 4
                setFeatured(featured);
                
                // Offers
                const ofertas = data.filter( (e) => e.discount > 0);
                // Limit array
                ofertas.length = 4
                setOfertas(ofertas);

                // Loading finished
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
            })
    },[])

    return(
        <>
            {
                loading
                ?
                <Loading />
                :
                <>
                    <ItemsContainer title="Productos Recomendados" array={recommended} />
                    <ItemsContainer title="Productos Destacados" array={featured} />
                    <ItemsContainer title="Ofertas" array={ofertas} />
                </>
            }
        </>
    );
}

export default Home;