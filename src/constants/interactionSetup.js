import prosureAbi from '../abi/prosureAbi.json';
import governanceAbi from '../abi/governanceAbi.json';
import ERC20 from '../abi/ERC20Abi.json';

// Deployed Contract Addresses

export const mUSDT = '0x934932752EDDeb6150e412E04D747bd974164A7d';

export const prosureContract = '0xFCB01529892bF14daCf90cc4B00184133cB07339';

export const governanceContract = '0x054aC154CF6c757697B290fB7A824B6aC2262F82';

export const prosureSetup = {
  address: prosureContract,
  abi: prosureAbi,
};

export const governanceSetup = {
  address: governanceContract,
  abi: governanceAbi,
};

export const erc20Setup = {
  address: mUSDT,
  abi: ERC20,
};
