// React
import { useContext, useEffect, useState } from "react";
// Firebase
import { collection, getDocs, query, where } from "firebase/firestore";
// Utils
import db from "utils/firebaseConfig";
// React Router DOM
import { useParams } from "react-router-dom";
// Components
import ItemDetail from "components/ItemDetail";
import Loading from "components/Loading";
// Context
import { ErrorContext } from "context/ErrorContextProvider";

const Item = () => {

    const { setError, MyError } = useContext(ErrorContext);

    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    const { itemID } = useParams();

    useEffect(() => {
        (async function () {
            const querySnapshot = query(collection(db, "products"), where("id", "==", parseInt(itemID)));
            return await getDocs(querySnapshot);
        })()
            .then(result => {
                setItem(result.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0]);
            })
            .catch(error => {
                setError(new MyError(error));
            })
            .finally(() => setLoading(false))
    }, [itemID, MyError, setError])

    return (
        <>
            {
                loading
                    ?
                    <Loading />
                    :
                    <ItemDetail item={item} />
            }
        </>
    );
}

export default Item;