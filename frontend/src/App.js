import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/NavBar.jsx";
import Login from "./components/Login.jsx";

function App() {
  return (
    <div className="App md:px-4 lg:px-8 xl:px-16 2xl:px-32 min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </div>
  );
}

export default App;
