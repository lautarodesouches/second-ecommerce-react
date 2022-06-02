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

const Offers = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async function () {
            const querySnapshot = query(collection(db, "products"))
            return await getDocs(querySnapshot);
        })()
            .then((result) => {

                const data = shuffle(
                    result.docs.map((doc) => (
                        { id: doc.id, ...doc.data() }
                    )
                    )
                )
                setItems(
                    data.filter((e) => e.discount > 0)
                );

                // Loading finished
                setLoading(false);
            })
            .catch((error) => {
                console.log(error, ' error');
            })
    }, [])

    return (
        <>
            {
                loading
                    ?
                    <Loading />
                    :
                    <ItemsContainer title="Ofertas" items={items} />
            }
        </>
    );
}

export default Offers;