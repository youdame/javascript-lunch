import { CATEGORY_OPTIONS, SORT_OPTIONS } from './constant.js';

export type SortOption = (typeof SORT_OPTIONS)[number];
export type CategoryOption = (typeof CATEGORY_OPTIONS)[number];

export interface Restaurant {
  id: string;
  name: string;
  distance: number;
  description: string;
  category: string;
  link: string;
  icon: {
    src: string;
    alt: string;
  };
  isFavorite: boolean;
}
