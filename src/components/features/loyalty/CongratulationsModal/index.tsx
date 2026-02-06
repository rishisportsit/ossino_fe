import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from 'components/shared/ui/Dialog';
import { Button } from 'components/shared/ui/Button';

interface Props {
    isOpen: boolean;
    amount: number;
    rewardType: string;
    onClose: () => void;
}

const CongratulationsModal = ({ isOpen, amount, rewardType, onClose }: Props) => {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="congratulations-modal" variant="success">
                <DialogHeader>
                    <div className="celebration-icon text-4xl mb-4">🎉</div>
                    <DialogTitle className="text-2xl font-bold text-neon-1 mb-4">
                        Congratulations!
                    </DialogTitle>
                    <DialogDescription className="text-lg mb-6 text-white">
                        You've earned <span className="font-bold text-green-500">{amount}</span> loyalty coins
                        {rewardType === 'daily_reward' && ' from your daily reward!'}
                    </DialogDescription>
                </DialogHeader>
                <Button
                    variant="default"
                    onClick={onClose}
                    className="bg-neon-1 text-black hover:bg-neon-1/90 w-full"
                >
                    Awesome!
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default CongratulationsModal;
