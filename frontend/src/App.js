import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/common/NavBar.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import { AuthContext } from "./context/authContext.jsx";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  const [userAuth, setUserAuth] = useState(false);
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ userAuth, setUserAuth }}>
        <div className="App px-2 md:px-4 lg:px-8 xl:px-16 2xl:px-32 min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </div>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
