const NewsLetter = () => {
  return (
    <div className="lg:translate-y-1/2 py-10 lg:pt-0">
        <div className="container">
          <div className="lg:max-w-6xl mx-auto bg-primary rounded-3xl px-8 md:px-16 py-8 flex flex-col lg:flex-row items-center justify-between gap-6">
            <h2 className="text-white text-3xl md:text-4xl font-extrabold max-w-xl text-center lg:text-left">
              STAY UPTO DATE ABOUT OUR LATEST OFFERS
            </h2>
            <div className="flex flex-col gap-3 w-full md:w-auto md:min-w-[350px]">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-12 py-3 rounded-full bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
                />
                <svg
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <button className="w-full px-8 py-3 rounded-full bg-white text-primary font-medium hover:bg-gray-100 transition">
                Subscribe to Newsletter
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}
export default NewsLetter