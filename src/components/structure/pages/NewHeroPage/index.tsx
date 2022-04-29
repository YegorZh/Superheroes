import React, { useRef, useState } from 'react';
import GenericButton from '../../../reusable/GenericButton';
import HeroImages from './HeroImages';

type Hero = {
  readonly [key: string]: string | string[] | undefined;
  nickname: string;
  realName?: string;
  originDescription?: string;
  superpowers?: string[];
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
      name: 'Catch Phrase:',
      key: 'catchPhrase',
      textfield: true,
      placeholder: `“Look, up in the sky, it's a bird, it's a plane, it's Superman!”`,
    },
  ];
  const [images, setImages] = useState([
    'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/5/55/Friendly_Neighborhood_Spider-Man_-_Profile_Pic.png',
    'https://upload.wikimedia.org/wikipedia/en/a/aa/Hulk_%28circa_2019%29.png',
    'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/1/1b/SamWilson-CaptainAmerica.png',
    'https://thelandscapephotoguy.com/wp-content/uploads/2019/01/landscape%20new%20zealand%20S-shape.jpg',
    'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/5/55/Friendly_Neighborhood_Spider-Man_-_Profile_Pic.png',
    'https://upload.wikimedia.org/wikipedia/en/a/aa/Hulk_%28circa_2019%29.png',
    'https://static.wikia.nocookie.net/marvelcinematicuniverse/images/1/1b/SamWilson-CaptainAmerica.png',
    'https://thelandscapephotoguy.com/wp-content/uploads/2019/01/landscape%20new%20zealand%20S-shape.jpg',
  ]);
  const [newImage, setNewImage] = useState('');
  const [newHero, setNewHero] = useState<Hero>({ nickname: '', images: [] });
  const onChangeHandler = (key: string, value: string) => {
    setNewHero((oldHero) => {
      const outHero = { ...oldHero };
      outHero[key] = value;
      return outHero;
    });
  };
  const imagesRef = useRef<HTMLDivElement>(null);

  const addImageHandler = () => {
    setImages((OldImages) => [...OldImages, newImage]);
    imagesRef.current?.scrollTo(0, imagesRef.current.scrollHeight);
  };

  return (
    <div className="my-8 flex w-full max-w-xl flex-col gap-3 px-12">
      {fields.map((field, i) =>
        field.textfield ? (
          <label key={i} className="flex flex-col gap-1">
            <span className="text-xl font-bold">{field.name}</span>
            <textarea
              value={newHero[field.key]}
              placeholder={field.placeholder}
              onChange={(event) =>
                onChangeHandler(field.key, event.target.value)
              }
              rows={4}
              className="w-full resize-none"
            />
          </label>
        ) : (
          <label key={i} className="flex flex-col gap-1">
            <span className="text-xl font-bold">{field.name}</span>
            <input
              value={newHero[field.key]}
              placeholder={field.placeholder}
              onChange={(event) =>
                onChangeHandler(field.key, event.target.value)
              }
              className="w-64"
            />
          </label>
        )
      )}
      <div className="space-y-2">
        <div className="text-xl font-bold">Images:</div>
        <div className="flex gap-2">
          <GenericButton onClick={() => addImageHandler}>
            Add Image
          </GenericButton>
          <input
            type="text"
            placeholder="Enter image link..."
            className="w-full"
            value={newImage}
            onChange={(event) => setNewImage(event.target.value)}
          />
        </div>
      </div>
      <HeroImages images={images} setImages={setImages} />
      <GenericButton className="mt-4">Add Hero</GenericButton>
    </div>
  );
};

export default NewHeroPage;
