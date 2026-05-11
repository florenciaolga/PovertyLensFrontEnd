import Navbar from "../components/NavBar";
import Footer from "../components/Footer";

import aboutus from "../assets/aboutus.png";
import felicia from "../assets/felicia.jpeg";
import olga from "../assets/olga.jpeg";
import michelle from "../assets/michelle.jpeg";
import jason from "../assets/jason.jpeg";

function AboutUsPage() {
  return (
    <div className="flex min-h-screen flex-col font-[Poppins] text-[#333]">
      <Navbar />

      <div className="relative h-[300px] w-full overflow-hidden bg-[#0B2447]">
        <img
          src={aboutus}
          alt="About Us Banner"
          className="block h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-white/50 z-[1]" />

        <h1
          className="absolute left-1/2 top-1/2 z-[2] -translate-x-1/2 -translate-y-1/2 text-[48px] font-extrabold text-[#5b341f] max-md:text-[2rem] max-sm:text-[2.2rem] max-[400px]:text-[1rem]"
        >
          TENTANG KAMI
        </h1>
      </div>

      <div
        className="flex-1 px-[70px] py-16 max-lg:px-10 max-md:px-6 max-sm:px-5"
      >
        <div
          className="grid grid-cols-2 gap-14 items-start max-lg:grid-cols-1"
        >
          <div className="pr-10 border-r border-[#c7b9a7] max-lg:border-r-0 max-lg:pr-0">
            <h2 className="text-[2rem] font-semibold mb-6 text-[#5b341f]">
              Tentang PovertyLens
            </h2>

            <p
              className="text-[1.05rem] leading-9 text-[#5b341f] text-justify"
            >
              PovertyLens adalah website yang dirancang untuk
              membantu pengguna memahami informasi terkait kemiskinan melalui
              visualisasi peta dan detail data wilayah secara sederhana dan
              mudah diakses. Dengan memanfaatkan tampilan geografis dan
              informasi regional, PovertyLens memungkinkan pengguna untuk
              mengeksplorasi kondisi kemiskinan di berbagai daerah secara lebih
              informatif dan intuitif.
              <br />
              <br />
              Platform ini dikembangkan sebagai sarana edukasi, analisis data,
              dan peningkatan kesadaran sosial terhadap kondisi kemiskinan di
              berbagai wilayah. Kami percaya bahwa akses terhadap informasi yang
              jelas dan mudah dipahami dapat membantu masyarakat melihat kondisi
              sosial secara lebih luas dan mendalam.
            </p>
          </div>

          <div>
            <h2 className="text-[2rem] font-semibold mb-6 text-[#5b341f]">
              Mengapa Menggunakan PovertyLens?
            </h2>

            <div className="space-y-6">
              <div>
                <p className="text-[#5b341f] leading-8 text-justify">
                  1. Menampilkan data kemiskinan melalui peta interaktif sehingga
                  pengguna dapat mengeksplorasi informasi wilayah dengan lebih
                  mudah dan menarik.
                </p>
              </div>

              <div>
                <p className="text-[#5b341f] leading-8 text-justify">
                  2. Informasi disajikan secara jelas, ringkas, dan mudah dipahami
                  sehingga cocok digunakan untuk pembelajaran maupun analisis
                  data sosial.
                </p>
              </div>

              <div>
                <p className="text-[#5b341f] leading-8 text-justify">
                  3. Memiliki tampilan sederhana dan ramah pengguna sehingga dapat
                  digunakan oleh berbagai kalangan tanpa kesulitan.
                </p>
              </div>

              <div>
                <p className="text-[#5b341f] leading-8 text-justify">
                  4. Membantu pengguna memahami kondisi setiap daerah secara lebih
                  detail melalui data dan visualisasi yang terstruktur.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-28">
          <h2 className="text-center text-[2.5rem] font-bold text-[#5b341f] mb-3">
            Tim Kami
          </h2>

          <div
            className="grid grid-cols-4 gap-8 max-lg:grid-cols-2 max-sm:grid-cols-1"
          >
            <div
              className="bg-[#E7E6C280] rounded-3xl overflow-hidden shadow-sm hover:scale-[1.02] transition"
            >
              <img
                src={michelle}
                alt="Michelle Angela Pang"
                className="w-full h-[450px] object-cover"
              />

              <div className="p-5 text-center">
                <h3 className="text-[1.2rem] font-semibold text-[#5b341f]">
                  Michelle Angela Pang
                </h3>

                <p className="text-[#5b341f] mt-2">
                  Frontend Developer
                </p>
              </div>
            </div>

            <div
              className="bg-[#E7E6C280] rounded-3xl overflow-hidden shadow-sm hover:scale-[1.02] transition"
            >
              <img
                src={olga}
                alt="Florencia Olga"
                className="w-full h-[450px] object-cover"
              />

              <div className="p-5 text-center">
                <h3 className="text-[1.2rem] font-semibold text-[#5b341f]">
                  Florencia Olga
                </h3>

                <p className="text-[#5b341f] mt-2">
                  Frontend Developer
                </p>
              </div>
            </div>

            <div
              className="bg-[#E7E6C280] rounded-3xl overflow-hidden shadow-sm hover:scale-[1.02] transition"
            >
              <img
                src={felicia}
                alt="Felicia Faustine"
                className="w-full h-[450px] object-cover"
              />

              <div className="p-5 text-center">
                <h3 className="text-[1.2rem] font-semibold text-[#5b341f]">
                  Felicia Faustine Hidayat
                </h3>

                <p className="text-[#5b341f] mt-2">
                  Backend Developer
                </p>
              </div>
            </div>

            <div
              className="bg-[#E7E6C280] rounded-3xl overflow-hidden shadow-sm hover:scale-[1.02] transition"
            >
              <img
                src={jason}
                alt="Jason Timothy"
                className="w-full h-[450px] object-cover"
              />

              <div className="p-5 text-center">
                <h3 className="text-[1.2rem] font-semibold text-[#5b341f]">
                  Jason Timothy
                </h3>

                <p className="text-[#5b341f] mt-2">
                  Backend Developer
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AboutUsPage;