import Image from "next/image"

const TopBanner = () => {
  return (
    <div className=" bg-gray-300 max-h-96 aspect-9/2 w-full center relative overflow-hidden ">
        <Image fill src="/images/banners/banner-a.gif" alt="top banner" className="object-cover w-full h-full" />
    </div>
  )
}
export default TopBanner