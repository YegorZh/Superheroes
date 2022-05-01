import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { getHero, patchHero, postHero } from '../../../../features/api';
import { Hero } from '../../../../features/types';
import {
  validateImageLink,
  validateImages,
  validateNickname,
} from '../../../../features/validation';
import ErrorMessage from '../../../reusable/ErrorMessage';
import GenericButton from '../../../reusable/GenericButton';
import HeroImages from './HeroImages';

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

  const { id } = useParams();
  const initialHero: Hero = {
    nickname: '',
    realName: '',
    originDescription: '',
    catchPhrase: '',
    superpowers: '',
    images: [],
  };
  const [newHero, setNewHero] = useState<Hero>(initialHero);
  const [newImage, setNewImage] = useState<string>('');
  const [imageAdded, setImageAdded] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const [newId, setNewId] = useState<string>('');

  useEffect(() => {
    if (id) getHero(setNewHero, setError, setIsRequesting, id);
    else setNewHero(initialHero);
  }, [id]);

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

  const heroHandler = (mode: 'post' | 'patch') => {
    const error =
      validateNickname(newHero.nickname) || validateImages(newHero.images);
    if (error) return setError(error);
    setError('');
    setIsRequesting(true);
    if (mode === 'post') postHero(newHero, setError, setIsRequesting, setNewId);
    else if (mode === 'patch')
      patchHero(newHero, setError, setIsRequesting, setNewId, id);
  };

  useEffect(() => {
    if (imageAdded) setImageAdded(false);
  }, [imageAdded]);

  return (
    <div className="my-8 flex w-full flex-col gap-3 px-12">
      {newId && <Navigate to={`/heroes/${id}`} />}
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
                className="w-full max-w-[256px]"
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
      <div className="max-w-2xl space-y-4">
        <div className="text-xl font-bold">Images:</div>
        <div className="flex flex-col gap-x-4 gap-y-2 sm:flex-row">
          <div className="order-last sm:order-first">
            <GenericButton onClick={() => addImageHandler()}>
              Add Image
            </GenericButton>
          </div>
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
        {newHero.images.length > 0 && (
          <div className="max-w-4xl space-y-4">
            <HeroImages
              images={newHero.images}
              setNewHero={setNewHero}
              scrollToEnd={imageAdded}
            />
          </div>
        )}
      </div>
      <div className="mt-4 h-1 w-full max-w-3xl bg-red-700" />
      <div>
        {error && <ErrorMessage message={error} />}
        <div className="mt-4">
          {id ? (
            <GenericButton
              disabled={isRequesting}
              onClick={() => heroHandler('patch')}
            >
              Save
            </GenericButton>
          ) : (
            <GenericButton
              disabled={isRequesting}
              onClick={() => heroHandler('post')}
            >
              Add Hero
            </GenericButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewHeroPage;
