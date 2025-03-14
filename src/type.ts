export interface Restaurant {
  id: number;
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
