// React Router DOM
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Routes
import { cart, categories, checkout, favourites, home, offers, orders, pageNotFound, products, search } from "routes/Routes";
// Components
import Footer from "components/Footer";
import NavBar from "components/NavBar";
// Pages
import Home from "./pages/Home";
import Categories from "pages/Categories";
import Offers from "pages/Offers";
import Favourites from "pages/Favourites";
import Search from "pages/Seach";
import PageNotFound from "./pages/PageNotFound";
import Item from "pages/Item";
import Cart from "pages/Cart";
// Context
import FavouriteContexProvider from "context/FavouriteContexProvider";
import CartContextProvider from "context/CartContextProvider";
import Checkout from "pages/Checkout";
import Orders from "pages/Orders";

function App() {
  return (
    <CartContextProvider>
      <FavouriteContexProvider>
        <BrowserRouter>
          <header>
            <NavBar />
          </header>
          <main className="min-h-screen bg-neutral-200 p-4">
            <Routes>
              <Route path={home} element={<Home />} />
              <Route path={categories} element={<Categories />} />
              <Route path={offers} element={<Offers />} />
              <Route path={favourites} element={<Favourites />} />
              <Route path={`${products}:itemID`} element={<Item />} />
              <Route path={search} element={<Search />} />
              <Route path={cart} element={<Cart />} />
              <Route path={checkout} element={<Checkout />} />
              <Route path={orders} element={<Orders />} />
              <Route path={`${orders}:orderId`} element={<Orders />} />
              <Route path={pageNotFound} element={<PageNotFound />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </FavouriteContexProvider>
    </CartContextProvider>
  );
}

export default App;
