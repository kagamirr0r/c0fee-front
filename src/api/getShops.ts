import useSWR from 'swr';
import getFetcher from './fetchers/getFetcher';

const getShops = () => {
  // MICROCMSの場合
  // const config = {
  //   headers: {
  //     // 'X-MICROCMS-API-KEY': `${process.env.NEXT_PUBLIC_MICROCMS_KEY}`,
  //   },
  // };
  // const { data, error } = useSWR('https://c0fee.microcms.io/api/v1/shops', getFetcher);

  const baseURI = process.env.NEXT_PUBLIC_BASE_URL;
  return useSWR(`${baseURI}/shops`, getFetcher);
};

export default getShops;
