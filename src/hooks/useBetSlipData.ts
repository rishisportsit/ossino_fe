import { useState, useEffect } from 'react';

export const useBetSlipData = () => {
    const [betSlipDataLocal, setBetSlipDataLocal] = useState<any[]>([]);

    useEffect(() => {
        const storedSlip = localStorage.getItem("betSlipData");
        setBetSlipDataLocal(storedSlip ? JSON.parse(storedSlip) : []);

        const handleBetSlipUpdate = () => {
            const storedSelections = localStorage.getItem("betSlipData");
            setBetSlipDataLocal(storedSelections ? JSON.parse(storedSelections) : []);
        };

        const handleBetSlipRemoveUpdate = () => {
            const storedSelections = localStorage.getItem("betSlipData");
            setBetSlipDataLocal(storedSelections ? JSON.parse(storedSelections) : []);
        };

        window.addEventListener("betSlip_updated", handleBetSlipUpdate);
        window.addEventListener("betSlip_removing_updated", handleBetSlipRemoveUpdate);

        return () => {
            window.removeEventListener("betSlip_updated", handleBetSlipUpdate);
            window.removeEventListener("betSlip_removing_updated", handleBetSlipRemoveUpdate);
        };
    }, []);

    return {
        betSlipData: betSlipDataLocal,
        betSlipCount: betSlipDataLocal.length,
    };
};