import VideoCard from "../../../feature/videos/ui/components/VideoCard";
 
const HomePage = () => {
  const arrImg = [
    "https://imgs.search.brave.com/Z8xMley-KTwR3bW7iO_jSoNMNeu_XNpJV5XZgEnb3PQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly80a3dh/bGxwYXBlcnMuY29t/L2ltYWdlcy93YWxs/cy90aHVtYnMvMjc1/ODEuanBn",

    "https://imgs.search.brave.com/jirMSqwyusJ7uJfvg2TI3PIfJ632BzYm3bdwweW0wSA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9taXIt/czMtY2RuLWNmLmJl/aGFuY2UubmV0L3By/b2plY3RfbW9kdWxl/cy9oZF93ZWJwL2Q2/ODM3ZjEyMDIyMzU1/MS42MThhMWNmODlh/ZTI5LnBuZw",

    "https://imgs.search.brave.com/Eq49fx_1AFyH6whplZ7hAndW2-33kFWuYGN91__L4lk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tdmVj/dG9yL2FuaW1lLWNv/bG9yZnVsLWZlc3Rp/dmFsLXBvc3Rlci1k/ZXNpZ25fMTUwOTcy/LTE1MzAuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MCZxPTgw",
    "https://imgs.search.brave.com/Z8xMley-KTwR3bW7iO_jSoNMNeu_XNpJV5XZgEnb3PQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly80a3dh/bGxwYXBlcnMuY29t/L2ltYWdlcy93YWxs/cy90aHVtYnMvMjc1/ODEuanBn",

    "https://imgs.search.brave.com/jirMSqwyusJ7uJfvg2TI3PIfJ632BzYm3bdwweW0wSA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9taXIt/czMtY2RuLWNmLmJl/aGFuY2UubmV0L3By/b2plY3RfbW9kdWxl/cy9oZF93ZWJwL2Q2/ODM3ZjEyMDIyMzU1/MS42MThhMWNmODlh/ZTI5LnBuZw",

    "https://imgs.search.brave.com/Eq49fx_1AFyH6whplZ7hAndW2-33kFWuYGN91__L4lk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tdmVj/dG9yL2FuaW1lLWNv/bG9yZnVsLWZlc3Rp/dmFsLXBvc3Rlci1k/ZXNpZ25fMTUwOTcy/LTE1MzAuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MCZxPTgw",

    "https://imgs.search.brave.com/Eq49fx_1AFyH6whplZ7hAndW2-33kFWuYGN91__L4lk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/bWFnbmlmaWMuY29t/L3ByZW1pdW0tdmVj/dG9yL2FuaW1lLWNv/bG9yZnVsLWZlc3Rp/dmFsLXBvc3Rlci1k/ZXNpZ25fMTUwOTcy/LTE1MzAuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MCZxPTgw",

    "https://imgs.search.brave.com/Z8xMley-KTwR3bW7iO_jSoNMNeu_XNpJV5XZgEnb3PQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly80a3dh/bGxwYXBlcnMuY29t/L2ltYWdlcy93YWxs/cy90aHVtYnMvMjc1/ODEuanBn",

    "https://imgs.search.brave.com/jirMSqwyusJ7uJfvg2TI3PIfJ632BzYm3bdwweW0wSA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9taXIt/czMtY2RuLWNmLmJl/aGFuY2UubmV0L3By/b2plY3RfbW9kdWxl/cy9oZF93ZWJwL2Q2/ODM3ZjEyMDIyMzU1/MS42MThhMWNmODlh/ZTI5LnBuZw",
  ];
  return (
    <div className="flex flex-col gap-8 pb-8 w-full overflow-x-hidden">
      <section className="mt-4 aspect-video max-h-[60vh] w-full rounded-xl border border-(--border) bg-(--surface) md:aspect-21/9">
        {/* hero / featured video */}
      </section>

      <section className="px-4 overflow-x-hidden">
        <h2 className="mb-4 text-xl font-semibold text-(--foreground) md:text-2xl">
          Latest Movies
        </h2>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {arrImg.map((_, i) => (
            <div key={i} className="min-w-0">
              <VideoCard
                id="1"
                title="Avengers Dooms Day"
                thumbnailUrl={arrImg[i]}
                duration={33}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
