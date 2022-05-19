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
    
    const [productosRecomendados, setProductosRecomendados] = useState([]);
    const [productosDestacados, setProductosDestacados] = useState([]);
    const [ofertas, setOfertas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async function () {
            const querySnapshot = query(collection(db, "products"))
            return await getDocs(querySnapshot);
        })()
            .then((result) => {

                // Get data
                const array = shuffle(
                    result.docs.map( (doc) => (
                        { id: doc.id, ...doc.data() }
                        )
                    )
                )
                
                // Recomendados
                let recomendados = array.filter( (e) => e.discount > 0)
                // Limit array
                recomendados.length = 4
                setProductosRecomendados(recomendados);
                
                // Destacados
                let destacados = array.filter( (e) => e.discount > 0)
                // Limit array
                destacados.length = 4
                setProductosDestacados(destacados);
                
                // Offers
                let ofertas = array.filter( (e) => e.discount > 0)
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
                    <ItemsContainer title="Productos Recomendados" array={productosRecomendados} />
                    <ItemsContainer title="Productos Destacados" array={productosDestacados} />
                    <ItemsContainer title="Ofertas" array={ofertas} />
                </>
            }
        </>
    );
}

export default Home;