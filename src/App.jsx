import { formatDistance } from "date-fns";
import { tr } from "date-fns/locale";
function App() {
  const daysLeft = formatDistance(new Date(2025, 0, 6), new Date(), {
    addSuffix: true,
    locale: tr,
  });
  return (
    <div className="bg-black h-screen">
      <div className="container flex flex-col gap-10">
        <div className="flex place-content-center pt-10">
          <img src="./images/logo.png" className="w-100" alt="Vite logo" />
        </div>
        <h1 className="text-4xl text-center text-white">Loading</h1>
        <div className="text-white text-xl text-center">
          {daysLeft} sizlerleyiz.
        </div>
        <img src="./images/pacman-namco.gif" className="mx-auto w-52" />
      </div>
    </div>
  );
}

export default App;
