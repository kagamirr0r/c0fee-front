import type { NextPage } from 'next';
import getBeans from '@/api/getBeans';
import Link from 'next/link';

const Beans: NextPage = () => {
  const { data, error } = getBeans();

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className='grid gap-10 p-10 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'>
      {data.map((bean: any) => (
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
  );
};

export default Beans;
