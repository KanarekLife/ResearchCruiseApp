export type PublicationDto = {
  id: string;
  category: 'subject' | 'postscript';
  doi: string;
  authors: string;
  title: string;
  magazine: string;
  year: string;
  ministerialPoints: string;
};
