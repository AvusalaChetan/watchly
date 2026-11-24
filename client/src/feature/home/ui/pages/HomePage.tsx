import SideHeading from "../../../../shared/ui/components/SideHeading";
import {useVideos, VideoCard, type Genre} from "../../../videos";

const genres: Genre[] = [
  "action",
  "comedy",
  "drama",
  "horror",
  "romance",
  "thriller",
  "sci-fi",
  "documentary",
];

const HomePage = () => {
  const {videos, isLoading, isError} = useVideos();

  if (isLoading) {
    return <p className="p-4 text-(--muted)">Loading videos...</p>;
  }

  if (isError) {
    return (
      <p className="p-4 text-(--muted)">
        Could not load videos. Please try again later.
      </p>
    );
  }

  if (videos.length === 0) {
    return <p className="p-4 text-(--muted)">No videos available yet.</p>;
  }

  return (
    <div className="flex w-full flex-col gap-8 overflow-x-hidden pb-8">
      <section
        aria-labelledby="home-welcome-title"
        className="mt-4 flex aspect-video max-h-[50vh] w-full items-center justify-center rounded-xl border border-(--border) bg-(--surface) px-6 text-center md:aspect-21/9"
      >
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-(--primary)">
            Your next favorite starts here
          </p>
          <h1
            id="home-welcome-title"
            className="text-3xl font-bold text-(--foreground) md:text-5xl"
          >
            Welcome to Watchly
          </h1>
          <p className="mt-3 text-(--muted) md:text-lg">
            Explore movies by genre and find something great to watch.
          </p>
        </div>
      </section>

      <section className="space-y-8 overflow-x-hidden px-4 w-[90%] mx-auto" >
        {genres.map((genre) => {
          const genreVideos = videos.filter((video) =>
            video.genre?.includes(genre),
          );

          if (genreVideos.length === 0) return null;

          return (
            <section key={genre}>
              <SideHeading text={genre} />

              {genreVideos.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
                  {genreVideos.map((video) => (
                    <VideoCard
                      key={video._id}
                      id={video._id}
                      title={video.title}
                      thumbnailUrl={video.thumbnailUrl}
                      duration={video.duration}
                    />
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </section>
    </div>
  );
};

export default HomePage;
