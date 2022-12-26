import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/common/NavBar.jsx";
import Home from "./components/Home.jsx";
import Login from "./components/Login.jsx";
import { AuthContext } from "./context/authContext.jsx";
import { QueryClient, QueryClientProvider } from "react-query";
import SignUp from "./components/SignUp.jsx";
import { Interaction } from "./context/interactionAuth.jsx";
import NotificationCard from "./components/NotifcationCard.jsx";

const queryClient = new QueryClient();

function App() {
  const [userAuth, setUserAuth] = useState(false);
  const [key, setKey] = useState(false);
  const [addTaskWindow, setAddTaskWindow] = useState(false);
  const [notification, setNotification] = useState(false);
  if (notification) {
    setTimeout(() => {
      setNotification(false);
    }, 5000);
  }
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContext.Provider value={{ userAuth, setUserAuth }}>
        <Interaction.Provider
          value={{
            key,
            setKey,
            addTaskWindow,
            setAddTaskWindow,
            notification,
            setNotification,
          }}
        >
          <div className="App px-2 md:px-4 lg:px-8 xl:px-16 2xl:px-32 min-h-screen relative">
            <Navbar />
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/sign-up" element={<SignUp />} />
              <Route path="/" element={<Home />} />
            </Routes>
            <NotificationCard />
          </div>
        </Interaction.Provider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
