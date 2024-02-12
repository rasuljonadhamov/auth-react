import { useState } from "react";
import Input from "../components/Input";

function SignIn() {
  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    login: "",
    password: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (formData.login.length < 5) {
      newErrors.login = "Login is required. It should be at least 6 character";
      isValid = false;
    } else {
      newErrors.login = "";
    }

    if (!formData.password.length < 5 && formData.password == formData.login) {
      newErrors.password =
        "Password is required. It should be at least 6 character";
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
        const res = await fetch(
          "https://auth-69.onrender.com/api/auth/signup",
          {
            method: "POST",
            headers: {
              "Content-Type": "SignUplication/json",
            },
            body: JSON.stringify({
              username: formData.login,
              email: formData.password,
              password: formData.password,
            }),
          }
        );

        console.log(res);

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log(data);
        alert("Form submitted successfully!", formData);
      } catch (error) {
        console.error("Error during fetch:", error);
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
          src="/public/logo.png"
          alt="Logo"
          className="mb-24 "
          height={"45px"}
          width={"125px"}
        />
        <h1 className="text-5xl mb-3 font-bold">Xush kelibsiz!</h1>
        <p className="mb-11">
          Login parolingizni kiritib o‘z kabinetingizga kiring.
        </p>

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
