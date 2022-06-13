// Components
import Error from "components/Error";
import ItemsContainer from "components/ItemsContainer";
import Loading from "components/Loading";
// Firebase
import { collection, getDocs, query } from "firebase/firestore";
// React
import { useEffect, useState } from "react";
// Utils
import db from "utils/firebaseConfig";
import { shuffle } from "utils/functions";

const Offers = () => {

    const [error, setError] = useState('');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async function () {
            const querySnapshot = query(collection(db, "products"))
            return await getDocs(querySnapshot);
        })()
            .then((result) => {

                if (!result.docs) throw new TypeError("Hubo un error por favor intente mas tarde");

                const data = shuffle(
                    result.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                )

                let offers = data.filter(e => e.discount > 0);
                if (!offers) throw new TypeError('No se encontraron ofertas');
                setItems(offers);

            })
            .catch(error => {
                setError({ message: error.message });
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
                            <ItemsContainer title="Ofertas" items={items} />
                    )
            }
        </>
    );
}

export default Offers;