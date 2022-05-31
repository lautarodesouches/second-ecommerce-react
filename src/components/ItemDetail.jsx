// React
import { useRef, useState } from "react";
// Utils
import { capitalize, formatNumber } from "utils/functions";
// Components
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./ButtonSecondary";
import FreeShipping from "./FreeShipping";
// Assets
import ArrowDown from "assets/ArrowDown";
import StarFill from "assets/StarFill";
import StarHalf from "assets/StarHalf";
import StarEmpty from "assets/StarEmpty";
// React Router DOM
import { Link } from "react-router-dom";
// Routes
import { search } from "routes/Routes";

const ItemDetail = ({ item }) => {

    const [mainImg, setMainImg] = useState(1);
    const [selectedUnits, setSelectedUnits] = useState(1);
    const [displaySelectUnits, setDisplaySelectUnits] = useState(false);
    const [color, setColor] = useState(null);
    const [displayUnitsInput, setDisplayUnitsInput] = useState(false);

    const focusSelectUnits = useRef(null);

    const STAR_CLASS = 'w-4 fill-blue-500';

    const handleShowSelectUnits = () => {
        console.log('test');
        (async () => setDisplaySelectUnits(!displaySelectUnits))()
            .then(() => {
                focusSelectUnits.current.focus();
            })
    }

    const handleUnitInput = (e) => {
        e.target.value > 1 && setSelectedUnits(e.target.value);
        setDisplaySelectUnits(false);
        setDisplayUnitsInput(false);
    }

    const handleSelectUnits = (i) => {
        i < item.amountAvailable && setSelectedUnits(i);
        setDisplaySelectUnits(!displaySelectUnits);
    }

    return (
        <section className="container flex flex-col md:flex-row flex-wrap bg-white rounded p-4 my-4 text-center m-auto">
            <div className="w-full text-left">
                <Link to={`${search}/?category=${item.category}`} >{item.category}</Link>
                {' > '}
                <Link to={`${search}/?brand=${item.brand}`} >{item.brand}</Link>
            </div>
            { /* --------------------------------- */}
            <div className="flex w-full md:w-1/2 lg:w-3/12 p-2">
                <div className="flex flex-col w-auto justify-center items-center order-1 md:order-none">
                    {
                        [...Array(item.availableImages)].map((und, index) => {
                            und = 0;
                            index++;
                            return (
                                <div key={index} className={`w-12 h-12 my-1 cursor-pointer rounded border border-neutral-400 p-1 ${mainImg === index ? 'border-blue-700' : ''}`} onClick={() => setMainImg(index)} onMouseEnter={() => setMainImg(index)}>
                                    <img className="m-auto max-w-full h-full" src={`https://lautarodesouches.github.io/ecommerce/img/${item.id}-${index}.png`} alt={item.name} />
                                </div>
                            )
                        }
                        )
                    }
                </div>
                <div className="grow self-center">
                    <img className="m-auto max-h-48 max-w-full rounded-xl" src={`https://lautarodesouches.github.io/ecommerce/img/${item.id}-${mainImg}.png`} alt={item.name} />
                </div>
            </div>
            { /* --------------------------------- */}
            <div className="w-full md:w-1/2 lg:w-5/12 p-2">
                <h2 className="mt-4 text-3xl font-semibold">{item.name}</h2>
                <div className="mt-4 mb-2">
                    {
                        item.discount > 0
                            ?
                            <>
                                <h4 className="font-light text-neutral-500 line-through">{formatNumber(item.price)}</h4>
                                <h3 className="font-light text-5xl">{formatNumber(item.price - item.price * item.discount / 100)} <span className="text-green-600 text-base font-medium">{item.discount + "% OFF"}</span> </h3>
                            </>
                            :
                            <h3 className="text-3xl font-light">{formatNumber(item.price)}</h3>
                    }
                </div>
                <div className="mt-10 flex gap-4 flex-wrap items-center">
                    <h3 className="grow">{item.sold} vendedidos</h3>
                    <div className="grow flex gap-1 justify-center order-1 md:order-none" alt={`${item.stars} estrellas`}>
                        {
                            [...Array(5)].map((und, index) =>
                                item.stars >= index + 1 ? <StarFill key={index} svgClass={STAR_CLASS} /> : (item.stars <= index ? <StarEmpty key={index} svgClass={STAR_CLASS} /> : <StarHalf key={index} svgClass={STAR_CLASS} />)
                            )
                        }
                    </div>
                    <h3 className="grow">{item.opinions} opiniones</h3>
                </div>
                <div className="mt-10">
                    <p>{item.description}</p>
                </div>
            </div>
            { /* --------------------------------- */}
            <div className="w-full lg:w-4/12 p-3">
                {
                    item.freeShipping && <FreeShipping />
                }
                <div tabIndex="0" className="mt-6 text-lg cursor-pointer relative" ref={focusSelectUnits} onBlur={() => { displayUnitsInput && setDisplaySelectUnits(false) }}>
                    <h3 onClick={() => handleShowSelectUnits()}>
                        Cantidad: <span className={selectedUnits > item.amountAvailable ? 'text-red-500' : 'text-black'}>{selectedUnits}</span> unidad
                        <ArrowDown svgClass={`mx-2 w-4 inline fill-white bg-blue-500 rounded transition-all transform ${displaySelectUnits ? 'rotate-180' : 'rotate-0'}`} />
                        <span className="text-neutral-500">
                            {` (${item.amountAvailable} disponible${item.amountAvailable > 1 && 's'})`}
                        </span>
                    </h3>
                    <div className={`${displaySelectUnits ? 'visible' : 'hidden'} absolute bg-white border border-solid border-gray-300 w-3/5 left-0 right-0 rounded-sm mx-auto shadow-lg mt-2`}>
                        {
                            [1, 2, 3, 4, 5].map(i =>
                                <div
                                    key={i}
                                    className={`py-1 border border-solid ${i === selectedUnits ? 'border-blue-700' : 'border-gray-100'} transition-all ${i > item.amountAvailable ? 'text-gray-400 hover:bg-red-200' : 'hover:bg-slate-300'}`}
                                    onClick={() => handleSelectUnits(i)}>
                                    <h4>{i}</h4>
                                </div>
                            )
                        }
                        <div className="border-b border-solid border-gray-300 hover:bg-slate-300 transition-all">
                            <input
                                className="w-full h-full text-center py-1"
                                inputMode="numeric"
                                onChange={(e) => e.target.value > item.amountAvailable ? (e.target.classList.add('bg-red-200')) : (e.target.classList.remove('bg-red-200'))}
                                onBlur={(e) => handleUnitInput(e)}
                                onKeyDown={(e) => e.code === 'Enter' && handleUnitInput(e)}
                                placeholder="6 o más"
                            />
                        </div>
                    </div>
                </div>
                <div className="my-6">
                    <h3 className="text-lg">Colores disponibles:</h3>
                    <div className="flex w-2/3 mt-4 mx-auto gap-4">
                        {
                            item.availableColors.map(i =>
                                <span key={i} className={`${i === color ? 'border border-blue-700' : 'bg-white hover:bg-slate-300'} rounded cursor-pointer grow shadow py-1 transition`} onClick={() => setColor(i)}>{capitalize(i)}</span>
                            )
                        }
                    </div>
                </div>
                <div className="md:flex mt-8 justify-evenly">
                    <ButtonSecondary whith={'md:w-5/12'} margin={'my-2'}>
                        Agregar al carrito
                    </ButtonSecondary>
                    <ButtonPrimary whith={'md:w-5/12'} margin={'my-2'}>
                        Comprar Ahora
                    </ButtonPrimary>
                </div>
            </div>
        </section>
    );
}

export default ItemDetail;