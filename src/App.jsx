import "./App.css";
import HomePage from "./pages/HomePage";
import NewTodoPage from "./pages/NewTodoPage";
import EditTodoPage from "./pages/EditTodoPage";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/new">Nuova task</Link>
        <Link to="/edit/1">Modifica</Link>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/new" element={<NewTodoPage />}></Route>
        <Route path="/edit/:id" element={<EditTodoPage />}></Route>
      </Routes>
    </>
  );
}

export default App;
