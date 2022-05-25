// React Router DOM
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Routes
import { categories, home, offers, pageNotFound, products, search } from "routes/Routes";
// Components
import Footer from "components/Footer";
import NavBar from "components/NavBar";
// Pages
import Home from "./pages/Home";
import Categories from "pages/Categories";
import Offers from "pages/Offers";
import Search from "pages/Seach";
import PageNotFound from "./pages/PageNotFound";
import Item from "pages/Item";

function App() {
  return (
    <BrowserRouter>
      <header>
        <NavBar />
      </header>
      <main className="min-h-screen bg-neutral-200 p-4">
        <Routes>
          <Route path={home} element={<Home />} />
          <Route path={categories} element={<Categories />} />
          <Route path={offers} element={<Offers />} />
          <Route path={`${products}:itemID`} element={<Item />} />
          <Route path={search} element={<Search />} />
          <Route path={pageNotFound} element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
