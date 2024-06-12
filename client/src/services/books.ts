import { IBooksResponse } from "@/types/books";

const BASE_URL = "http://localhost:5000";

export const fetchBooks = async (): Promise<IBooksResponse> => {
  try {
    const response = await fetch(`${BASE_URL}/books`);
    if (!response.ok) {
      throw new Error(`Error fetching data ${response.statusText}`);
    }
    return await response.json();
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching data: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
