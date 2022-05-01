import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { getHero } from '../../../../features/api';
import { emptyHero, Hero } from '../../../../features/types';
import ErrorMessage from '../../../reusable/ErrorMessage';
import GenericButton from '../../../reusable/GenericButton';
import Separator from '../../../reusable/Separator';
import SmallTitle from '../../../reusable/SmallTitle';
import HeroImages from '../NewHeroPage/HeroImages';

const HeroPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hero, setHero] = useState<Hero>(emptyHero);
  const [error, setError] = useState<string>('');
  useEffect(() => {
    if (id) getHero(setHero, id, setError);
  }, [id]);

  if (!hero.nickname && !error) setError('Hero not found, try another id');

  return (
    <div className="flex max-w-2xl flex-col gap-6 py-8 px-6 sm:px-12">
      {error && <ErrorMessage message={error} />}
      <div>
        <h2 className="font-bangers text-4xl sm:text-6xl">{hero.nickname}</h2>
        <div className="mb-2">
          <Separator />
        </div>
        <div className="flex flex-col justify-between sm:flex-row sm:items-center">
          <div className="text-stone-700">
            <SmallTitle text={`${hero.realName || 'unknown'}`} />
          </div>
          <p className="mt-4 text-center font-bangers text-lg italic tracking-wide text-stone-600 sm:mt-0 sm:text-right">
            {hero.catchPhrase}
          </p>
        </div>
      </div>
      <div className="space-y-1">
        <SmallTitle text={'Origin Description:'} />
        <p className="rounded bg-stone-100 p-4 font-medium">
          {hero.originDescription || 'Unknown'}
        </p>
      </div>
      <div className="space-y-1">
        <SmallTitle text={'Superpowers:'} />
        <p className="rounded bg-stone-100 p-4 font-medium">
          {hero.superpowers || 'Unknown'}
        </p>
      </div>
      <HeroImages images={hero.images} />
      <Separator />
      <div className="mt-4">
        <GenericButton
          onClick={() => navigate(`/heroes/edit/${id}`)}
          disabled={Boolean(error)}
        >
          Edit
        </GenericButton>
      </div>
    </div>
  );
};

export default HeroPage;
