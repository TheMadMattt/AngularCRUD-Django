import {Category} from "./Category";

export interface Offer {
  id: number;
  title: string;
  description: string;
  price: number;
  category: Category
  created_at: Date;
}
