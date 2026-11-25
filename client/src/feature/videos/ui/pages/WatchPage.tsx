import {useState} from "react";
import {Link, useParams} from "react-router";
import {formatDuration} from "../../../../shared/utils/formatDuration";
import {useVideo} from "../../hooks/videoHook";
import type {Genre} from "../../types/video.types";
import {ChatBox} from "../../../watch-together";

const WatchPage = () => {
  const {id: videoId} = useParams();
  const {video, isLoading, isError} = useVideo(videoId);
  const [expanded, setExpanded] = useState(false);

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-360 animate-pulse px-4 py-4">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="aspect-video w-full rounded-xl bg-(--surface)" />
          <div className="min-h-80 rounded-xl border border-(--border) bg-(--surface)" />
        </div>
        <div className="mt-4 h-6 w-2/3 rounded bg-(--surface)" />
        <div className="mt-2 h-4 w-1/3 rounded bg-(--surface)" />
      </div>
    );
  }

  if (isError || !video) {
    return (
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-16 text-center">
        <h1 className="text-xl font-semibold">Video not found</h1>
        <p className="text-sm text-(--muted)">
          It may have been removed, or the link is wrong.
        </p>
        <Link
          to="/home"
          className="text-sm font-medium text-(--primary) underline"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-360 space-y-4 px-4 py-4">
      
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_30rem]">
        <div className="aspect-video w-full overflow-hidden rounded-xl bg-(--bg) border border-(--border) ">
          <video
            src={video.videoUrl}
            poster={video.thumbnailUrl}
            controls
            playsInline
            className="size-full"
          />
        </div>

        <ChatBox />
      </div>

      <h1 className="text-xl font-semibold capitalize md:text-2xl">
        {video.title}
      </h1>

      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-(--muted)">
        <span>{formatDuration(video.duration)}</span>
        <span aria-hidden>-</span>
        <span>
          {new Date(video.createdAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
        <div className="flex flex-wrap gap-2">
          {video?.genre?.map((g: Genre) => (
            <span
              key={g}
              className="rounded-full border border-(--border) bg-(--surface) px-3 py-0.5 text-xs capitalize text-(--muted)"
            >
              {g}
            </span>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-(--border) bg-(--surface) p-3">
        <p
          className={`text-sm text-(--foreground) ${expanded ? "" : "line-clamp-3"}`}
        >
          {video.description}
        </p>
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mt-1 text-sm font-medium text-(--primary) hover:underline"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      </div>
    </div>
  );
};

export default WatchPage;
