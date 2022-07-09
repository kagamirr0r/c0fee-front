import type { NextPage } from 'next';
import useSWR from 'swr';
import axios from 'axios';

const Beans: NextPage = () => {
  const config = {
    headers: {
      'X-MICROCMS-API-KEY': `${process.env.NEXT_PUBLIC_MICROCMS_KEY}`,
    },
  };
  const getFetcher = (url: string) => axios.get(url, config).then((res) => res.data);
  const { data, error } = useSWR('https://c0fee.microcms.io/api/v1/beans', getFetcher);

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      {data.contents.map((bean: any) => (
        <>
          <div>bean id: {bean.id}</div>
          <ul key={bean.id}>
            <li> 生産国: {bean.country}</li>
            <li> 地域: {bean.area}</li>
            <li> 農園: {bean.farm}</li>
            <li> 焙煎: {bean.roast[0]}</li>
            <li> 焙煎日{bean.roast_date}</li>
            <img src={bean.image.url} />
          </ul>
        </>
      ))}
    </>
  );
};

// Beans.getInitialProps = async () => {
//   const config = {
//     headers: {
//       'X-MICROCMS-API-KEY': '23253550226d4c27a56b2592dbd17124113c',
//     },
//   };
//   const getFetcher = (url: string) => axios.get(url, config).then((res) => res.data);
//   const { data, error } = useSWR('https://c0fee.microcms.io/api/v1/beans', getFetcher);
//   return { beans: data };
// };

export default Beans;
