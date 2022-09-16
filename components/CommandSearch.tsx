import { Combobox, Dialog, Transition } from "@headlessui/react";
import {
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { Fragment, useEffect, useState } from "react";
import { useDebounce } from "../utils/useDebounce";
import { clsx } from "clsx";
import { useSearchRepositories } from "../hooks/useSearchRepositories";
import Link from "next/link";

export const CommandSearch = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex-1">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            id="search"
            name="search"
            className="block w-full rounded-full border-2 border-black bg-white py-2 pl-10 placeholder-gray-500"
            placeholder="Search repositories, organizations and more..."
            type="search"
            onFocus={(e) => {
              setIsOpen(true);
              e.currentTarget.blur();
            }}
          />
        </div>
      </div>
      <CommandSearchWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

interface CommandSearchWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommandSearchWindow = ({ isOpen, onClose }: CommandSearchWindowProps) => {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 1000);

  const { data, isFetching } = useSearchRepositories({
    query: debouncedQuery,
    page: 0,
    per_page: 10,
  });

  useEffect(() => {
    console.log(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <Transition.Root
      show={isOpen}
      as={Fragment}
      afterLeave={() => setQuery("")}
      appear
    >
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-stone-300/30 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel
              className={clsx(
                "mx-auto max-w-3xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white/75 shadow-2xl backdrop-blur transition-all",
                isFetching
                  ? "scale-95 ring-4 ring-purple-600 blur-[1px] transition-all"
                  : "ring-2 ring-black "
              )}
            >
              <div className="relative">
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-800"
                  aria-hidden="true"
                />
                <input
                  className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-800 focus:ring-0 sm:text-sm"
                  placeholder="Search..."
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              {(data?.items?.length ?? 0) > 0 && (
                <div className="flex flex-col p-2">
                  {data?.items?.map((item) => (
                    <Link
                      key={item.id}
                      href={`/repository?owner=${item.owner.login}&repo=${item.name}`}
                    >
                      <span
                        className="cursor-pointer rounded-md p-2 hover:bg-black/20"
                        onClick={() => onClose()}
                      >
                        <div>{item.full_name}</div>
                        <div className="flex flex-nowrap justify-between space-x-8 whitespace-nowrap text-sm text-gray-600">
                          <div className="min-w-0 overflow-hidden text-ellipsis">
                            {item.description}
                          </div>
                          <div className="text-xs">
                            open issues: {item.open_issues_count}
                          </div>
                        </div>
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
