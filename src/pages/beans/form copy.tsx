import { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router'

import axios from 'axios';
import useSWR from 'swr';
import getMultipleFetcher from '@/api/fetchers/getMultipleFetcher';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Stack, Autocomplete, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

type Inputs = {
  user: {};
  shop: {};
  image: File;
  date: Date;
};

const LabelStyle = styled('span')({
  color: "rgba(0, 0, 0, 0.6)",
  fontSize: 15,
  marginRight: 15
});

const Form: NextPage = () => {
  const baseURI = process.env.NEXT_PUBLIC_BASE_URL;

  const usersURI = `${baseURI}/users`;
  const shopsURI = `${baseURI}/shops`;

  const urls = [usersURI, shopsURI];
  const { data, error } = useSWR(urls, getMultipleFetcher);
  const [currentImage, setImage] = useState(new Blob)
  const [imageUrl, setImageUrl] = useState("")

  const { control, handleSubmit, setValue } = useForm<Inputs>({
    defaultValues: { date: new Date() },
  });

  const validationRules = {
    user: {
      required: 'country is required',
    },
    shop: {
      required: 'shop is required',
    },
    date: {
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

  const router = useRouter()
  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    const { shop, user, date } = data;
    const formData = new FormData();

    formData.append("shop", shop.id);
    formData.append("user", user.id);
    formData.append("date", date?.toString());
    formData.append('image', currentImage, currentImage.name)

    axios({
      url: `${baseURI}/`,
      method: "post",
      data: formData,
      headers: {
        "content-type": "multipart/form-data",
      },
    })
      .then(() => router.push("/"))
      .catch((error) => {
        alert("エラーが発生しました。");
      });
  };
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
          name='user'
          rules={validationRules.user}
          render={({ props }) => (
            <Autocomplete
              fullWidth
              options={data[0]}
              renderInput={(params) => <TextField {...params} label='user' />}
              onChange={(event, value) => {
                setValue('user', value, {
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
          name='shop'
          rules={validationRules.shop}
          render={({ props }) => (
            <Autocomplete
              fullWidth
              options={data[1]}
              getOptionLabel={(option) => option?.name}
              renderInput={(params) => <TextField {...params} label='shop' />}
              onChange={(event, value) => {
                setValue('shop', value, {
                  shouldValidate: true,
                  shouldDirty: true,
                  shouldTouch: true,
                });
              }}
            />
          )}
        />
        <Controller
          name='date'
          control={control}
          rules={validationRules.date}
          render={({ field, fieldState }) => (
            <DatePicker
              mask='____/__/__'
              inputFormat='yyyy/MM/dd'
              label='Date'
              renderInput={(params) => (
                <TextField
                  {...params}
                  helperText={fieldState.error?.message}
                />
              )}
              {...field}
            />
          )}
        />
        <Controller
          name='image'
          control={control}
          render={({ field, fieldState }) =>
            <label htmlFor={"image"}>
              <LabelStyle>
                <span>Image</span>
              </LabelStyle>


              <Button variant='outlined' component="span">
                SELECT
              </Button>

              <input type='file' id="image" style={{ display: 'none' }} onChange={e => {
                setImage(e.target.files[0])
                setImageUrl(URL.createObjectURL(e.target.files[0]))
              }} />

              <img src={imageUrl} style={{ marginTop: 20 }} />
            </label>
          }
        />
        <Button variant='contained' type='submit' color="info">
          Submit
        </Button>
      </Stack>
    </LocalizationProvider >
  );
};

export default Form;
