import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

export default function PaginationContainer({
  urlCore,
  numPages,
  page,
}: {
  urlCore: string;
  numPages: number;
  page: number;
}) {
  console.log(urlCore);

  function generateUrl(p: number) {
    return `${urlCore}page=${p}`;
  }

  return (
    <Pagination className="mt-12">
      <PaginationContent>
        {page > 1 ? (
          <PaginationItem>
            <PaginationPrevious href={generateUrl(page - 1)} />
          </PaginationItem>
        ) : null}

        <PaginationItem>
          <PaginationLink href={generateUrl(1)} isActive={1 === page}>
            1
          </PaginationLink>
        </PaginationItem>

        {[2, 3].includes(numPages) ? (
          <PaginationItem>
            <PaginationLink href={generateUrl(2)} isActive={2 === page}>
              2
            </PaginationLink>
          </PaginationItem>
        ) : null}

        {numPages > 3 ? (
          <>
            {page !== 1 && page !== numPages ? (
              <>
                {page === 2 ? null : (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                <PaginationItem>
                  <PaginationLink href="#" isActive={true}>
                    {page}
                  </PaginationLink>
                </PaginationItem>
              </>
            ) : null}

            {numPages - 1 === page ? null : (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        ) : null}

        {numPages > 2 ? (
          <PaginationItem>
            <PaginationLink
              href={generateUrl(numPages)}
              isActive={numPages === page}
            >
              {numPages}
            </PaginationLink>
          </PaginationItem>
        ) : null}

        {page < numPages ? (
          <PaginationItem>
            <PaginationNext href={generateUrl(page + 1)} />
          </PaginationItem>
        ) : null}
      </PaginationContent>
    </Pagination>
  );
}
