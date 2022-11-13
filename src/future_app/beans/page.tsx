'use client';
// import getBeans from '@/api/getBeans';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/solid';

const Beans = (beans: any) => {
  // const { data, error } = getBeans();

  // if (error) return <div>An error has occurred.</div>;
  // if (!data) return <div>Loading...</div>;
  return (
    <>
      <div className='container mx-auto'>
        <div className='grid gap-10 p-10 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'>
          {beans.map((bean: any) => (
            <div key={bean.id}>
              <div className='max-w-sm overflow-hidden rounded shadow-lg'>
                <Link href={`/beans/${bean.id}`}>
                  <img src={bean.bean_image.url} alt={bean.country} />
                </Link>
                <div className='px-6 py-4'>
                  <div className='mb-2 text-xl font-bold'>{bean.country}</div>
                  <p className='text-base text-gray-700'>{bean.address}</p>
                  <span>{bean.area}</span>
                  <span>{bean.farm}</span>
                  <p>{bean.roast}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link href='/beans/form'>
          <button className='fixed right-10 bottom-10 flex h-20 w-20 items-center justify-center rounded-full bg-red-500 transition duration-100 hover:bg-red-700 active:shadow-lg'>
            <PlusIcon className='w-10 text-white' />
          </button>
        </Link>
      </div>
    </>
  );
};

export default Beans;
