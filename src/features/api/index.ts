import axios from 'axios';
import { Hero } from '../types';

const getHeroes = (
  setHeroList: (value: React.SetStateAction<Hero[] | null>) => void,
  setError: (value: React.SetStateAction<string>) => void,
  setIsRequesting: (value: React.SetStateAction<boolean>) => void
) => {
  axios
    .get('https://ninjas-api.herokuapp.com/heroes/')
    .then((result) => setHeroList(result.data))
    .catch((err) => setError(err.response.data.error || err.message))
    .finally(() => setIsRequesting(false));
};

const getHero = (
  setHero: React.Dispatch<React.SetStateAction<Hero>>,
  setError: (value: React.SetStateAction<string>) => void,
  setIsRequesting: (value: React.SetStateAction<boolean>) => void,
  id: string
) => {
  axios
    .get(`https://ninjas-api.herokuapp.com/heroes/${id}`)
    .then((result) => setHero((oldHero) => ({ ...oldHero, ...result.data })))
    .catch((err) => setError(err.response.data.error || err.message))
    .finally(() => setIsRequesting(false));
};

const postHero = (
  newHero: Hero,
  setError: (value: React.SetStateAction<string>) => void,
  setIsRequesting: (value: React.SetStateAction<boolean>) => void,
  setId: (value: React.SetStateAction<string>) => void
) => {
  axios
    .post('https://ninjas-api.herokuapp.com/heroes/', newHero)
    .then((result) => {
      setId(result.data._id);
    })
    .catch((err) => setError(err.response?.data?.error || err.message))
    .finally(() => setIsRequesting(false));
};

const patchHero = (
  newHero: Hero,
  setError: (value: React.SetStateAction<string>) => void,
  setIsRequesting: (value: React.SetStateAction<boolean>) => void,
  setId: (value: React.SetStateAction<string>) => void,
  id?: string
) => {
  axios
    .patch(`https://ninjas-api.herokuapp.com/heroes/${id}`, newHero)
    .then((result) => {
      setId(<string>id);
    })
    .catch((err) => setError(err.response?.data?.error || err.message))
    .finally(() => setIsRequesting(false));
};

const deleteHero = (
  setHeroList: (value: React.SetStateAction<Hero[] | null>) => void,
  setError: (value: React.SetStateAction<string>) => void,
  setIsRequesting: (value: React.SetStateAction<boolean>) => void,
  id?: string
) => {
  axios
    .delete('https://ninjas-api.herokuapp.com/heroes/' + id)
    .then((_) => getHeroes(setHeroList, setError, setIsRequesting))
    .catch((err) => setError(err.response?.data?.error || err.message))
    .finally(() => setIsRequesting(false));
};

export { getHeroes, deleteHero, postHero, patchHero, getHero };
