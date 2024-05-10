import { useContractRead } from 'wagmi';
import { prosureSetup } from '../constants/interactionSetup';

export const GetCalculatedCover = (riskLevel, coverPeriod, coverAmount) => {
  const { data } = useContractRead({
    ...prosureSetup,
    functionName: 'calculateCover',
    args: [riskLevel, coverPeriod, coverAmount],
  });

  return { data };
};
