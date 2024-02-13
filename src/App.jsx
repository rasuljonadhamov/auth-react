import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import MainPage from "./pages/MainPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/main" element={<MainPage />}></Route>
    </Routes>
  );
};

export default App;
