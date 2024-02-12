import { useState } from "react";
import Input from "../components/Input";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function SignIn() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    login: "",
    password: "",
  });

  const validateForm = () => {
    console.log(formData);
    let isValid = true;
    const newErrors = { ...errors };

    if (formData.login.length < 5) {
      newErrors.login = "Login is required. It should be at least 6 characters";
      isValid = false;
    } else {
      newErrors.login = "";
    }

    if (!formData.password.length < 5 && formData.password === formData.login) {
      newErrors.password =
        "Password is required. It should be at least 6 characters";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          "https://auth-rg69.onrender.com/api/auth/signin",
          {
            username: formData.login,
            email: formData.password,
            password: formData.password,
          }
        );

        console.log(response.data);
        alert(
          "Form submitted successfully!, your access token saved to your cookies",
          formData
        );
        setUser(response.data);
        setFormData({
          login: "",
          password: "",
        });
        const accessToken = response.data.accessToken;
        Cookies.set("accessToken", accessToken, { expires: 7 });
        // console.log(accessToken);
      } catch (error) {
        console.error("Error during axios request:", error);
        alert("Form submission failed.");
      }
    } else {
      alert("Form validation failed.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex justify-between items-center p-[46px] ">
      <div className="flex flex-col items-center justify-center">
        <img
          src="/logo.png"
          alt="Logo"
          className="mb-24 "
          height={"45px"}
          width={"125px"}
        />
        <h1 className="text-5xl mb-3 font-bold">
          Xush kelibsiz!
          {user && (
            <div>
              <h1 className="text-xl mt-4 mb-3 font-bold">
                Welcome, {user.username}!
              </h1>
            </div>
          )}
        </h1>

        {!user && (
          <p className="mb-11">
            {" "}
            Login parolingizni kiritib oz kabinetingizga kiring.{" "}
          </p>
        )}

        <form className="w-full" onSubmit={handleSubmit}>
          <Input
            label="Login"
            type="text"
            placeHolder="Loginingizni kiriting"
            name="login"
            value={formData.login}
            onChange={handleChange}
            error={errors.login}
          />
          <Input
            label="Parol"
            type="password"
            placeHolder="Parolingizni kiriting"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />
          <button
            type="submit"
            className="bg-blue-600 w-full mt-2 text-white px-4 py-3 rounded-md font-bold shadow hover:bg-blue-700"
          >
            Kirish
          </button>

          <Link to={"/"} className="text-sky-500 mt-4 block text-center">
            Do not You have an account, Go to SignUp
          </Link>
        </form>

        <p className="mt-12 text-lg font-medium text-gray-500">
          Copyright ©  2024 Vim kompaniyasi
        </p>
      </div>

      <img
        src="/male.png"
        alt="Male sitting photo"
        className="w-[820px] h-[660px] object-contain"
      />
    </div>
  );
}

export default SignIn;
