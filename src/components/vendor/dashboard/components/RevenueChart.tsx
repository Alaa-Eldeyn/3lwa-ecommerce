"use client";

const RevenueChart = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Revenue Overview</h3>
        <div className="flex items-center space-x-2">
          <button className="px-3 py-1 text-sm bg-primary text-white rounded-lg">
            Weekly
          </button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
            Monthly
          </button>
          <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-lg">
            Yearly
          </button>
        </div>
      </div>
      <div className="h-64 flex items-end justify-between space-x-2">
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
          const heights = [60, 45, 75, 50, 85, 65, 70];
          return (
            <div key={day} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-primary/20 rounded-t-lg hover:bg-primary/30 transition-colors"
                style={{ height: `${heights[index]}%` }}
              ></div>
              <span className="text-xs text-gray-500 mt-2">{day}</span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
        <div>
          <p className="text-sm text-gray-500">This Week</p>
          <p className="text-xl font-bold text-gray-800">SAR 18,540</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">vs Last Week</p>
          <p className="text-sm text-green-600">+15.3%</p>
        </div>
      </div>
    </div>
  );
};

export default RevenueChart;
