// Components
import Error from "components/Error";
import Thankyou from "components/Thankyou";
import CheckoutForm from "components/CheckoutForm";
// Context
import { CartContext } from "context/CartContextProvider";
// Firebase
import { collection, doc, getDocs, increment, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
// React
import { useContext, useState } from "react";
// Utils
import db from "utils/firebaseConfig";

const Checkout = () => {

    const { cartList, clearCart, cartTotal } = useContext(CartContext);

    const [error, setError] = useState('');
    const [orderId, setOrderId] = useState('');
    const [buyerName, setBuyerName] = useState('');
    const [formInomplete, setFormIncomplete] = useState(true);

    const createOrder = e => {

        e.preventDefault();

        const inputValue = n => e.target.children[n].children[1].value;

        setBuyerName(inputValue(0));

        // Set order
        let order = {
            buyer: {
                name: inputValue(0),
                email: inputValue(1),
                phone: inputValue(2)
            },
            total: cartTotal(),
            items: cartList.map(
                item => ({
                    id: item.id,
                    name: item.name,
                    brand: item.brand,
                    price: item.price,
                    qty: item.qty,
                    color: item.color,
                })
            ),
            date: serverTimestamp()
        }

        // Update stock
        cartList.forEach(async item => {
            // Get item doc by id
            let docId;
            const querySnapshot = query(collection(db, "products"), where("id", "==", item.id));
            await getDocs(querySnapshot).then(res => docId = res.docs[0].id);
            // Update
            const itemRef = doc(db, "products", docId);
            await updateDoc(itemRef, { amountAvailable: increment(- item.qty) });
        });

        // Create new order in firebase
        (async () => {
            const newOrderRef = doc(collection(db, "orders"));
            await setDoc(newOrderRef, order);
            return newOrderRef;
        })()
            .then(result => {
                setOrderId(result.id);
                clearCart();
            })
            .catch(error => {
                setError(error.message);
            })
            .finally(() => setFormIncomplete(false));

    }

    return (
        <>
            {
                error
                    ?
                    <Error error={error} />
                    :
                    <section className="sm:w-1/3 mt-10 mx-auto">
                        {
                            formInomplete
                                ?
                                <CheckoutForm createOrder={createOrder} />
                                :
                                <Thankyou buyerName={buyerName} orderId={orderId} />
                        }
                    </section>
            }
        </>
    );
}

export default Checkout;