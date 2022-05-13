// React Router DOM
import Footer from "components/Footer";
import NavBar from "components/NavBar";
import Categories from "pages/Categories";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Routes
import { categories, home, pageNotFound } from "routes/Routes";
// Pages
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";

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
          <Route path={pageNotFound} element={<PageNotFound />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
