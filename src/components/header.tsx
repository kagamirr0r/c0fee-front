import Link from 'next/link';

const header = () => {
  return (
    <header>
      <nav className='grid grid-cols-5 bg-red-500 p-5 font-bold text-white'>
        <div>
          <Link href='/'>
            <a className='brand-logo'>C0FEE</a>
          </Link>
        </div>
        <div className='text-center'>
          <Link href='/shops'>ロースター</Link>
        </div>
        <div className='text-center'>
          <Link href='/beans'>コーヒー豆</Link>
        </div>
        <div className='text-center'>
          <Link href='/recipes'>レシピ</Link>
        </div>
        <div className='text-center'>
          <Link href='/profile'>プロフィール</Link>
        </div>
      </nav>
    </header>
  );
};

export default header;
