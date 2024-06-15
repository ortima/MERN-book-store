import { addNewBook, fetchBooks } from "@/services/books";
import { IBook } from "@/types/books";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useBooksQuery = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });
};

export const useAddNewBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: Omit<IBook, "updatedAt" | "createdAt" | "_id" | "__v">,
    ) => addNewBook(data),
    mutationKey: ["addNewBook"],

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      console.log(err.response?.data?.message || err.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
  });
};
