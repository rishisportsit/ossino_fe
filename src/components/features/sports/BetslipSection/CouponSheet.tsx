import { useState } from 'react';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle } from 'components/shared/ui/Sheet';
import ArrowRight2Icon from 'assets/icons/ArrowRight2';
import { cn } from 'helpers/ui';

interface Coupon {
  id: string;
  code: string;
  expiryDate: string;
  minDeposit: number;
  numberOfLegs: number;
  description?: string;
  terms?: string[];
}

interface CouponSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyCoupon: (couponId: string) => void;
  onRemoveCoupon: () => void;
  appliedCouponId: string | null;
  coupons: Coupon[];
}

const CouponSheet = ({ 
  open, 
  onOpenChange, 
  onApplyCoupon, 
  onRemoveCoupon,
  appliedCouponId,
  coupons 
}: CouponSheetProps) => {
  const [expandedCoupon, setExpandedCoupon] = useState<string | null>(null);

  const toggleExpanded = (couponId: string) => {
    setExpandedCoupon(expandedCoupon === couponId ? null : couponId);
  };

  const handleApplyClick = (couponId: string) => {
    if (appliedCouponId === couponId) {
      onRemoveCoupon();
    } else {
      onApplyCoupon(couponId);
      onOpenChange(false); // Close sheet after applying
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="z-[999] !max-w-[500px] w-full">
        <SheetTitle hidden />
        <SheetDescription hidden />
        
        {/* Header */}
        <div className="mb-6 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <SheetClose className="w-8 h-8 border border-base-700 rounded-lg flex items-center justify-center hover:bg-base-800 transition-colors">
              <span className="sr-only">Close</span>
              <ArrowRight2Icon />
            </SheetClose>
            <div className="bg-base-800 px-4 h-8 flex items-center justify-center rounded-lg">
              <span className="font-medium text-primary-2 text-sm">Select Coupon</span>
            </div>
          </div>
        </div>

        {/* Coupons List */}
        <div className="flex flex-col gap-4">
          {coupons.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-base-400 text-sm">No coupons available</p>
            </div>
          ) : (
            coupons.map((coupon) => (
              <div
                key={coupon.id}
                className={cn(
                  "bg-base-800 rounded-xl p-4 border transition-colors",
                  appliedCouponId === coupon.id 
                    ? "border-primary-1" 
                    : "border-base-700"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    {/* Coupon Code */}
                    <h3 className="text-primary-1 font-bold text-lg mb-1">
                      {coupon.code}
                    </h3>
                    
                    {/* Expiry Date */}
                    <p className="text-base-400 text-xs mb-3">
                      Expires: {coupon.expiryDate}
                    </p>
                    
                    {/* Details */}
                    <ul className="space-y-1 mb-3">
                      <li className="text-base-300 text-xs flex items-start gap-1.5">
                        <span className="text-base-400">•</span>
                        <span>Minimum Deposit amount: TZS {coupon.minDeposit.toLocaleString()}</span>
                      </li>
                      <li className="text-base-300 text-xs flex items-start gap-1.5">
                        <span className="text-base-400">•</span>
                        <span>Number of legs: {coupon.numberOfLegs}</span>
                      </li>
                    </ul>

                    {/* More Button */}
                    {coupon.terms && coupon.terms.length > 0 && (
                      <>
                        <button
                          onClick={() => toggleExpanded(coupon.id)}
                          className="text-base-300 text-xs font-medium hover:text-base-200 transition-colors flex items-center gap-1"
                        >
                          <span className="text-primary-1">+</span> MORE
                        </button>

                        {/* Expanded Terms */}
                        {expandedCoupon === coupon.id && (
                          <div className="mt-3 pt-3 border-t border-base-700">
                            <ul className="space-y-1.5">
                              {coupon.terms.map((term, idx) => (
                                <li key={idx} className="text-base-400 text-xs flex items-start gap-1.5">
                                  <span className="text-base-500">•</span>
                                  <span>{term}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  {/* Apply/Remove Button */}
                  <button
                    onClick={() => handleApplyClick(coupon.id)}
                    className={cn(
                      "px-5 py-2 rounded-lg text-sm font-semibold transition-all shrink-0",
                      appliedCouponId === coupon.id
                        ? "bg-red-600 hover:bg-red-700 text-white"
                        : "bg-button-gradient btn-textColor hover:opacity-90"
                    )}
                  >
                    {appliedCouponId === coupon.id ? 'Remove' : 'Apply'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CouponSheet;
