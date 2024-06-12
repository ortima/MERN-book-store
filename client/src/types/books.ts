type IBook = {
  _id: string;
  title: string;
  author: string;
  publishYear: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export interface IBooksResponse {
  count: number;
  data: IBook[];
}
