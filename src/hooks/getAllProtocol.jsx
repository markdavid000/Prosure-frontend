import { useContractRead } from 'wagmi';
import { prosureSetup } from '../constants/interactionSetup';

export const GetProtocol = id => {
  const { data } = useContractRead({
    ...prosureSetup,
    functionName: 'getProtocolData',
    args: [id],
  });
  console.log('ptotocols: ', data);

  return { data };
};
