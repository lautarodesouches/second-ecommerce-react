// React Router DOM
import { BrowserRouter, Route, Routes } from "react-router-dom";
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
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
      <footer>

      </footer>
    </BrowserRouter>
  );
}

export default App;
