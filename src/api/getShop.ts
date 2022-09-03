import useSWR from 'swr';
import getFetcher from './fetchers/getFetcher';

const getShop = (id: string) => {
  // MICROCMSの場合
  // const config = {
  //   headers: {
  //     // 'X-MICROCMS-API-KEY': `${process.env.NEXT_PUBLIC_MICROCMS_KEY}`,
  //   },
  // };
  // const { data, error } = useSWR('https://c0fee.microcms.io/api/v1/shops', getFetcher);

  const baseURI = process.env.NEXT_PUBLIC_BASE_URL;
  return useSWR(`${baseURI}/shops/${id}`, getFetcher);
};

export default getShop;
