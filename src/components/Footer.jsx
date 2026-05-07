function Footer() {
    return (
        <footer className="mt-10 bg-[#B7C68833] p-[20px]">
            <p className="text-center font-['Poppins'] text-[0.9rem] text-[#5b341f] font-bold">
                &copy; {new Date().getFullYear()} PovertyLense. All rights reserved.
            </p>
        </footer>
    );
}

export default Footer;