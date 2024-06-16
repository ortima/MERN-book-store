import { addNewBook, fetchBooks } from "@/services/books";
import { IBook } from "@/types/books";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

export const useBooksQuery = () => {
  return useQuery({
    queryKey: ["books"],
    queryFn: fetchBooks,
  });
};

export const useAddNewBook = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (
      data: Omit<IBook, "updatedAt" | "createdAt" | "_id" | "__v">,
    ) => addNewBook(data),
    mutationKey: ["addNewBook"],

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      console.log(err.response?.data?.message || err.message);
      toast({
        variant: "destructive",
        description: `${err.response?.data?.message || err.message}`,
      });
    },
    onMutate: () => {
      toast({
        description: "Pending...",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      toast({
        description: "Added new book!",
      });
    },
  });
};
