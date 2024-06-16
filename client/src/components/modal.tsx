import React from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@radix-ui/react-dialog";
import { Input } from "./ui/input";
import { Card } from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { IBook } from "@/types/books";
import { useAddNewBook } from "@/hooks/useBooksQuery";
import { Loader2 } from "lucide-react";

interface AddNewBookModalProps {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
}

const formSchema = z.object({
  title: z.string().min(4, {
    message: "Title must be at least 4 characters.",
  }),
  author: z.string().min(4, {
    message: "Title must be at least 4 characters.",
  }),
  price: z.coerce.number().positive({
    message: "Price must be a positive number",
  }),
  publishYear: z.coerce.number().positive({
    message: "Year must be a positive number",
  }),
});

const fieldsConfig = [
  {
    name: "title" as const,
    label: "Title",
    placeholder: "Enter the book title",
    type: "text",
  },
  {
    name: "author" as const,
    label: "Author",
    placeholder: "Enter the author's name",
    type: "text",
  },
  {
    name: "price" as const,
    label: "Price",
    placeholder: "Enter the price",
    type: "number",
  },
  {
    name: "publishYear" as const,
    label: "Published year",
    placeholder: "Enter a year",
    type: "number",
  },
];

export const AddNewBookModal: React.FC<AddNewBookModalProps> = ({
  setIsOpen,
  isOpen,
}) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      price: "",
      publishYear: 2024,
    },
  });

  const {
    mutate: addNewBookMutation,
    isPending,
    isError,
    isSuccess,
    error,
  } = useAddNewBook();

  const onSubmit = async (
    data: Omit<IBook, "updatedAt" | "createdAt" | "_id" | "__v">,
  ) => {
    try {
      addNewBookMutation(data, {
        onSuccess: () => {
          setIsOpen(false);
          form.reset();
        },
      });
    } catch (error) {
      console.error("Error adding new book:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => !isPending && setIsOpen(!isOpen)}>
      <DialogOverlay className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <Card className="w-[450px] p-4">
          <DialogContent className="flex w-full flex-col gap-2 rounded-lg p-4 shadow-lg">
            <DialogTitle className="text-lg font-medium">
              Add new book
            </DialogTitle>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {fieldsConfig.map(({ name, label, placeholder, type }) => (
                  <FormField
                    key={name}
                    control={form.control}
                    name={name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            type={type}
                            placeholder={placeholder}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isPending}
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isPending}>
                    {isPending && (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Save changes
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Card>
      </DialogOverlay>
    </Dialog>
  );
};
