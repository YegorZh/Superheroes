import React, { useEffect, useState } from 'react';
import { deleteHero, getHeroes } from '../../../../features/api';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../../features/redux/hooks';
import {
  setItemsPerPage,
  setPage,
} from '../../../../features/redux/paginationSlice';
import { Hero } from '../../../../features/types';
import ErrorMessage from '../../../reusable/ErrorMessage';
import IconButton from '../../../reusable/IconButton';
import HeroCard from './HeroCard';

const HeroesListPage: React.FC = () => {
  const [heroList, setHeroList] = useState<Hero[] | null>(null);
  const [error, setError] = useState<string>('');
  const [deleteId, setDeleteId] = useState<{ value?: string } | null>(null);
  const [isRequesting, setIsRequesting] = useState<boolean>(false);
  const dispatcher = useAppDispatch();
  const { currentPage, itemsPerPage } = useAppSelector(
    (state) => state.pagination
  );
  const isFirstPage = currentPage <= 0;
  const lastPage = heroList ? Math.ceil(heroList.length / itemsPerPage) : -1;
  if (lastPage > -1 && currentPage > lastPage - 1)
    dispatcher(setPage(lastPage - 1));
  const isLastPage = heroList && currentPage >= lastPage - 1;

  useEffect(() => {
    setIsRequesting(true);

    if (typeof deleteId?.value === 'string')
      deleteHero(setHeroList, deleteId.value, setError, setIsRequesting);
    else getHeroes(setHeroList, setError, setIsRequesting);
  }, [deleteId]);

  return (
    <div className="mt-8 flex h-full w-full flex-col gap-6 px-12 py-8">
      {error && <ErrorMessage message={error} />}
      <div className="flex flex-wrap justify-center gap-8">
        {heroList
          ?.slice(
            currentPage * itemsPerPage,
            itemsPerPage + currentPage * itemsPerPage
          )
          .map((hero) => (
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
                  setDeleteId({ value: hero._id });
              }}
              isRequesting={isRequesting}
            />
          ))}
      </div>
      <div className="mx-auto flex flex-col font-bangers text-xl">
        <div className="flex items-center gap-4">
          <IconButton
            disabled={isFirstPage}
            onClick={() => dispatcher(setPage(currentPage - 1))}
          >
            {'<<'}
          </IconButton>
          <span>
            Page{' '}
            <select
              value={currentPage}
              onChange={(event) =>
                dispatcher(setPage(Number(event.target.value)))
              }
              className="mx-2 rounded bg-stone-100 text-center"
            >
              {lastPage > -1 &&
                [...Array(lastPage)].map((_, i) => (
                  <option key={i} value={i}>
                    {i + 1}
                  </option>
                ))}
            </select>
            out of {lastPage < 0 ? '?' : lastPage}
          </span>
          <IconButton
            disabled={isLastPage || false}
            onClick={() => dispatcher(setPage(currentPage + 1))}
          >
            {'>>'}
          </IconButton>
        </div>
        <div className="mx-auto space-x-3">
          <span className="font-bangers">Items</span>
          <select
            className="rounded bg-stone-100 text-center"
            value={itemsPerPage}
            onChange={(event) =>
              dispatcher(setItemsPerPage(Number(event.target.value)))
            }
          >
            {[...Array(Math.min(heroList?.length || 20, 20))].map((_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default HeroesListPage;
