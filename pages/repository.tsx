import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useIssues } from "../hooks/useIssues";
import { BasicLayout } from "../layouts/BasicLayout";

const Repository = () => {
  const { ref, inView } = useInView();
  const router = useRouter();
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } = useIssues({
    owner: router.query.owner as string,
    repo: router.query.repo as string,
    page: 0,
    per_page: 10,
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <BasicLayout>
      <div className="overflow-hidden rounded-xl bg-white shadow-xl ring-2 ring-black">
        <ul role="list" className="divide-y divide-gray-200">
          {data?.pages.map((page) =>
            page.issues.map((issue) => (
              <li key={issue.id}>
                <Link href={issue.html_url}>
                  <div className="lock cursor-pointer transition-all hover:bg-teal-700 hover:py-4 hover:text-white">
                    <div className="flex flex-col p-4">
                      <h1 className="font-medium">{issue.title}</h1>
                      <div dangerouslySetInnerHTML={{ __html: issue.body }} />
                    </div>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
        <button
          ref={ref}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className={clsx(
            "inline-flex w-full items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium shadow-sm",
            !hasNextPage
              ? "bg-gray-300 text-black"
              : "bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          )}
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load Newer"
            : "Nothing more to load"}
        </button>
      </div>
    </BasicLayout>
  );
};

export default Repository;
