// Components
import ItemsContainer from "components/ItemsContainer";
import Loading from "components/Loading";
// Firebase
import { collection, getDocs, query } from "firebase/firestore";
// React
import { useContext, useEffect, useState } from "react";
// Utils
import db from "utils/firebaseConfig";
import { shuffle } from "utils/functions";
// Context
import { ErrorContext } from "context/ErrorContextProvider";

const Offers = () => {

    const { setError, MyError } = useContext(ErrorContext);

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async function () {
            const querySnapshot = query(collection(db, "products"))
            return await getDocs(querySnapshot);
        })()
            .then((result) => {

                if (!result.docs) { throw new Error('doc') };

                const data = shuffle(
                    result.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                )

                let offers = data.filter(e => e.discount > 0);
                if (!offers) throw new Error('discount');
                setItems(offers);

            })
            .catch(error => {
                if (error.message === 'docs') {
                    setError(new MyError('Sin docs', true, 'Algo salio mal :('));
                } else if (error.message === 'discount') {
                    setError(new MyError('Sin descuento', true, 'No se encontraron ofertas'));
                } else {
                    setError(new MyError(error));
                }
            })
            .finally(() => setLoading(false))
    }, [MyError, setError])

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