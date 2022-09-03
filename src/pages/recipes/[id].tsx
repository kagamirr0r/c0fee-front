import type { NextPage } from 'next';
import getRecipe from '@/api/getRecipe';
import { useRouter } from 'next/router';

const StatusPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = getRecipe(id);

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <>
      <div className='mb-2 text-xl font-bold'>{data.name}</div>
      <li> {data.hot_ice}</li>
      <li> 挽き方: {data.grind}</li>
      <li> 湯温: {data.temperature} ℃</li>
      <li> 豆の量: {data.bean_amount}</li>
      <li> 抽出量{data.extracted_amount}</li>
      <li> 抽出方法{data.extraction}</li>
      <img src={data.recipe_image.url} />
    </>
  );
};

export default StatusPage;
