import { SlLocationPin } from "react-icons/sl";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { FaRegCheckCircle } from "react-icons/fa";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

export default function HowToUsePage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="mt-35 flex-1 px-5 pb-2">
        <h1 className="mb-10 text-center font-[Poppins] text-[1.8rem] font-semibold text-[#5b341f]">
          Cara Penggunaan
        </h1>

        <div
          className="mx-auto flex w-[80%] items-center justify-center rounded-2xl bg-[#E7E6C280] p-8 max-md:flex-col max-md:gap-6"
        >
          <div className="flex-1 pt-8 text-center">
            <h3 className="mb-10 font-[Poppins] text-[1.4rem] font-semibold text-[#5b341f]">
              Langkah 1
            </h3>

            <p className="mb-10 flex h-[60px] items-center justify-center font-[Poppins] text-[1.3rem] text-[#5b341f]">
              Arahkan ke lokasi
              <br />
              yang diinginkan
            </p>

            <SlLocationPin className="mx-auto text-[3.3rem] text-[#5b341f] transition hover:animate-bounce hover:text-[#173c5c]" />
          </div>

          <div className="h-[330px] w-[1px] bg-[#112244] max-md:h-[1px] max-md:w-[80%]"></div>

          <div className="flex-1 pt-8 text-center">
            <h3 className="mb-10 font-[Poppins] text-[1.4rem] font-semibold text-[#5b341f]">
              Langkah 2
            </h3>

            <p className="mb-10 flex h-[60px] items-center justify-center font-[Poppins] text-[1.3rem] text-[#5b341f]">
              Klik Kabupaten/Kota
            </p>

            <HiOutlineDocumentSearch className="mx-auto text-[3.3rem] text-[#5b341f] transition hover:animate-bounce hover:text-[#173c5c]" />
          </div>

          <div className="h-[330px] w-[1px] bg-[#112244] max-md:h-[1px] max-md:w-[80%]"></div>

          <div className="flex-1 pt-8 text-center">
            <h3 className="mb-10 font-[Poppins] text-[1.4rem] font-semibold text-[#5b341f]">
              Langkah 3
            </h3>

            <p className="mb-10 flex h-[60px] items-center justify-center font-[Poppins] text-[1.3rem] text-[#5b341f]">
              Dapatkan detail hasil
            </p>

            <FaRegCheckCircle className="mx-auto text-[3.3rem] text-[#5b341f] transition hover:animate-bounce hover:text-[#173c5c]" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}