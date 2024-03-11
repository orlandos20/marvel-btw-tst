interface MarvelSharedResponseProperties {
  code: number;
  status: 'Ok';
  etag: string;
}

interface MarvelResponseContainer<DataContainer>
  extends MarvelSharedResponseProperties {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: DataContainer;
}

export interface MarvelResponseWrapper<DataContainer> {
  attributionHTML: string;
  attributionText: string;
  copyright: string;
  data: MarvelResponseContainer<DataContainer>;
}

export type MarvelUrl = {
  type: string;
  url: string;
};

export type MarvelDates = {
  type: string;
  date: Date;
};

export interface ProductSummary {
  resourceURI?: string;
  name?: string;
  type?: string;
}

export interface MarvelProductList<ProductSummary> {
  available: number;
  returned: number;
  collectionURI: number;
  items: ProductSummary[];
}

export interface MarverComicList extends MarvelProductList<ProductSummary> {}
export interface MarvelStoryList extends MarvelProductList<ProductSummary> {}
export interface MarvelEventList extends MarvelProductList<ProductSummary> {}
export interface MarvelSeriesList extends MarvelProductList<ProductSummary> {}
