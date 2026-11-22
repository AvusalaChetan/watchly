import type { Dispatch, SetStateAction } from "react";
import { LuMoveRight } from "react-icons/lu";
import { useNavigate } from "react-router";
import Button from "../../../../shared/ui/components/Button";
import type { Video } from "../../types/video.types";

type Props = {
  result: Video[] | undefined;
  error: Error | null;
  isLoading: boolean;
  setSearchInput: Dispatch<SetStateAction<string>>;
};

const SearchList = ({result, setSearchInput}: Props) => {
  const navigate = useNavigate();

  const handileNavigate = (id:string) => {
    navigate(`/video/watch/${id}`);
    setSearchInput('')
  };
  return (
    <div className="max-h-[min(25rem,80vh)] overflow-y-scroll rounded-xl border border-(--border) bg-(--surface) shadow-xl">
      <div className="divide-y divide-(--border)">
        {result !== undefined &&
          result.slice(0, 5).map((item: Video) => (
            <div
               key={item?.title}
              onClick={()=>handileNavigate(item?._id)}
              className="flex min-h-15 items-center gap-3 px-3 py-2.5 transition-colors odd:bg-white/5 hover:bg-white/10 sm:px-4"
            >
              <div className="size-14 shrink-0 overflow-hidden rounded-md bg-(--bg) [&_img]:size-full! [&_img]:object-cover!">
                <img
                  src={item.thumbnailUrl}
                  alt=""
                  className="w-[20%] h-full"
                  loading="eager"
                />
              </div>
              <div className="min-w-0">
                <h4 className="truncate text-sm font-semibold capitalize text-(--foreground)">
                  {item.title}
                </h4>
                <div className="mt-1 flex truncate gap-2 text-xs capitalize text-(--muted)">
                  {item.genre?.map((g) => (
                    <span>{g}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </div>
      {result !== undefined && (
        <div className="flex items-center border-t border-(--border) bg-(--surface) p-2">
          <>
            {result?.length > 0 ? (
              <Button className="w-full justify-center text-(--primary) hover:bg-white/5">
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
