import Input from "./components/Input";

function App() {
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

        <form className="w-full">
          <Input
            label="Login"
            type="password"
            placeHolder="Loginingizni kiriting"
          />
          <Input
            label="Parol"
            type="password"
            placeHolder="Parolingizni kiriting"
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

export default App;
