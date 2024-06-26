'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { uploadProduct } from './actions';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ProductType, productSchema } from './schema';

export default function AddProduct() {
  const [preview, setPreview] = useState('');

  const [file, setFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductType>({
    resolver: zodResolver(productSchema),
  });

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    setValue('photo', url);
    setFile(file);
  };

  const onSubmit = async (data: ProductType) => {
    if (!file) {
      return;
    }

    const formData = new FormData();

    formData.append('title', data.title);
    formData.append('price', data.price + '');
    formData.append('description', data.description);
    formData.append('photo', data.photo);

    return uploadProduct(formData);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='p-5 flex flex-col gap-5'
      >
        <label
          htmlFor='photo'
          className='border-2 aspect-square flex items-center justify-center flex-col text-neutral-300 border-neutral-300 rounded-md border-dashed cursor-pointer bg-center bg-cover'
          style={{
            backgroundImage: `url(${preview})`,
          }}
        >
          {!preview && (
            <>
              <PhotoIcon className='w-20' />
              <div className='text-neutral-400 text-sm'>
                사진을 추가해주세요.
                {errors.photo?.message}
              </div>
            </>
          )}
        </label>
        <input
          onChange={onImageChange}
          type='file'
          id='photo'
          name='photo'
          accept='image/*'
          className='hidden'
        />
        <Input
          required
          placeholder='제목'
          type='text'
          {...register('title')}
          errors={[errors.title?.message ?? '']}
        />
        <Input
          type='number'
          required
          placeholder='가격'
          {...register('price')}
          errors={[errors.price?.message ?? '']}
        />
        <Input
          type='text'
          required
          placeholder='자세한 설명'
          {...register('description')}
          errors={[errors.description?.message ?? '']}
        />
        <Button text='작성 완료' />
      </form>
    </div>
  );
}
