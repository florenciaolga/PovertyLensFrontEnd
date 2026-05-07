import { FaSearch } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="w-full h-[90px] flex items-center justify-between px-12 bg-[#B7C68833]">
      <div className="text-[38px] font-serif text-[#5b341f]">
        PovertyLens
      </div>

      <div className="w-[420px] h-[42px] bg-[#B7C68833] rounded-full flex items-center px-5">
        <FaSearch className="text-[#5b341f] text-sm" />

        <input
          type="text"
          className="flex-1 bg-transparent outline-none border-none ml-3 text-base"
        />
      </div>

      <div className="flex gap-4">
        <button className="bg-[#b8be7c] text-[#5b341f] px-6 py-2 rounded-full text-lg font-serif hover:bg-[#aab16d] transition">
          Cara Penggunaan
        </button>

        <button className="bg-[#b8be7c] text-[#5b341f] px-6 py-2 rounded-full text-lg font-serif hover:bg-[#aab16d] transition">
          Tentang Kami
        </button>
      </div>
    </nav>
  );
}


export default Navbar;