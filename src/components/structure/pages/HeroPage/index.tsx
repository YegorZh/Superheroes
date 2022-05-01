import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { getHero } from '../../../../features/api';
import { Hero } from '../../../../features/types';
import Separator from '../../../reusable/Separator';
import SmallTitle from '../../../reusable/SmallTitle';
import HeroImages from '../NewHeroPage/HeroImages';

const HeroPage: React.FC = () => {
  const [hero, setHero] = useState<Hero | null>(null);
  const [error, setError] = useState<string>('');
  useEffect(() => {
    // getHero(setHero, setError);
  }, []);

  return (
    <div className="flex flex-col gap-4 px-12 py-8">
      <div>
        <h2 className="font-bangers text-6xl">Spider-Man</h2>
        <Separator />
      </div>
      <div className="text-stone-700">
        <SmallTitle text={'Real name: Peter Parker'} />
      </div>
      <SmallTitle text={'Origin Description:'} />
      <SmallTitle text={'Superpowers:'} />
      {/* <HeroImages /> */}
    </div>
  );
};

export default HeroPage;
