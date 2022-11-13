import { useState } from 'react';

import { Stack, Autocomplete, TextField, Button, Input } from '@mui/material';
import type { NextPage } from 'next';
import useSWR from 'swr';

import getMultipleFetcher from '@/api/fetchers/getMultipleFetcher';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

type BeanInputs = {
  id: number;
  user_id: number;
  shop_id: any;
  country: any;
  variety: any;
  process: any;
  roast: string | null;
  price: number;
  bean_image: {
    url: string;
  };
  roast_date: Date | null;
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

  const { control, handleSubmit, setValue, register } = useForm<BeanInputs>({
    defaultValues: { roast_date: new Date() },
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
    roast_date: {
      validate: (val: Date | null) => {
        if (val == null) {
          return '申請日を入力してください。';
        }
        if (Number.isNaN(val.getTime())) {
          return '日付を正しく入力してください。';
        }
        return true;
      },
    },
  };

  if (error) return <div>An error has occurred.</div>;
  if (!data) return <div>Loading...</div>;

  const onSubmit: SubmitHandler<BeanInputs> = (data: BeanInputs) => console.error(data);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
              renderInput={(params) => <TextField {...params} label='shop' />}
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
        <Controller
          name='roast_date'
          control={control}
          rules={validationRules.roast_date}
          render={({ field, fieldState }) => (
            <DatePicker
              mask='____/__/__'
              inputFormat='yyyy/MM/dd'
              label='Roast Date'
              renderInput={(params) => (
                <TextField
                  {...params}
                  error={fieldState.invalid}
                  helperText={fieldState.error?.message}
                />
              )}
              {...field}
            />
          )}
        />
        <Controller
          name='bean_image'
          control={control}
          // rules={validationRules.bean_image}
          render={({ field, fieldState }) => <Input type='file' placeholder='bean image' />}
        />
        <Button variant='contained' type='submit'>
          Submit
        </Button>
      </Stack>
    </LocalizationProvider>
  );
};

export default BeanForm;
