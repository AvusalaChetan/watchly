import {Link} from "react-router";
import {formatDuration} from "../../../../shared/utils/formatDuration";
import type {Genre} from "../../types/video.types";
type VideoCardProps = {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: number;
  genre?: Genre[];
};

const VideoCard = ({
  id,
  title,
  thumbnailUrl,
  duration,
  genre,
}: VideoCardProps) => {
  return (
    <Link
      to={`/video/watch/${id}`}
      className="group block overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
    >
      <div className="relative aspect-video overflow-hidden bg-slate-200">
        <img
          src={thumbnailUrl}
          alt={title}
          fetchPriority="high"
          className="size-full object-cover transition-transform duration-300 group-hover:scale-105 aspect-2/3"
        />
        <span className="absolute bottom-1 right-1 rounded bg-black/80 px-1.5 py-0.5 text-xs text-white">
          {formatDuration(duration)}
        </span>
      </div>

      <div className="space-y-1 p-2">
        <h2 className="line-clamp-1 text-sm font-medium capitalize text-slate-900">
          {title}
        </h2>
        {genre && genre.length > 0 && (
          <p className="line-clamp-1 text-xs capitalize text-slate-500 ">
            <span className="font-bold">GENRES:</span> {genre.join(", ")}
          </p>
        )}
      </div>
    </Link>
  );
};

export default VideoCard;
