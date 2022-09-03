import type { NextPage } from 'next';
import getShops from '@/api/getShops';
import Link from 'next/link';

const Shops: NextPage = () => {
  const { data, error } = getShops();

  console.log(data);
  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <div className='grid gap-10 p-10 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'>
      {data.map((shop: any) => (
        <div key={shop.id}>
          {/* <div>shop id: {shop.id}</div> */}
          {/* <ul key={shop.id}>
            <li> 名前: {shop.name}</li>
            <li> url: {shop.url}</li>
            <li> 住所: {shop.address}</li>
            <li> latitude: {shop.latitude}</li>
            <li> longitude{shop.longitude}</li>
            <img src={shop.shop_image.url} />
          </ul> */}
          <div className='max-w-sm overflow-hidden rounded shadow-lg'>
            <Link href={`/shops/${shop.id}`}>
              <img src={shop.shop_image.url} alt={shop.name} />
            </Link>

            <div className='px-6 py-4'>
              <div className='mb-2 text-xl font-bold'>{shop.name}</div>
              <p className='text-base text-gray-700'>{shop.address}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shops;
