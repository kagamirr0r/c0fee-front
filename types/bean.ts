interface Bean {
  id: number;
  user_id: number;
  shop_id: any;
  // shop_id: number;
  country: any;
  variety: any;
  process: any;
  roast: any;
  price: number;
  bean_image: {
    url: string;
  };
  roast_date: string;
  created_at: string;
  updated_at: string;
  area: string;
  farm: string;
}

export default Bean;
