import Dicord from "../assets/discord.png"
import Facebook from "../assets/facebook.png"
import Logo from "../assets/memelogonav.png"
import tel from "../assets/tel.png"
import ticktok from "../assets/ticktok.png"
import X from "../assets/x.png"
import { resourcesLinks, platformLinks, communityLinks } from "../constants1"

const Footer = () => {
  return (
    <footer className="mx-auto mt-20 flex w-[100%] max-w-screen-xl flex-col items-center justify-center border-t border-neutral-700 py-10">
      <div className="flex cursor-pointer items-center justify-center">
        <img
          className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10"
          src={Logo}
          alt="MEME_Generate"
        />
      </div>

      <div className="mt-6 flex flex-row justify-between sm:w-[50%] md:w-[30%] 2xl:ml-4">
        <div className="flex cursor-pointer flex-col items-center px-4">
          <div className="flex h-5 w-5 flex-row items-center justify-center sm:h-7 sm:w-7">
            <img className="h-[80%] w-[80%]" src={X} alt="MEME_Generate" />
          </div>
          <a
            href="https://x.com/memescoin?s=21&t=UEB_WMtZkqwNoNKZifsE4A"
            className="text-sm tracking-tight  sm:text-lg"
            target="_blank"
          >
            X
          </a>
        </div>
        <div className="flex cursor-pointer flex-col items-center px-4">
          <div className="flex h-5 w-5 flex-row items-center justify-center sm:h-7 sm:w-7">
            <img className="" src={tel} alt="MEME_Generate" />
          </div>
          <a
            href="https://t.me/MemesCoinPortal"
            className="text-sm tracking-tight sm:text-lg"
            target="_blank"
          >
            Telegram
          </a>
        </div>
        <div className="flex cursor-pointer flex-col items-center px-4">
          <div className="flex h-5 w-5 flex-row items-center justify-center sm:h-7 sm:w-7">
            <img className="" src={ticktok} alt="MEME_Generate" />
          </div>
          <a
            href="https://www.tiktok.com/@memescoin.com?_t=8p6ssytySCs&_r=1 "
            className="text-sm tracking-tight sm:text-lg"
            target="_blank"
          >
            TiKTok
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
