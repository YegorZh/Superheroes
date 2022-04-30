import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Hero } from '../../../../features/types';
import ErrorMessage from '../../../reusable/ErrorMessage';
import IconButton from '../../../reusable/IconButton';
import HeroCard from './HeroCard';

const HeroesListPage: React.FC = () => {
  const [heroList, setHeroList] = useState<Hero[] | null>(null);
  const [error, setError] = useState<string>('');
  const [deleteHero, setDeleteHero] = useState<{ id?: string } | null>(null);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);

  useEffect(() => {}, [deleteHero]);

  useEffect(() => {
    setIsRequesting(true);
    const getHeroes = () => {
      axios
        .get('https://ninjas-api.herokuapp.com/heroes/')
        .then((result) => setHeroList(result.data))
        .catch((err) => setError(err.response.data.error || err.message))
        .finally(() => setIsRequesting(false));
    };

    if (deleteHero)
      axios
        .delete('https://ninjas-api.herokuapp.com/heroes/' + deleteHero.id)
        .then((_) => getHeroes())
        .catch((err) => setError(err.response?.data?.error || err.message))
        .finally(() => setIsRequesting(false));
    else getHeroes();
  }, [deleteHero]);

  return (
    <div className="flex w-full flex-col gap-6 px-12 py-8">
      {error && <ErrorMessage message={error} />}
      <div className="flex flex-wrap justify-around gap-x-4 gap-y-8 ">
        {heroList?.slice(0, 5).map((hero) => (
          <div>
            <HeroCard
              key={hero._id}
              name={hero.nickname}
              imageLink={hero.images[0]}
              id={hero._id}
              onDelete={() => {
                if (
                  window.confirm(
                    `Are you sure you want to delete ${hero.nickname}?`
                  )
                )
                  setDeleteHero({ id: hero._id });
              }}
              isRequesting={isRequesting}
            />
          </div>
        ))}
      </div>
      <div className="mx-auto flex items-center gap-4 font-bangers text-xl">
        <IconButton>{'<<'}</IconButton>
        <span>Page 1 out of 2</span>
        <IconButton>{'>>'}</IconButton>
      </div>
    </div>
  );
};

export default HeroesListPage;
