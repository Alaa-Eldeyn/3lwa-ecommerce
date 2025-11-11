import Link from "next/link"

const Logo = () => {
  return (
    <Link
      href={"/"}
      className={`relative block font-extrabold text-secondary text-4xl tracking-wide focus:outline-none`}
      aria-label="Go to homepage"
    >
      Alwa.Dev
    </Link>
  )
}
export default Logo