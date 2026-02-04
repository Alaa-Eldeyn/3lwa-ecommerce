"use client";

const reviews = [
  { author: "Sarah Johnson", avatar: "avatar-1.jpg", rating: 5, ratingText: "5.0", date: "Jan 18, 2026", itemTag: "Premium Wireless Headphones", itemTagClass: "bg-gray-100 text-gray-700", text: "Excellent product! The sound quality is amazing and the build quality feels premium. Delivery was fast and the packaging was perfect. Highly recommend this seller!", helpful: 12, hasReply: false },
  { author: "Michael Chen", avatar: "avatar-3.jpg", rating: 4, ratingText: "4.0", date: "Jan 17, 2026", itemTag: "Smart Watch Pro", itemTagClass: "bg-gray-100 text-gray-700", text: "Great watch with lots of features. Battery life could be better but overall very satisfied with the purchase. Seller was responsive to my questions.", helpful: 8, hasReply: true, replyText: "Thank you for your feedback! We're working on firmware updates to improve battery life. Please reach out if you need any assistance.", replyDate: "Jan 17, 2026" },
  { author: "Emma Davis", avatar: "avatar-5.jpg", rating: 5, ratingText: "5.0", date: "Jan 16, 2026", itemTag: "Vendor Review", itemTagClass: "bg-purple-100 text-purple-700", text: "This vendor is amazing! Always ships quickly, products are exactly as described, and customer service is top-notch. I've ordered multiple times and never been disappointed.", helpful: 24, hasReply: false },
  { author: "James Wilson", avatar: "avatar-8.jpg", rating: 3, ratingText: "3.0", date: "Jan 15, 2026", itemTag: "Bluetooth Speaker", itemTagClass: "bg-gray-100 text-gray-700", text: "Product is okay but not as loud as I expected. The bass is good though. Shipping took a bit longer than expected.", helpful: 3, hasReply: false, replyHighlight: true },
  { author: "Olivia Brown", avatar: "avatar-6.jpg", rating: 5, ratingText: "5.0", date: "Jan 14, 2026", itemTag: "Laptop Stand", itemTagClass: "bg-gray-100 text-gray-700", text: "Perfect laptop stand! Sturdy, well-made, and looks great on my desk. The adjustable height is very convenient. Worth every penny!", helpful: 15, hasReply: false },
];

const breakdown = [
  { stars: 5, count: 892, width: 71 },
  { stars: 4, count: 224, width: 18 },
  { stars: 3, count: 75, width: 6 },
  { stars: 2, count: 37, width: 3 },
  { stars: 1, count: 19, width: 2 },
];

function StarRating({ full }: { full: number }) {
  return (
    <>
      {[1, 2, 3, 4, 5].map((i) => (
        i <= full
          ? <i key={i} className="fa-solid fa-star text-yellow-400 text-xs ml-0.5 first:ml-0" aria-hidden />
          : <i key={i} className="fa-regular fa-star text-gray-300 text-xs ml-0.5" aria-hidden />
      ))}
    </>
  );
}

export function VendorReviews() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Reviews &amp; Ratings</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input type="text" placeholder="Search reviews..." className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary" aria-label="Search reviews" />
              <i className="fa-solid fa-search absolute left-3 top-3 text-gray-400 text-sm" aria-hidden />
            </div>
            <button type="button" className="relative p-2 text-gray-600 hover:text-gray-800" aria-label="Notifications">
              <i className="fa-regular fa-bell text-xl" aria-hidden />
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
            </button>
            <button type="button" className="p-2 text-gray-600 hover:text-gray-800" aria-label="Help">
              <i className="fa-regular fa-question-circle text-xl" aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto bg-gray-50 p-8">
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-star text-yellow-500 text-xl" aria-hidden />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Average Rating</h3>
            <p className="text-3xl font-bold text-gray-800">4.7</p>
            <div className="flex items-center mt-2">
              <StarRating full={5} />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-comment text-primary text-xl" aria-hidden />
              </div>
              <span className="text-green-500 text-sm font-medium flex items-center">
                <i className="fa-solid fa-arrow-up text-xs mr-1" aria-hidden />15%
              </span>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Total Reviews</h3>
            <p className="text-2xl font-bold text-gray-800">1,247</p>
            <p className="text-xs text-gray-400 mt-2">vs last month</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-trophy text-purple-600 text-xl" aria-hidden />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">5-Star Reviews</h3>
            <p className="text-2xl font-bold text-gray-800">892</p>
            <p className="text-xs text-gray-400 mt-2">71% of total</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i className="fa-solid fa-clock text-blue-600 text-xl" aria-hidden />
              </div>
            </div>
            <h3 className="text-gray-500 text-sm mb-1">Response Rate</h3>
            <p className="text-2xl font-bold text-gray-800">94%</p>
            <p className="text-xs text-gray-400 mt-2">avg 2.3 hours</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Rating Breakdown</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {breakdown.map((b) => (
                <div key={b.stars} className="flex items-center">
                  <div className="flex items-center w-24">
                    <span className="text-sm font-medium text-gray-700 mr-2">{b.stars} stars</span>
                    <i className="fa-solid fa-star text-yellow-400 text-xs" aria-hidden />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${b.stars === 1 ? "bg-red-400" : "bg-yellow-400"}`}
                        style={{ width: `${b.width}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-700 w-16 text-right">{b.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <button type="button" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">All Reviews</button>
              <button type="button" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">Item Reviews</button>
              <button type="button" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200">Vendor Reviews</button>
            </div>
            <div className="flex items-center gap-3">
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary" aria-label="Rating">
                <option>All Ratings</option>
                <option>5 Stars</option>
                <option>4 Stars</option>
                <option>3 Stars</option>
                <option>2 Stars</option>
                <option>1 Star</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-primary" aria-label="Sort">
                <option>Most Recent</option>
                <option>Highest Rated</option>
                <option>Lowest Rated</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {reviews.map((r) => (
            <div key={`${r.author}-${r.date}`} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start">
                  <img src="/placeholder-avatar.png" alt="" className="w-12 h-12 rounded-full object-cover" />
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">{r.author}</h4>
                    <div className="flex items-center mt-1">
                      <StarRating full={r.rating} />
                      <span className="ml-2 text-xs text-gray-500">{r.ratingText}</span>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{r.date}</span>
              </div>
              <div className="mb-3">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${r.itemTagClass}`}>{r.itemTag}</span>
              </div>
              <p className="text-gray-700 text-sm mb-4">{r.text}</p>
              {r.hasReply && (
                <div className="bg-accent/50 border-l-4 border-primary p-4 rounded mb-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-3 shrink-0">
                      <i className="fa-solid fa-store text-white text-xs" aria-hidden />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800 mb-1">Ahmed Store replied:</p>
                      <p className="text-sm text-gray-700">{r.replyText}</p>
                      <span className="text-xs text-gray-500 mt-1 inline-block">{r.replyDate}</span>
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-4">
                <button type="button" className={`flex items-center text-sm ${r.replyHighlight ? "text-primary font-medium" : "text-gray-500 hover:text-primary"}`}>
                  <i className="fa-regular fa-thumbs-up mr-1.5" aria-hidden /><span>Helpful ({r.helpful})</span>
                </button>
                <button type="button" className="flex items-center text-gray-500 hover:text-primary text-sm">
                  <i className="fa-regular fa-comment mr-1.5" aria-hidden /><span>Reply</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center mt-8 gap-2">
          <button type="button" className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled aria-label="Previous">
            <i className="fa-solid fa-chevron-left" aria-hidden />
          </button>
          <button type="button" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium">1</button>
          <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">2</button>
          <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">3</button>
          <button type="button" className="px-3 py-2 text-gray-500 text-sm">...</button>
          <button type="button" className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">12</button>
          <button type="button" className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50">
            <i className="fa-solid fa-chevron-right" aria-hidden />
          </button>
        </div>
      </main>
    </div>
  );
}
