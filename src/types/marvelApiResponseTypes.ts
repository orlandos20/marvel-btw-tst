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
