import type { NextPage } from 'next';
import getShop from '@/api/getShop';
import { useRouter } from 'next/router';

type Shop = {
  name: string;
  url: string;
  address: string;
  shop_image: { url: string };
};

const StatusPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  let errorData: any = '';
  let shop: Shop = {
    name: '',
    url: '',
    address: '',
    shop_image: { url: '' },
  };

  if (typeof id === 'string') {
    const { data, error } = getShop(id);
    errorData = error;
    shop = data;
  }

  if (errorData) return <div>An error has occurred.</div>;
  if (!shop) return <div>Loading...</div>;
  return (
    <>
      <div className='mb-2 text-xl font-bold'>{shop.name}</div>
      <li> 住所: {shop.address}</li>
      <li> URL: {shop.url}</li>
      <img src={shop.shop_image.url} />
    </>
  );
};

export default StatusPage;
