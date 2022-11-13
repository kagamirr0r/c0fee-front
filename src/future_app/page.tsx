import 'ress';
import 'styles/globals.css';
import 'styles/Home.module.css';
import 'tailwindcss/tailwind.css';

import Beans from './beans/page';

import { use } from 'react';

async function getBeans() {
  const baseURI = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseURI}/beans`);
  console.log(res);
  return res.json();
}
export default function Page() {
  const beans = use(getBeans());
  console.log(beans);
  // return <Beans beans={beans} />;

  return <></>;
}
