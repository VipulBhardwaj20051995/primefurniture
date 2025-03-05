export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categories: string[]; // Array of categories
  // Add any other required properties
}