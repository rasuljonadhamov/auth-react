import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SignUp />}></Route>
      <Route path="/signin" element={<SignIn />}></Route>
    </Routes>
  );
};

export default App;
