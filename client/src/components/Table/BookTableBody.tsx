import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { TableCell, TableRow, TableBody } from "../ui/table";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { IBooksResponse } from "@/types/books";
import { ConfirmDelete } from "../confirm";

interface BookTableBodyProps {
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  data: IBooksResponse | undefined;
}

export const BookTableBody = ({
  isLoading,
  isSuccess,
  data,
  isError,
}: BookTableBodyProps) => {
  return (
    <>
      {isError ? (
        <TableBody>
          <TableRow>
            <TableCell className="text-center" colSpan={6}>
              Something wrong...
            </TableCell>
          </TableRow>
        </TableBody>
      ) : (
        <TableBody>
          {isLoading
            ? new Array(6).fill(null).map((_, index) => (
                <TableRow key={index}>
                  <TableCell className="hidden sm:table-cell">
                    <Skeleton className="h-14 w-14 rounded-md"></Skeleton>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-[200px]"></Skeleton>
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-5 w-[120px]"></Skeleton>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-5 w-[70px]"></Skeleton>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-5 w-[70px]"></Skeleton>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-5 w-5"></Skeleton>
                  </TableCell>
                </TableRow>
              ))
            : isSuccess &&
              data?.data.map((book) => (
                <TableRow key={book._id}>
                  <TableCell className="hidden sm:table-cell">
                    <img
                      alt="Product img"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src="/placeholder.svg"
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    price smth
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {book.publishYear}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                          <ConfirmDelete bookId={book._id} />
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      )}
    </>
  );
};
