import axios from 'axios';
import { emptyHero, Hero } from '../types';

const defaultApiInteraction = (
  action: Promise<any>,
  params: {
    setError?: (value: React.SetStateAction<string>) => void;
    setIsRequesting?: (value: React.SetStateAction<boolean>) => void;
    setHero?: React.Dispatch<React.SetStateAction<Hero>>;
  }
) => {
  const { setError, setIsRequesting, setHero } = params;
  action
    .then(() => {
      if (setError) setError('');
    })
    .catch((err) => {
      if (setError) setError(err.response.data.error || err.message);
      if (setHero) setHero(emptyHero);
    })
    .finally(() => {
      if (setIsRequesting) setIsRequesting(false);
    });
};

const getHeroes = (
  setHeroList: (value: React.SetStateAction<Hero[] | null>) => void,
  setError?: (value: React.SetStateAction<string>) => void,
  setIsRequesting?: (value: React.SetStateAction<boolean>) => void
) =>
  defaultApiInteraction(
    axios
      .get('https://ninjas-api.herokuapp.com/heroes/')
      .then((result) => setHeroList(result.data)),
    { setError, setIsRequesting }
  );
const getHero = (
  setHero: React.Dispatch<React.SetStateAction<Hero>>,
  id: string,
  setError?: (value: React.SetStateAction<string>) => void,
  setIsRequesting?: (value: React.SetStateAction<boolean>) => void
) =>
  defaultApiInteraction(
    axios
      .get(`https://ninjas-api.herokuapp.com/heroes/${id}`)
      .then((result) => setHero((oldHero) => ({ ...oldHero, ...result.data }))),
    { setError, setIsRequesting, setHero }
  );

const postHero = (
  newHero: Hero,
  setId: (value: React.SetStateAction<string>) => void,
  setError?: (value: React.SetStateAction<string>) => void,
  setIsRequesting?: (value: React.SetStateAction<boolean>) => void
) =>
  defaultApiInteraction(
    axios
      .post('https://ninjas-api.herokuapp.com/heroes/', newHero)
      .then((result) => {
        setId(result.data._id);
      }),
    { setError, setIsRequesting }
  );

const patchHero = (
  newHero: Hero,
  setId: (value: React.SetStateAction<string>) => void,
  id: string,
  setError?: (value: React.SetStateAction<string>) => void,
  setIsRequesting?: (value: React.SetStateAction<boolean>) => void
) =>
  defaultApiInteraction(
    axios
      .patch(`https://ninjas-api.herokuapp.com/heroes/${id}`, newHero)
      .then(() => {
        setId(id);
      }),
    { setError, setIsRequesting }
  );

const deleteHero = (
  setHeroList: (value: React.SetStateAction<Hero[] | null>) => void,
  id: string,
  setError?: (value: React.SetStateAction<string>) => void,
  setIsRequesting?: (value: React.SetStateAction<boolean>) => void
) =>
  defaultApiInteraction(
    axios
      .delete('https://ninjas-api.herokuapp.com/heroes/' + id)
      .then((_) => getHeroes(setHeroList, setError, setIsRequesting)),
    { setError, setIsRequesting }
  );

export { getHeroes, deleteHero, postHero, patchHero, getHero };
