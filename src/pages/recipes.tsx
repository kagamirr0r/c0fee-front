import type { NextPage } from 'next';
import getRecipes from '@/api/getRecipes';
import Link from 'next/link';

const Recipes: NextPage = () => {
  const { data, error } = getRecipes();

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <div className='grid gap-10 p-10 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'>
      {data.map((recipe: any) => (
        <div key={recipe.id}>
          <div className='max-w-sm overflow-hidden rounded shadow-lg'>
            <Link href={`/recipes/${recipe.id}`}>
              <img src={recipe.recipe_image.url} alt={recipe.country} />
            </Link>
            <div className='px-6 py-4'>
              <div className='mb-2 text-xl font-bold'>{recipe.extraction}</div>
              <p className='text-base text-gray-700'>{recipe.grind}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Recipes;
