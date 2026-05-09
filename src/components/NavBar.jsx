import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full h-[90px] flex items-center justify-between px-12 bg-[#B7C68833]">

      <NavLink
        to="/"
        className="text-[38px] font-serif text-[#5b341f]"
      >
        PovertyLens
      </NavLink>

      <div className="flex gap-4">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `
            px-6 py-2 rounded-full text-lg font-serif transition
            ${
              isActive
                ? "bg-[#aab16d] text-[#5b341f] underline underline-offset-4"
                : "bg-[#b8be7c] text-[#5b341f] hover:bg-[#aab16d]"
            }
            `
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/how-to-use"
          className={({ isActive }) =>
            `
            px-6 py-2 rounded-full text-lg font-serif transition
            ${
              isActive
                ? "bg-[#aab16d] text-[#5b341f] underline underline-offset-4"
                : "bg-[#b8be7c] text-[#5b341f] hover:bg-[#aab16d]"
            }
            `
          }
        >
          Cara Penggunaan
        </NavLink>

        <NavLink
          to="/about-us"
          className={({ isActive }) =>
            `
            px-6 py-2 rounded-full text-lg font-serif transition
            ${
              isActive
                ? "bg-[#aab16d] text-[#5b341f] underline underline-offset-4"
                : "bg-[#b8be7c] text-[#5b341f] hover:bg-[#aab16d]"
            }
            `
          }
        >
          Tentang Kami
        </NavLink>

      </div>
    </nav>
  );
}

export default Navbar;