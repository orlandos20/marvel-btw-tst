export interface DefaultParams {
  limit: string | number;
  offset: string | number;
  orderBy?: 'name' | 'modified' | '-name' | '-modified';
  name?: string;
  nameStartsWith?: string | undefined;
  modifiedSince?: Date | undefined;
  comics?: number | undefined;
  series?: number | undefined;
  events?: number | undefined;
  stories?: number | undefined;
}
export type Hasher = (toHash: string) => string;
