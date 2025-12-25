import Image from "next/image";
import Link from "next/link";

const Logo = ({ type }: { type?: string }) => {
  return (
    <Link
      href={"/"}
      className={`relative block font-extrabold text-secondary dark:text-white text-4xl tracking-wide focus:outline-none`}
      aria-label="Go to homepage"
    >
      {type === "dark" ? (
        <Image
          src="/images/logo/logo.png"
          alt="Alwa.Dev Logo"
          width={120}
          height={30}
        />
      ) : (
        <Image
          src="/images/logo/logogt.png"
          alt="Alwa.Dev Logo"
          width={120}
          height={30}
        />
      )}
    </Link>
  );
};
export default Logo;
