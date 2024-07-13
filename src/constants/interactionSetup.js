import prosureAbi from '../abi/prosureAbi.json';
import governanceAbi from '../abi/governanceAbi.json';
import ERC20 from '../abi/ERC20Abi.json';

// Deployed Contract Addresses

export const mUSDT = '0x428B2A32171157C9A67b5e5283fd00Ca42fd54FE';

export const prosureContract = '0x1A26f543e0c7E478C7D998109c0ACf7dB1827a6d';

export const governanceContract = '0xFeCe593B6eB317f4fD94804264742b092B4566c6';

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
