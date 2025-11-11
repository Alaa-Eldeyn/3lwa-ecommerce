import Image from "next/image"
import Link from "next/link"

const Hero = () => {
  return (
     <section className="bg-gray-50 dark:bg-gray-800/80 pt-32 lg:pt-16">
      <div className="container grid lg:gap-8 xl:gap-0 lg:grid-cols-12">

        {/* Text section */}
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-zinc-900 dark:text-white">
            Designed to elevate your brand
          </h1>

          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            Build faster. Grow smarter. A platform that takes your product from idea to impact.
          </p>

          <div className="flex gap-4 flex-wrap">
            <Link
              href="#"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium 
                text-white rounded-lg bg-secondary hover:bg-secondary/80 
                dark:text-white dark:border-gray-700 dark:focus:ring-gray-800"
            >
              View Products
            </Link>

            <Link
              href="#"
              className="inline-flex group items-center justify-center px-5 py-3 text-base font-medium 
                text-secondary dark:text-white rounded-lg bg-primary-700 hover:bg-primary-800 
                focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Get Contact
              <svg
                className="w-5 h-5 ml-2 -mr-1 soft group-hover:translate-x-1 transition"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
          </div>
        </div>

        {/* Image section */}
        <div className="flex justify-center lg:mt-0 lg:col-span-5">
          <div className="relative w-full max-w-[400px] aspect-3/4">
            <Image
              src="/iphone.png"
              alt="mockup"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 300px, (max-width: 1024px) 400px, 500px"
            />
          </div>
        </div>

      </div>
    </section>
  )
}
export default Hero