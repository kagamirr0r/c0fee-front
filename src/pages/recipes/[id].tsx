import type { NextPage } from 'next';
import getRecipe from '@/api/getRecipe';
import { useRouter } from 'next/router';

type Recipe = {
  hot_ice: string;
  grind: string;
  temperature: number;
  bean_amount: number;
  extracted_amount: number;
  extraction: string;
  recipe_image: { url: string };
};

const StatusPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  let errorData: any = '';
  let recipe: Recipe = {
    hot_ice: '',
    grind: '',
    temperature: 0,
    bean_amount: 0,
    extracted_amount: 0,
    extraction: '',
    recipe_image: { url: '' },
  };

  if (typeof id === 'string') {
    const { data, error } = getRecipe(id);
    errorData = error;
    recipe = data;
  }

  if (errorData) return <div>An error has occurred.</div>;
  if (!recipe) return <div>Loading...</div>;
  return (
    <>
      <div className='mb-2 text-xl font-bold'>{recipe.extraction}</div>
      <li> {recipe.hot_ice}</li>
      <li> 挽き方: {recipe.grind}</li>
      <li> 湯温: {recipe.temperature} ℃</li>
      <li> 豆の量: {recipe.bean_amount}</li>
      <li> 抽出量{recipe.extracted_amount}</li>
      <img src={recipe.recipe_image.url} />
    </>
  );
};

export default StatusPage;
