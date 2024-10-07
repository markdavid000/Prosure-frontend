import prosureAbi from '../abi/prosureAbi.json';
import governanceAbi from '../abi/governanceAbi.json';
import ERC20 from '../abi/ERC20Abi.json';

// Deployed Contract Addresses

export const mUSDT = '0x1F8ba6Ddc2D5086f13Df5b0AbB8833E6db6F71F6';

export const prosureContract = '0x54210cA1471b1064df6C525B5980a68361E5129e';

export const governanceContract = '0xC8fBEB1f56c7201E134F4870b0D3D03ce1497C68';

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
