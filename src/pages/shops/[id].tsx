import type { NextPage } from 'next';
import getShop from '@/api/getShop';
import { useRouter } from 'next/router';

const StatusPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = getShop(id);

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <>
      <div className='mb-2 text-xl font-bold'>{data.name}</div>
      <li> 住所: {data.address}</li>
      <li> URL: {data.url}</li>
      <img src={data.shop_image.url} />
    </>
  );
};

export default StatusPage;
