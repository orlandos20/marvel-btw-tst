type MarvelUrl = {
  type: string;
  url: string;
};

interface ProductSummary {
  resourceURI?: string;
  name?: string;
  type?: string;
}

interface MarvelProductList<ProductSummary> {
  available: number;
  returned: number;
  collectionURI: number;
  items: ProductSummary[];
}

interface MarverComicList extends MarvelProductList<ProductSummary> {}
interface MarvelStoryList extends MarvelProductList<ProductSummary> {}
interface MarvelEventList extends MarvelProductList<ProductSummary> {}
interface MarvelSeriesList extends MarvelProductList<ProductSummary> {}

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
