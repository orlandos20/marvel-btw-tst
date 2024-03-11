import { MarvelDates } from '@/src/types/marvelApiResponseTypes';
import { Comic } from '../domain/Comic';

type SortDate = {
  comics: Comic[];
  type?: 'onsaleDate' | 'focDate' | 'unlimitedDate' | 'digitalPurchaseDate';
};

export const sortComicsByDate = ({
  comics,
  type = 'onsaleDate',
}: SortDate): Comic[] => {
  const comicsToSort = comics.slice();

  const sortedComics = comicsToSort.sort((comicA, comicB) => {
    let comicAOnSaleDate = comicA?.dates?.find(
      ({ type: comicDateType }) => comicDateType === type
    ) as MarvelDates;
    let comicBOnSaleDate = comicB?.dates?.find(
      ({ type: comicDateType }) => comicDateType === type
    ) as MarvelDates;

    if (!comicAOnSaleDate) {
      comicAOnSaleDate = comicA?.dates?.find(
        ({ type: comicDateType }) => comicDateType === 'onsaleDate'
      ) as MarvelDates;
    }

    if (!comicBOnSaleDate) {
      comicBOnSaleDate = comicB?.dates?.find(
        ({ type: comicDateType }) => comicDateType === 'onsaleDate'
      ) as MarvelDates;
    }

    return (
      new Date(comicAOnSaleDate?.date)?.getTime() -
      new Date(comicBOnSaleDate?.date)?.getTime()
    );
  });

  return sortedComics;
};
