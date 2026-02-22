"use client";

import { Link } from "@/src/i18n/routing";
import { CURRENCY_SYMBOL, formatPrice } from "@/src/config/currency";

export function WithdrawalRequest() {
  return (
    <div className="px-8 py-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl font-bold text-gray-900">Request Withdrawal</h1>
          <div className="flex items-center space-x-3">
            <Link href="/dashboard/wallet" className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium inline-flex items-center">
              <i className="fa-solid fa-history mr-2" aria-hidden />
              Withdrawal History
            </Link>
          </div>
        </div>
        <p className="text-gray-600">Transfer your available earnings to your preferred withdrawal method.</p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Withdrawal Details</h3>
              <p className="text-sm text-gray-600">Enter the amount you wish to withdraw and select your preferred method.</p>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-r from-primary to-header rounded-lg p-4 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm opacity-90">Available Balance</div>
                    <div className="text-2xl font-bold">{formatPrice(12847.3)}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm opacity-90">Pending Balance</div>
                    <div className="text-lg font-semibold">{formatPrice(2450)}</div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Withdrawal Amount</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-lg">{CURRENCY_SYMBOL}</span>
                  </div>
                  <input type="number" className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-lg" placeholder="0.00" min={50} max={12847.3} />
                </div>
                <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                  <span>Minimum: {formatPrice(50)}</span>
                  <button type="button" className="text-primary hover:text-header font-medium">Use Maximum</button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Withdrawal Method</label>
                <div className="space-y-3">
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <input type="radio" name="withdrawal_method" value="bank" defaultChecked className="h-4 w-4 text-primary focus:ring-primary border-gray-300" />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <i className="fa-solid fa-university text-primary mr-2" aria-hidden />
                            <span className="font-medium text-gray-900">Bank Transfer</span>
                          </div>
                          <div className="text-sm text-gray-500">2-3 business days</div>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">Chase Bank ****4892</div>
                        <div className="text-xs text-green-600 mt-1">No fees</div>
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 hover:border-primary transition-colors cursor-pointer">
                    <div className="flex items-center">
                      <input type="radio" name="withdrawal_method" value="paypal" className="h-4 w-4 text-primary focus:ring-primary border-gray-300" />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <i className="fa-brands fa-paypal text-blue-600 mr-2" aria-hidden />
                            <span className="font-medium text-gray-900">PayPal</span>
                          </div>
                          <div className="text-sm text-gray-500">1-2 business days</div>
                        </div>
                        <div className="text-sm text-gray-600 mt-1">vendor@example.com</div>
                        <div className="text-xs text-amber-600 mt-1">2.9% + {formatPrice(0.3)} fee</div>
                      </div>
                    </div>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4 opacity-50 cursor-not-allowed">
                    <div className="flex items-center">
                      <input type="radio" name="withdrawal_method" value="crypto" disabled className="h-4 w-4 text-gray-300 border-gray-300" />
                      <div className="ml-3 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <i className="fa-brands fa-bitcoin text-orange-500 mr-2" aria-hidden />
                            <span className="font-medium text-gray-500">Cryptocurrency</span>
                          </div>
                          <div className="text-sm text-gray-400">Coming Soon</div>
                        </div>
                        <div className="text-sm text-gray-400 mt-1">Bitcoin, Ethereum, USDC</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center py-4 border-2 border-dashed border-gray-200 rounded-lg">
                <Link href="/dashboard/withdrawal-methods" className="text-primary hover:text-header font-medium inline-flex items-center">
                  <i className="fa-solid fa-plus mr-2" aria-hidden />
                  Add New Withdrawal Method
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Withdrawal Summary</h3>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Withdrawal Amount</span>
                <span className="font-medium">$0.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Processing Fee</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="border-t border-gray-200 pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-gray-900">Net Amount</span>
                  <span className="font-bold text-primary text-lg">$0.00</span>
                </div>
              </div>
            </div>
            <button type="button" className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-secondary transition-colors">
              Submit Withdrawal Request
            </button>
            <p className="text-xs text-gray-500 text-center mt-4">Processing typically takes 2-3 business days</p>
          </div>
        </div>
      </div>
    </div>
  );
}
