import {useEffect} from "react";
import Button from "../../../../shared/ui/components/Button";
import {useVideos} from "../../hooks/videoHook";
import type {Video} from "../../types/videoTypes";
import VideoCard from "../components/VideoCard";

const VideoListPage = () => {
  const {
    videos,
    isLoading,

    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useVideos();

  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

      if (nearBottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return <>loading...</>;
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-6">
      <h1 className="mb-4 text-xl font-semibold md:text-2xl">All Videos</h1>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-5">
        {videos?.map((v: Video) => (
          <VideoCard
            key={v._id}
            id={v._id}
            title={v.title}
            thumbnailUrl={v.thumbnailUrl}
            duration={v.duration}
            genre={v.genre ?? []}
          />
        ))}
      </div>

      {hasNextPage && (
        <div className="mt-8 flex justify-center">
          <Button
            variant="primary"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "Load more"}
          </Button>
        </div>
      )}
    </section>
  );
};

export default VideoListPage;
