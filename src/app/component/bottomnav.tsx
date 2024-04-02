import { FaHome, FaSearch, FaLink } from "react-icons/fa";

export default function BottomNav() {
  return (
    <div className="fixed z-50 w-[20rem] h-12 max-w-md -translate-x-1/2 bg-[#E5D9B6] border border-gray-200 rounded-full bottom-4 left-1/2 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-md grid-cols-3 mx-auto rounded-full">
        <button
          data-tooltip-target="Home"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-[#A4BE7B] rounded-full dark:hover:bg-gray-800 group"
        >
          <FaHome color="#5F8D4E" size={25} />
          <span className="sr-only">Wallet</span>
        </button>
        <div
          id="tooltip-wallet"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Wallet
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <div className="flex items-center justify-center">
          <button
            data-tooltip-target="tooltip-new"
            type="button"
            className="inline-flex items-center justify-center w-10 h-10 font-medium bg-[#285430] rounded-full hover:bg-[#5F8D4E] group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800"
          >
            <FaLink color="#fff" size={20} />
            <span className="sr-only">New item</span>
          </button>
        </div>
        <div
          id="tooltip-new"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          Create new item
          <FaLink />
        </div>
        <a
          href="/search"
          data-tooltip-target="tooltip-search"
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 hover:bg-[#A4BE7B] dark:hover:bg-gray-800 group rounded-full"
        >
          <FaSearch color="#5F8D4E" size={25} />
          <span className="sr-only">Settings</span>
        </a>
        <div
          id="tooltip-search"
          role="tooltip"
          className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
        >
          search
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
    </div>
  );
}
