interface Shop {
  id: number;
  url: string;
  shop_image: {
    url: string;
  };
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
  name: string;
  address: string;
}

export default Shop;
