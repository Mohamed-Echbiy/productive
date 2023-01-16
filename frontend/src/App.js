import { useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { colors, CssBaseline } from "@mui/material";
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
  const [isItDark, setDarkMode] = useState(+localStorage.getItem("darkMode"));
  const darkTheme = createTheme({
    palette: {
      mode: +isItDark ? "dark" : "light",
    },
  });
  const [userAuth, setUserAuth] = useState(false);
  const [key, setKey] = useState(false);
  const [addTaskWindow, setAddTaskWindow] = useState(false);
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("darkMode")) {
      localStorage.setItem("darkMode", 0);
    }
    localStorage.setItem("darkMode", isItDark);
  }, [isItDark]);
  if (notification) {
    setTimeout(() => {
      setNotification(false);
    }, 5000);
  }
  // console.log(isItDark);
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
            isItDark,
          }}
        >
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <div
              className={` App px-2 md:px-4 lg:px-8 xl:px-16 2xl:px-32 min-h-screen relative overflow-x-hidden`}
            >
              <Navbar setDarkMod={setDarkMode} isItDark={isItDark} />
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/" element={<Home />} />
              </Routes>
              <NotificationCard />
            </div>
          </ThemeProvider>
        </Interaction.Provider>
      </AuthContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
