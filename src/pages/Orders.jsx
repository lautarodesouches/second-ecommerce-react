// Components
import Error from "components/Error";
import Loading from "components/Loading";
import OrdersForm from "components/OrdersForm";
import OrdersResult from "components/OrdersResult";
// React
import { useState } from "react";
// Utils
import db from "utils/firebaseConfig";
// Functions
import { useParams } from "react-router-dom";
// Firebase
import { doc, getDoc } from "firebase/firestore";

const Orders = () => {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [cartList, setCartList] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [formCompleted, setFormCompleted] = useState(false);

    const orderId = useParams().orderId;

    const processForm = (e) => {

        e.preventDefault();

        (async () => {
            const docRef = doc(db, "orders", e.target.children[1].children[1].value);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) return docSnap.data();
        })()
            .then(res => {
                if (res === undefined) throw new TypeError('No se ha encontrado una order con ese ID');
                setCartList(res.items);
                setCartTotal(res.total);
            })
            .catch(error => {
                setError({ message: error.message });
            })
            .finally(() => setLoading(false))

        setFormCompleted(true);

    }

    /* Example ID: 7Rw7xMN6nBFHlBOKVIFk */

    return (
        <section className="m-auto my-8">
            {
                error
                    ?
                    <Error error={error} />
                    :
                    (

                        formCompleted
                            ?
                            (
                                loading
                                    ?
                                    <Loading />
                                    :
                                    <OrdersResult cartList={cartList} cartTotal={cartTotal} setFormCompleted={setFormCompleted} />
                            )
                            :
                            <OrdersForm orderId={orderId} processForm={processForm} />
                    )
            }
        </section>
    );
}

export default Orders;