import Hero from "../assets/hero.jpg";
import Footer from "./Footer";
import Navbar from "./Navbar";
const hero = () => {
  return (
    <div className="container mx-auto">
      <div className="">
        {" "}
        <div>
          {" "}
          <Navbar />
          <div className="flex flex-col items-center mt-6 lg:mt-10">
            <h1 className="text-4xl tracking-wide text-center sm:text-6xl lg:text-7xl">
              Create more
              <span className="bg-gradient-to-r from-[#D42680] to-[#3D3BC9] text-transparent bg-clip-text font-bold">
                {" "}
                MEME
              </span>{" "}
              in less time!
            </h1>
            <p className="max-w-4xl mt-10 text-lg text-center text-neutral-500">
              Create and share memes instantly with MemeMaster! Choose from
              templates or upload your own images. Perfect for beginners and
              pros. Start creating and join the meme revolution!
              <footer className="mt-10 border-t border-neutral-700"></footer>
            </p>
            <div className="flex flex-col items-center justify-center my-10 sm:flex-row">
              <a
                href="#"
                className="bg-gradient-to-r from-[#D42680] to-[#3D3BC9] py-2 px-6 mx-2 sm:mx-3 rounded-md text-xs sm:text-sm"
              >
                Connect Wallet
              </a>
              <a
                href="#"
                className="px-6 py-2 mt-4 text-xs text-center border rounded-md sm:mt-0 sm:text-sm"
              >
                Documentation
              </a>
            </div>

            <div className="flex mt-10 justify-center bg-gradient-to-r from-[#D42680] to-[#3D3BC9]">
              <img
                className=" w-1.2 mx-2 my-4"
                src={Hero}
                alt="MEME_Generate"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default hero;
