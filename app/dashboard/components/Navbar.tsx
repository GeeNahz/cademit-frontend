import Image from "next/image";

const Navbar = () => {
  const user = {
    username: "",
    email: "",
    image: "",
  };

  return (
    <nav className="px-5 h-[3.75rem] w-full sticky top-0 z-50 bg-sky-200 flex items-center justify-between text-lg">
      <div className="logo w-[145px] h-[51.55px] flex items-center">
        <Image
          src="/logo.png"
          alt="CADEMit"
          height={100}
          width={200}
          className="mt-3 object-cover"
        />
      </div>

      <div className="user-profile flex gap-5 items-center">
        <p className="profile-email">myemail@example.com</p>
        <div className="profile-image bg-base-content rounded-full h-11 w-11"></div>
      </div>
    </nav>
  )
}

export default Navbar;
