import { validateRequest } from "@/lib/utils.server";
import { getUserBooks } from "@/services/books.service";
import AddBookButton from "./add-book-button";
import RemoveBookButton from "./remove-book-button";

export default async function UserButtonsContainer({
  googleId,
}: {
  googleId: string;
}) {
  const { user } = await validateRequest();

  if (!user) return null;

  const userBooks = await getUserBooks(user.id);

  const bookInUserBookshelves =
    userBooks.filter((userBook) => userBook.googleId === googleId).length === 1;

  return (
    <>
      {bookInUserBookshelves ? (
        <RemoveBookButton />
      ) : (
        <AddBookButton googleId={googleId} />
      )}
    </>
  );
}
