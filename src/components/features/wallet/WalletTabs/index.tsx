import { TabsContent } from "@radix-ui/react-tabs";
import { Tabs, TabsList, TabsTrigger } from "components/shared/ui/Tabs";
import type { WalletTab } from "store/transactions/mockData/wallet/types";
import { walletCategories } from "./mockCategories";

export type WalletTabsProps = {
  currentTab: WalletTab;
  dialogData?: {
    tab: WalletTab;
    fromRegistration?: boolean;
    selectedBonus?: any;
  };
}

const WalletTabs = ({ currentTab, dialogData }: WalletTabsProps) => {
  return (
    <Tabs defaultValue={currentTab} >
      <TabsList className='border-base-600 mb-5'>
        {
          walletCategories.map((category) => (
            <TabsTrigger className="flex items-center justify-center w-32 font-medium text-[16px] leading-[22px]" value={category.type}>
              {category.title}
            </TabsTrigger>
          ))
        }
      </TabsList>
      
      {walletCategories.map((category) => (
        <TabsContent value={category.type}>
          {category.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}

export default WalletTabs