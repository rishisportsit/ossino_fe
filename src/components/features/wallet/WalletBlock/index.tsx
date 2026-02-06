import { BREAKPOINTS, useBreakpoint } from "helpers/hooks"
import WalletDrawer from "../WalletDrawer"
import WalletSheet from "../WalletSheet";

const WalletBlock = () => {
  const { screenWidth } = useBreakpoint();

  if (screenWidth >= BREAKPOINTS.md) {
    return <WalletSheet />
  }

  return <WalletDrawer />
}

export default WalletBlock