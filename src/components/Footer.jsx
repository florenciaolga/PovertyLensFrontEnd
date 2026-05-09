import {
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaGlobe,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-[#B7C68833] mt-16 font-[Poppins] text-[#5b341f]">

      <div
        className="max-w-[1200px] mx-auto px-8 py-10 flex justify-between flex-wrap gap-12"
      >
        <div className="max-w-[300px]">
          <h1 className="text-[2rem] font-bold mb-4">
            PovertyLens
          </h1>

          <p className="text-[1rem] leading-7">
            PovertyLens adalah website yang 
            membantu pengguna mengeksplorasi informasi 
            terkait kemiskinan melalui peta dan detail 
            wilayah dengan cara yang sederhana dan mudah diakses.
          </p>
        </div>

        <div>
          <h2 className="text-[1.5rem] font-semibold mb-4">
            Halaman
          </h2>

          <div className="flex flex-col gap-3 text-[1rem]">

            <Link
              to="/"
              className="hover:translate-x-1 transition"
            >
              Home
            </Link>

            <Link
              to="/how-to-use"
              className="hover:translate-x-1 transition"
            >
              Cara Penggunaan
            </Link>

            <Link
              to="/about-us"
              className="hover:translate-x-1 transition"
            >
              Tentang Kami
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-[1.5rem] font-semibold mb-4">
            Contact
          </h2>

          <div className="flex flex-col gap-4 text-[1rem]">
            
            <div className="flex items-center gap-3">
              <FaGlobe className="text-[1.3rem]" />
              <span>www.povertylens.com</span>
            </div>

            <div className="flex items-center gap-3">
              <MdEmail className="text-[1.5rem]" />
              <span>povertylens@gmail.com</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-[1.5rem] font-semibold mb-4">
            Follow Us
          </h2>

          <div className="flex flex-col gap-4 text-[1rem]">

            <div className="flex items-center gap-3">
              <FaInstagram className="text-[1.7rem]" />
              <span>@povertylens</span>
            </div>

            <div className="flex items-center gap-3">
              <FaTwitter className="text-[1.7rem]" />
              <span>@povertylens</span>
            </div>

            <div className="flex items-center gap-3">
              <FaFacebook className="text-[1.7rem]" />
              <span>@povertylensofficial</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#5b341f]/20 py-4">
        <p className="text-center text-[0.9rem] font-bold">
          &copy; {new Date().getFullYear()} PovertyLens. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;