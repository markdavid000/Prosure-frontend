import { Text } from "@chakra-ui/react";


// hexadecimals to number
export const HexToDecimal = (hex) => parseInt(hex,16);


// Decimal Abbreviation

export const DecimalAbbr = (hex) => {
    const hexToDecimal = (hex) => parseInt(hex,16);
    const roundToOneDecimal = (number) => Math.round(number * 10)/10;


    const res = hexToDecimal(hex)/1e18;
    if(res > 999 && res < 999999){
      return `${roundToOneDecimal(res/1000)}k`;
    }
    else if(res > 999999 && res < 999999999){
      return `${roundToOneDecimal(res/1000000)}m`;
    }
    else if(res > 999999999 && res < 999999999999){
      return `${roundToOneDecimal(res/1000000000)}b`;
    }
    else if(res > 999999999999 && res < 999999999999999){
      return `${roundToOneDecimal(res/1000000000000)}t`;
    }
    else if(res > 999999999999999){
      return `${roundToOneDecimal(res/1000000000000000)}z`;
    }
    else{
      return `${roundToOneDecimal(res)}`;
    }
}

export const NumbAbbr = (num) => {
  const roundToOneDecimal = (number) => Math.round(number * 10)/10;
  if(num > 999 && num < 999999){
    return `${roundToOneDecimal(num/1000)}k`;
  }
  else if(num > 999999 && num < 999999999){
    return `${roundToOneDecimal(num/1000000)}m`;
  }
  else if(num > 999999999 && num < 999999999999){
    return `${roundToOneDecimal(num/1000000000)}b`;
  }
  else if(num > 999999999999 && num < 999999999999999){
    return `${roundToOneDecimal(num/1000000000000)}t`;
  }
  else if(num > 999999999999999){
    return `${roundToOneDecimal(num/1000000000000000)}z`;
  }
  else{
    return `${roundToOneDecimal(num)}`;
  }

}

export const GetCoverCost = (riskLevel) => {
    switch(riskLevel){
        case 0:
          return `2.5%`;
        case 1:
          return `4.5%`;
        case 2:
          return `6.5%`;
        case 3:
          return `8.5%`;
        case 4:
          return `10.5%`;
        default:
          return `2.5%`;
      }
}


export const GetRiskLevel = (riskLevel) => {
    switch(riskLevel){
      case 0:
        return <Text color='green.700' fontWeight="semibold">Very low</Text>;
      case 1:
        return <Text color='green.700' fontWeight="semibold">Low</Text>;
      case 2:
        return <Text color='yellow.700' fontWeight="semibold">Medium</Text>;
      case 3:
        return <Text color="#BA1A1A">High</Text>;
      case 4:
        return <Text color="#BA1A1A">Very high</Text>;
      default:
        return <Text color='green.700' fontWeight="semibold">Very low</Text>;
    }
  }



export const RoundToOneDecimal = (number) => Math.round(number * 10)/10;


export const RiskLevel = (percentLevel) => {
    switch(percentLevel){
      case 0:
        return 0;
      case 25:
        return 1;
      case 50:
        return 2;
      case 75:
        return 3;
      case 100:
        return 4;
      default:
        return 0
    }
}


export const GetEpoch = (months) => {
    const epochInMilli = Math.floor(Date.now()/1000);
    const inputDays = months * 30 * 24 * 60 * 60

    return epochInMilli + inputDays
}

export const ShortAddress = (address) => {
  if(address){
    return `${address.slice(0, 4)}...${address.slice(38, 42)}`
  }
}

export const leadingZero = (number, len) => {
  return String(number).padStart(len, '0');
}