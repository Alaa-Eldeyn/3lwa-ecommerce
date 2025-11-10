import { cookies } from "next/headers"
import NavLinks from "./NavLinks"
import HeaderActions from "./HeaderActions"
import Logo from "../common/Logo"

const Header = async () => {
  const cookieStore = await cookies()

  const user = cookieStore.get("userToken")
  const isLoggedIn = Boolean(user)

  return (
    <header className="text-primary dark:text-white w-full shadow-md fixed top-0 z-50 bg-white dark:bg-gray-900">
      <div className="container min-h-20 flex items-center justify-between">
        
        {/* Logo */}
        <Logo />

        {/* Desktop Links */}
        <NavLinks />

        {/* Actions (Client) */}
        <HeaderActions isLoggedIn={isLoggedIn} />

      </div>
    </header>
  )
}

export default  Header
