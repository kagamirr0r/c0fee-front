import type { NextPage } from 'next';
import useSWR from 'swr';
import axios from 'axios';

const recipes: NextPage = () => {
  const config = {
    headers: {
      'X-MICROCMS-API-KEY': `${process.env.NEXT_PUBLIC_MICROCMS_KEY}`,
    },
  };
  const getFetcher = (url: string) => axios.get(url, config).then((res) => res.data);
  const { data, error } = useSWR('https://c0fee.microcms.io/api/v1/recipes', getFetcher);

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <>
      {data.contents.map((recipe: any) => (
        <>
          <div>recipe id: {recipe.id}</div>
          <ul key={recipe.id}>
            <li> hot or ice: {recipe.hot_ice}</li>
            <li> 挽き方: {recipe.grind}</li>
            <li> 湯温: {recipe.temperature}</li>
            <li> 豆の量: {recipe.bean_amount}</li>
            <li> 抽出量{recipe.extracted_amount}</li>
            <li> 抽出方法{recipe.extraction}</li>
          </ul>
        </>
      ))}
    </>
  );
};

export default recipes;
