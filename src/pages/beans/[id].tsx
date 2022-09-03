import type { NextPage } from 'next';
import getBean from '@/api/getBean';
import { useRouter } from 'next/router';

const StatusPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = getBean(id);

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <>
      <div className='px-6 py-4'>
        <div className='mb-2 text-xl font-bold'>{data.country}</div>
        <li> 地域: {data.area}</li>
        <li> 農園: {data.farm}</li>
        <li> 品種: {data.variety}</li>
        <li> 精製: {data.process}</li>
        <li> 焙煎: {data.roast}</li>
        <li> 焙煎日: {data.roast_date}</li>
        <li> 価格: {data.price}</li>
        <img src={data.bean_image.url} />
      </div>
    </>
  );
};

export default StatusPage;
