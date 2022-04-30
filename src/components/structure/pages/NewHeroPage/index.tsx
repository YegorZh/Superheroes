import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {
  validateImageLink,
  validateImages,
  validateNickname,
} from '../../../../features/validation';
import ErrorMessage from '../../../reusable/ErrorMessage';
import GenericButton from '../../../reusable/GenericButton';
import HeroImages from './HeroImages';

export type Hero = {
  readonly [key: string]: string | string[] | undefined;
  nickname: string;
  realName?: string;
  originDescription?: string;
  superpowers?: string;
  catchPhrase?: string;
  images: string[];
};

const NewHeroPage: React.FC = () => {
  const fields = [
    { name: 'Nickname:', key: 'nickname', placeholder: 'Spider-Man' },
    { name: 'Real Name:', key: 'realName', placeholder: 'Peter Parker' },
    {
      name: 'Origin Description:',
      key: 'originDescription',
      textfield: true,
      placeholder: "Write heroes' origin story...",
    },
    {
      name: 'Superpowers:',
      key: 'superpowers',
      textfield: true,
      placeholder: "Write heroes' superpowers...",
    },
    {
      name: 'Catch Phrase:',
      key: 'catchPhrase',
      textfield: true,
      placeholder: `“Look, up in the sky, it's a bird, it's a plane, it's Superman!”`,
    },
  ];

  const [newHero, setNewHero] = useState<Hero>({ nickname: '', images: [] });
  const [newImage, setNewImage] = useState<string>('');
  const [imageAdded, setImageAdded] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [id, setId] = useState<string>('');

  const onChangeHandler = (key: string, value: string) => {
    setNewHero((oldHero) => {
      const outHero = { ...oldHero };
      outHero[key] = value;
      return outHero;
    });
  };

  const addImageHandler = () => {
    const error = validateImageLink(newImage);
    if (error) return setError(error);
    setNewHero((oldHero) => ({
      ...oldHero,
      images: [...oldHero.images, newImage],
    }));
    setNewImage('');
    setError('');
    setImageAdded(true);
  };

  const addHeroHandler = () => {
    const error =
      validateNickname(newHero.nickname) || validateImages(newHero.images);
    if (error) return setError(error);
    setError('');
    axios
      .post('https://ninjas-api.herokuapp.com/heroes', newHero)
      .then((response) => {
        console.log(response);
        if (response.status === 200) setId(response.data._id);
      })
      .catch((err) => setError(err.response?.data?.error || err.message));
  };

  useEffect(() => {
    if (imageAdded) setImageAdded(false);
  }, [imageAdded]);

  return (
    <div className="my-8 flex w-full flex-col gap-3 px-12">
      {id && <Navigate to={`/heroes/${id}`} />}
      <div className="max-w-lg space-y-3">
        {fields.map((field, i) =>
          field.textfield ? (
            <label key={i} className=" flex flex-col gap-1">
              <h2 className="text-xl font-bold">{field.name}</h2>
              <textarea
                className="scrollbar w-full resize-none"
                value={newHero[field.key]}
                placeholder={field.placeholder}
                onChange={(event) =>
                  onChangeHandler(field.key, event.target.value)
                }
                rows={4}
              />
            </label>
          ) : (
            <label key={i} className="flex flex-col gap-1">
              <h3 className="text-xl font-bold">{field.name}</h3>
              <input
                className="w-64"
                value={newHero[field.key]}
                placeholder={field.placeholder}
                onChange={(event) =>
                  onChangeHandler(field.key, event.target.value)
                }
              />
            </label>
          )
        )}
      </div>
      <div className="max-w-2xl space-y-2">
        <div className="text-xl font-bold">Images:</div>
        <div className="flex gap-4">
          <GenericButton onClick={() => addImageHandler()}>
            Add Image
          </GenericButton>
          <input
            type="text"
            placeholder="Enter image link..."
            className="w-full"
            value={newImage}
            onChange={(event) =>
              setNewImage(event.target.value.replaceAll(' ', ''))
            }
          />
        </div>
        <div className="max-w-4xl space-y-4">
          <HeroImages
            images={newHero.images}
            setNewHero={setNewHero}
            scrollToEnd={imageAdded}
          />
        </div>
      </div>
      <div>
        {error && <ErrorMessage message={error} />}
        <GenericButton className="mt-4" onClick={() => addHeroHandler()}>
          Add Hero
        </GenericButton>
      </div>
    </div>
  );
};

export default NewHeroPage;
