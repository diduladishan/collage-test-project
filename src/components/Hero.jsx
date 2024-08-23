import Hero from "../assets/hero.jpg"
import Footer from "./Footer"
import Navbar from "./Navbar"

const hero = () => {
  return (
    <div className="container mx-auto">
      <div className="">
        {" "}
        <div>
          {" "}
          <Navbar />
          <div className="mt-6 flex flex-col items-center lg:mt-10">
            <h1 className="text-center text-4xl tracking-wide sm:text-6xl lg:text-7xl">
              Create more
              <span className="bg-gradient-to-r from-[#D42680] to-[#3D3BC9] bg-clip-text font-bold text-transparent">
                {" "}
                MEME
              </span>{" "}
              in less time!
            </h1>
            <p className="mt-10 max-w-4xl text-center text-lg text-neutral-500">
              Create and share memes instantly with MemeMaster! Choose from
              templates or upload your own images. Perfect for beginners and
              pros. Start creating and join the meme revolution!
              <footer className="mt-10 border-t border-neutral-700"></footer>
            </p>
            <div className="my-10 flex flex-col items-center justify-center sm:flex-row">
              <a
                href="#"
                className="mx-2 rounded-md bg-gradient-to-r from-[#D42680] to-[#3D3BC9] px-6 py-2 text-xs sm:mx-3 sm:text-sm"
              >
                Connect Wallet
              </a>
              <a
                href="#"
                className="mt-4 rounded-md border px-6 py-2 text-center text-xs sm:mt-0 sm:text-sm"
              >
                Documentation
              </a>
            </div>

            <div className="mt-10 flex justify-center bg-gradient-to-r from-[#D42680] to-[#3D3BC9]">
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
  )
}

export default hero
