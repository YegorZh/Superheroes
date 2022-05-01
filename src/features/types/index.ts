export type Hero = {
  readonly [key: string]: string | string[] | undefined;
  nickname: string;
  realName?: string;
  originDescription?: string;
  superpowers?: string;
  catchPhrase?: string;
  readonly _id?: string;
  images: string[];
};

export const emptyHero = {
  nickname: '',
  realName: '',
  originDescription: '',
  superpowers: '',
  catchPhrase: '',
  images: [],
};
