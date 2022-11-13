'use client';
import type { NextPage } from 'next';
import getShops from '@/api/getShops';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/solid';

const Shops: NextPage = () => {
  const { data, error } = getShops();

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <>
      <div className='container mx-auto'>
        <div className='grid gap-10 p-10 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'>
          {data.map((shop: any) => (
            <div key={shop.id}>
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
      </div>
      <button className='fixed right-10 bottom-10 flex h-20 w-20 items-center justify-center rounded-full bg-red-500 shadow transition duration-100 hover:bg-red-700 active:shadow-lg'>
        <PlusIcon className='w-10 text-white' />
      </button>
    </>
  );
};

export default Shops;
