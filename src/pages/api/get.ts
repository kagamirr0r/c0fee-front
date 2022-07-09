import useSWR from 'swr';
import axios from 'axios';

const config = {
  headers: {
    'X-MICROCMS-API-KEY': '23253550226d4c27a56b2592dbd17124113c',
  },
};
const getFetcher = (url: string) => axios.get(url, config).then((res) => res.data);
const { data, error } = useSWR('https://c0fee.microcms.io/api/v1/beans', getFetcher);
const beansData = { beans: data };

export default beansData;
