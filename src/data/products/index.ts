import { Product } from "@/types"; // Import the shared type
import { dmPharmaProducts } from "./dm-pharma"; // Import DM Pharma's specific list

// You can import other companies here later, e.g.:
// import { ciplaProducts } from "./cipla";
// import { sunPharmaProducts } from "./sun-pharma";

// Combine all lists into one master array
export const products: Product[] = [
  ...dmPharmaProducts,

];
