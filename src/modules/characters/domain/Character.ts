import {
  MarvelEventList,
  MarvelSeriesList,
  MarvelStoryList,
  MarvelUrl,
  MarverComicList,
} from '@/src/types/marvelApiResponseTypes';

export type Character = {
  id: number;
  name: string;
  description?: string;
  modified?: Date;
  resourceURI?: string;
  urls: MarvelUrl[];
  thumbnail: {
    path: string;
    extension: string;
  };
  comics: MarverComicList[];
  stories: MarvelStoryList[];
  events: MarvelEventList[];
  series: MarvelSeriesList[];
};
