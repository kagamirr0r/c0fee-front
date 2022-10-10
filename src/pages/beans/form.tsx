import { useState } from 'react';

import { Stack, Autocomplete, TextField, Button } from '@mui/material';
import type { NextPage } from 'next';
import useSWR from 'swr';

// import Bean from 'types/bean';
// import Shop from 'types/shop';
import getMultipleFetcher from '@/api/fetchers/getMultipleFetcher';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';

type BeanInputs = {
  id: number;
  user_id: number;
  shop_id: any;
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
};

const BeanForm: NextPage = () => {
  const shopsURI = `${process.env.NEXT_PUBLIC_BASE_URL}/shops`;
  const beanCountriesURI = `${process.env.NEXT_PUBLIC_BASE_URL}/beans/countries`;
  const beanVarietiesURI = `${process.env.NEXT_PUBLIC_BASE_URL}/beans/varieties`;
  const beanProcessesURI = `${process.env.NEXT_PUBLIC_BASE_URL}/beans/processes`;
  const beanRoastsURI = `${process.env.NEXT_PUBLIC_BASE_URL}/beans/roasts`;
  const urls = [shopsURI, beanCountriesURI, beanVarietiesURI, beanProcessesURI, beanRoastsURI];
  const { data, error } = useSWR(urls, getMultipleFetcher);

  // const { shopIds, beanCountrys, error } = getMultipleRequsts(urls);

  console.log(data);

  const { control, handleSubmit, setValue, register } = useForm<BeanInputs>({
    defaultValues: {},
  });

  const validationRules = {
    shop: {
      required: 'shop is required',
    },
    country: {
      required: 'country is required',
    },
    area: {
      required: 'area is required',
      minLength: { value: 4, message: 'area must be at least 4 characters.' },
    },
  };

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div>Loading...</div>;

  const onSubmit: SubmitHandler<BeanInputs> = (data: BeanInputs) => console.log(data);
  return (
    <Stack
      component='form'
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      spacing={2}
      sx={{ m: 2, width: '80ch' }}
    >
      <Controller
        control={control}
        name='shop_id'
        render={({ props }) => (
          <Autocomplete
            fullWidth
            options={data[0]}
            getOptionLabel={(option) => option?.name}
            renderInput={(params) => <TextField {...params} label='shop_id' />}
            onChange={(event, value) => {
              setValue('shop_id', value, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              });
            }}
          />
        )}
      />
      <Controller
        control={control}
        name='country'
        render={({ props }) => (
          <Autocomplete
            fullWidth
            options={data[1]}
            renderInput={(params) => <TextField {...params} label='country' />}
            onChange={(event, value) => {
              setValue('country', value, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              });
            }}
          />
        )}
      />
      <Controller
        name='name'
        control={control}
        rules={validationRules.name}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            type='text'
            label='名前'
            error={fieldState.invalid}
            helperText={fieldState.error?.message}
          />
        )}
      />
      <Controller
        control={control}
        name='variety'
        render={({ props }) => (
          <Autocomplete
            fullWidth
            options={data[2]}
            renderInput={(params) => <TextField {...params} label='variety' />}
            onChange={(event, value) => {
              setValue('variety', value, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              });
            }}
          />
        )}
      />
      <Controller
        control={control}
        name='process'
        render={({ props }) => (
          <Autocomplete
            fullWidth
            options={data[3]}
            renderInput={(params) => <TextField {...params} label='process' />}
            onChange={(event, value) => {
              setValue('process', value, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              });
            }}
          />
        )}
      />
      <Controller
        control={control}
        name='roast'
        render={({ props }) => (
          <Autocomplete
            fullWidth
            options={data[4]}
            renderInput={(params) => <TextField {...params} label='roast' />}
            onChange={(event, value) => {
              setValue('roast', value, {
                shouldValidate: true,
                shouldDirty: true,
                shouldTouch: true,
              });
            }}
          />
        )}
      />
    </Stack>
  );
};

export default BeanForm;
