// React
import { useEffect, useState } from "react";
// Firebase
import { collection, getDocs, query, where } from "firebase/firestore";
import db from "utils/firebaseConfig";
// React Router DOM
import { useParams } from "react-router-dom";
import Loading from "components/Loading";
import NotFound from "components/NotFound";
import { formatNumber } from "utils/functions";

const Product = () => {

    const [ product, setProduct ] = useState(null);
    /* const [ images, setImages ] = useState(0); */
    const [ loading, setLoading ] = useState(true);
    
    const { productID } = useParams();
    
    useEffect(() => {
        (async function () {
            const querySnapshot = query(collection(db, "products"), where("id", "==", parseInt(productID) ));
            return await getDocs(querySnapshot);
        })()
        .then(result => {
            setProduct( result.docs.map( (doc) => ({ id: doc.id, ...doc.data() }) )[0] );
            // Loading finished
            setLoading(false);
        })
        .catch(error => {
            console.log(error);
        })
    }, [productID])

    /*
    
    amountAvailable: 95
    availableColors: (3) ['negro', 'verde', 'blanco']
    availableImages: 3
    brand: "Soundpeats"
    category: "Auriculares"
    description: "Con el Smart TV UN50AU7000G vas a acceder a las aplicaciones en las que se encuentran tus contenidos favoritos. Además, podés navegar por Internet, interactuar en redes sociales y divertirte con videojuegos."
    discount: 7
    freeShipping: false
    id: 20
    name: "Auriculares in-ear inalámbricos Soundpeats"
    opinions: 53
    price: 5591
    sold: 337
    stars: 3.4

    */

    return(
        <>
        {
            loading
            ?
            <Loading />
            :
                product
                ?
                <section className="container flex bg-white rounded p-4 my-4">
                    <div className="p-1 w-3/12 flex text-center">
                        <div className="flex flex-col w-1/6 justify-start items-center">
                            {
                                
                            }
                            <div className="w-14 h-14 my-1 cursor-pointer rounded border border-neutral-400 p-1 hover:border-blue-700">
                                <img className="m-auto max-w-full h-full" src={`https://lautarodesouches.github.io/ecommerce/img/${product.id}-${1}.png`} alt={product.name} />
                            </div>
                            <div className="w-14 h-14 my-1 cursor-pointer rounded border border-neutral-400 p-1 hover:border-blue-700">
                                <img className="m-auto max-w-full h-full" src={`https://lautarodesouches.github.io/ecommerce/img/${product.id}-${2}.png`} alt={product.name} />
                            </div>
                            <div className="w-14 h-14 my-1 cursor-pointer rounded border border-neutral-400 p-1 hover:border-blue-700">
                                <img className="m-auto max-w-full h-full" src={`https://lautarodesouches.github.io/ecommerce/img/${product.id}-${3}.png`} alt={product.name} />
                            </div>
                        </div>
                        <div className="w-5/6 self-center">
                            <img className="w-4/5 m-auto rounded-xl" src={`https://lautarodesouches.github.io/ecommerce/img/${product.id}-${1}.png`} alt={product.name} />
                        </div>
                    </div>
                    <div className="p-1 w-5/12">
                        <h3 className="text-neutral-500 text-sm text-center">{product.sold} vendedidos</h3>
                        <h2 className="mt-2 text-2xl font-semibold text-center">{product.name}</h2>
                        <div className="my-4"><h3>Estrellas: {product.stars}</h3></div>
                        <div className="mt-4 mb-2">
                            {
                                product.discount > 0
                                ?
                                <>
                                    <h4 className="font-light text-neutral-500 text-sm line-through">{formatNumber(product.price)}</h4>
                                    <h3 className="font-light text-4xl">{formatNumber(Math.round(product.price - product.price * product.discount / 100))} <span className="text-green-600 text-base font-medium">{product.discount + "% OFF"}</span> </h3>
                                </>
                                :
                                <h3 className="text-3xl font-light">{formatNumber(product.price)}</h3>
                            }
                        </div>
                        { product.freeShipping && <h3 className="text-green-600 font-bold">Envio Gratis!</h3>}
                        <div className="mt-4">
                            <p>{product.description}</p>
                        </div>
                    </div>
                    <div className="p-1 w-4/12">
                        Order
                    </div>
                </section>
                :
                <NotFound message="No se ha encontrado el producto" />            
        }
        </>
    );
}

export default Product;