import { addNewBook, fetchBooks } from "@/services/books";
import { IBook } from "@/types/books";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

export const useBooksQuery = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });
};

export const useAddNewBook = () => {
  return useMutation({
    mutationFn: (
      data: Omit<IBook, "updatedAt" | "createdAt" | "_id" | "__v">,
    ) => addNewBook(data),
    mutationKey: ["addNewBook"],

    onError: (err) => {
      console.log(err);
    },
    onSuccess: () => {
      //TODO: NEED TO FIX REVALIDATE
      new QueryClient().invalidateQueries({ queryKey: ["books"] });
    },
  });
};
