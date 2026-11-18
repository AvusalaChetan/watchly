import {LuMoveRight} from "react-icons/lu";
import Button from "../../../../shared/ui/components/Button";
import type {Video} from "../../types/video.types";
import {Link} from "react-router";

type Props = {
  result: Video[] | undefined;
  error: Error | null;
};

const SearchList = ({result, error}: Props) => {
  console.log(result, error);
  return (
    <div className="max-h-[min(25rem,80vh)]  rounded-xl border overflow-y-scroll border-slate-200 bg-white shadow-xl">
      <div className="divide-y divide-slate-100">
        {result !== undefined &&
          result.slice(0, 5).map((item: Video) => (
            <Link
              to={`/video/watch/${item?._id}`}
              key={item?.title}
              className="flex min-h-15 items-center gap-3 px-3 py-2.5 transition-colors odd:bg-slate-50 hover:bg-slate-100 sm:px-4"
            >
              <div className="size-14 shrink-0 overflow-hidden rounded-md bg-slate-200 [&_img]:size-full! [&_img]:object-cover!">
                <img
                  src={item.thumbnailUrl}
                  alt=""
                  className="w-[20%] h-full"
                  loading="eager"
                />
              </div>
              <div className="min-w-0">
                <h4 className="truncate text-sm font-semibold capitalize text-slate-900">
                  {item.title}
                </h4>
                <div className="mt-1  truncate text-xs capitalize text-slate-500 flex gap-2">
                  {item.genre?.map((g) => (
                    <span>{g}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
      </div>
      {result !== undefined && (
        <div className="flex items-center  border-t border-slate-200 bg-white p-2">
          <>
            {result?.length > 0 ? (
              <Button className="w-full justify-center text-slate-600 hover:bg-slate-100">
                View all <LuMoveRight aria-hidden="true" />
              </Button>
            ) : (
              <p className="text-center w-full text-md ">
                search result is not found
              </p>
            )}
          </>
        </div>
      )}
    </div>
  );
};

export default SearchList;
