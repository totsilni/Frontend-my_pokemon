import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Pokemon from "./components/Pokemon"
import './loader.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/pokemon/:name" element={<Pokemon/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
