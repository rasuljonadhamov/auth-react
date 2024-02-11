import Input from "./components/Input";

function App() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex flex-col items-center">
        <img src="/public/logo.png" alt="Logo" className="mb-4" />
        <h1 className="text-2xl mb-2 font-bold">Xush kelibsiz!</h1>
        <p className="mb-4">
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
            className="bg-blue-600 text-white px-4 py-2 rounded-md font-bold shadow hover:bg-blue-700"
          >
            Kirish
          </button>
        </form>
      </div>

      <img
        src="/public/male.png"
        alt="Male sitting photo"
        className="w-[820px] h-[660px] object-contain"
      />
    </div>
  );
}

export default App;
