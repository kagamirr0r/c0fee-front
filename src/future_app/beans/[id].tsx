'use client';
import type { NextPage } from 'next';
import getBean from '@/api/getBean';
import { useRouter } from 'next/router';

type Bean = {
  country: string;
  address: string;
  area: string;
  farm: string;
  variety: string;
  process: string;
  roast: string;
  roast_date: string;
  price: number;
  bean_image: { url: string };
};

const StatusPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  let errorData: any = '';
  let bean: Bean = {
    country: '',
    address: '',
    area: '',
    farm: '',
    variety: '',
    process: '',
    roast: '',
    roast_date: '',
    price: 0,
    bean_image: { url: 'string' },
  };

  if (typeof id === 'string') {
    const { data, error } = getBean(id);
    errorData = error;
    bean = data;
  }

  if (errorData) return <div>An error has occurred.</div>;
  if (!bean) return <div>Loading...</div>;

  return (
    <>
      <div className='px-6 py-4'>
        <div className='mb-2 text-xl font-bold'>{bean.country}</div>
        <li> 地域: {bean.area}</li>
        <li> 農園: {bean.farm}</li>
        <li> 品種: {bean.variety}</li>
        <li> 精製: {bean.process}</li>
        <li> 焙煎: {bean.roast}</li>
        <li> 焙煎日: {bean.roast_date}</li>
        <li> 価格: {bean.price}</li>
        <img src={bean.bean_image.url} />
      </div>
    </>
  );
};

export default StatusPage;
