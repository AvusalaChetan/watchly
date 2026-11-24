import {
  LuFilm,
  LuPencil,
  LuTags,
  LuTrash2,
  LuUpload,
  LuUsers,
} from "react-icons/lu";
import {Link, useNavigate} from "react-router";
import Button from "../../../../shared/ui/components/Button";
import {formatDuration} from "../../../../shared/utils/formatDuration";
import {useDeleteVideo, useVideos} from "../../../videos/index";
import CircleLoading from "../../../../shared/ui/components/Loaders";

const stats = [
  {label: "Total videos", value: "41", icon: LuFilm},
  {label: "Genres", value: "7", icon: LuTags},
  {label: "Users", value: "128", icon: LuUsers},
];

const Dashboard = () => {
  const {videos, isLoading} = useVideos();
  const {deleteVideo, deletingVideoId} = useDeleteVideo();
  const recent = videos.slice(0, 10);
  const navigate = useNavigate();

  return (
    <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold md:text-2xl">Dashboard</h1>
          <p className="text-sm text-(--muted)">Manage your videos</p>
        </div>
        <Link
          to="/admin/upload"
          className="inline-flex items-center gap-2 rounded-lg bg-(--primary) px-4 py-2 text-sm font-medium text-white transition hover:bg-(--primary-hover)"
        >
          <LuUpload size={16} />
          Upload video
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map(({label, value, icon: Icon}) => (
          <div
            key={label}
            className="rounded-lg border border-(--border) bg-(--surface) p-4"
          >
            <div className="flex items-center justify-between text-(--muted)">
              <span className="text-sm">{label}</span>
              <Icon size={18} />
            </div>
            <p className="mt-2 text-2xl font-semibold">{value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-lg border border-(--border) bg-(--surface)">
        <div className="flex items-center justify-between border-b border-(--border) px-4 py-3">
          <h2 className="font-semibold">Recent uploads</h2>
          {/* <Link
            to="/admin/videos"
            className="text-sm font-medium hover:underline"
          >
            View all
          </Link> */}
        </div>

        {isLoading ? (
          <p className="p-4 text-sm text-(--muted)">Loading...</p>
        ) : recent.length === 0 ? (
          <p className="p-4 text-sm text-(--muted)">
            No videos yet. Upload your first one.
          </p>
        ) : (
          <ul className="divide-y divide-(--border)">
            {recent.map((v) => (
              <li
                key={v._id}
                className="flex items-center justify-between gap-3 p-3"
              >
                <Link
                  to={`/video/watch/${v._id}`}
                  className="flex items-center gap-3 p-3"
                >
                  <img
                    src={v.thumbnailUrl}
                    alt={v.title}
                    loading="lazy"
                    className="aspect-video w-24 shrink-0 rounded object-cover sm:w-32"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium capitalize">
                      {v.title}
                    </p>
                    <p className="truncate text-xs capitalize text-(--muted)">
                      {v.genre !== undefined && v.genre.join(" , ")}{" "}
                      <span></span>
                      {formatDuration(v.duration)}
                    </p>
                    <p className="text-xs text-(--muted)">
                      {new Date(v.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Link>
                <div className="flex shrink-0 gap-1">
                  <Button
                    variant="icon"
                    aria-label={`Edit ${v.title}`}
                    onClick={() => navigate(`/admin/update/${v._id}`)}
                  >
                    <LuPencil size={18} />
                  </Button>
                  <Button
                    variant="icon"
                    aria-label={`Delete ${v.title}`}
                    onClick={() => deleteVideo(v._id)}
                  >
                    {deletingVideoId === v._id ? (
                      <span>
                        <CircleLoading />
                      </span>
                    ) : (
                      <LuTrash2 size={18} />
                    )}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
