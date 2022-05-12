// React Router DOM
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Routes
import { home, pageNotFound } from "routes/Routes";
// Pages
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <header>

      </header>
      <main className="min-h-screen bg-neutral-300">
        <Routes>
          <Route path={home} element={<Home />} />
          <Route path={pageNotFound} element={<PageNotFound />} />
        </Routes>
      </main>
      <footer>

      </footer>
    </BrowserRouter>
  );
}

export default App;
