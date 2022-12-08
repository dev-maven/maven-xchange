export interface ConvertedCurrency {
  info: infoObject;
  query: queryObject;
  result: number;
  success: boolean;
}

interface infoObject {
  quote: number;
  timeStamp: number;
}

interface queryObject {
  amount: number;
  from: string;
  to: string;
}
