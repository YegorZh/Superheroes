import React, { useEffect, useState } from 'react';
import { deleteHero, getHeroes } from '../../../../features/api';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../features/redux/hooks';
import { setPage } from '../../../../features/redux/paginationSlice';
import { Hero } from '../../../../features/types';
import ErrorMessage from '../../../reusable/ErrorMessage';
import IconButton from '../../../reusable/IconButton';
import HeroCard from './HeroCard';

const HeroesListPage: React.FC = () => {
  const [heroList, setHeroList] = useState<Hero[] | null>(null);
  const [error, setError] = useState<string>('');
  const [deleteId, setDeleteId] = useState<{ value?: string } | null>(null);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const { currentPage, itemsPerPage } = useAppSelector(
    (state) => state.pagination
  );
  const isFirstPage = currentPage < 1;
  const lastPage = heroList ? Math.ceil(heroList.length / itemsPerPage) : -1;
  const isLastPage = heroList && currentPage > lastPage - 2;
  const dispatcher = useAppDispatch();

  useEffect(() => {
    setIsRequesting(true);

    if (deleteId)
      deleteHero(setHeroList, setError, setIsRequesting, deleteId.value);
    else getHeroes(setHeroList, setError, setIsRequesting);
  }, [deleteId]);

  return (
    <div className="mt-8 flex h-full w-full flex-col gap-6 px-12 py-8">
      {error && <ErrorMessage message={error} />}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-8 ">
        {heroList
          ?.slice(
            currentPage * itemsPerPage,
            itemsPerPage + currentPage * itemsPerPage
          )
          .map((hero) => (
            <div key={hero._id}>
              <HeroCard
                name={hero.nickname}
                imageLink={hero.images[0]}
                id={hero._id}
                onDelete={() => {
                  if (
                    window.confirm(
                      `Are you sure you want to delete ${hero.nickname}?`
                    )
                  )
                    setDeleteId({ value: hero._id });
                }}
                isRequesting={isRequesting}
              />
            </div>
          ))}
      </div>
      <div className="mx-auto flex items-center gap-4 font-bangers text-xl">
        <IconButton
          disabled={isFirstPage}
          onClick={() => dispatcher(setPage(currentPage - 1))}
        >
          {'<<'}
        </IconButton>
        <span>
          Page {currentPage + 1} out of {lastPage < 0 ? '?' : lastPage}
        </span>
        <IconButton
          disabled={isLastPage || false}
          onClick={() => dispatcher(setPage(currentPage + 1))}
        >
          {'>>'}
        </IconButton>
      </div>
    </div>
  );
};

export default HeroesListPage;
