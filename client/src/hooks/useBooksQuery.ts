import { fetchBooks } from "@/services/books";
import { useQuery } from "@tanstack/react-query";

export const useBooksQuery = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });
};
