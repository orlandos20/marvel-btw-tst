import { MarvelDates, MarvelUrl } from '@/src/types/marvelApiResponseTypes';

export interface Comic {
  id?: number;
  digitalId?: number;
  title?: string;
  issueNumber?: number;
  variantDescription?: string;
  description?: string;
  modified?: Date;
  isbn?: string;
  upc?: string;
  diamondCode?: string;
  ean?: string;
  issn?: string;
  format?: string;
  pageCount?: string;
  textObjects?: string[];
  resourceURI?: string;
  urls?: MarvelUrl[];
  series?: string;
  variants?: string;
  collections?: string;
  collectedIssues?: string;
  dates: MarvelDates[];
  creators?: string;
  characters?: string;
  stories?: string;
  events?: string;
  thumbnail?: {
    path: string;
    extension: string;
  };
}
