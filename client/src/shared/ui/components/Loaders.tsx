import Skeleton from "react-loading-skeleton";

const CircleLoading = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-(--border) border-t-(--primary)" />
    </div>
  );
};

export const PageLoader = () => {
  return <Skeleton baseColor="var(--surface)" highlightColor="var(--border)" />;
};

export const AuthPageLoader = () => {
  return (
    <section
      className="flex min-h-screen items-center justify-center bg-(--bg) px-4 py-8"
      role="status"
      aria-label="Loading authentication page"
    >
      <div className="w-full max-w-md rounded-2xl border border-(--border) bg-(--surface) p-8 shadow-lg">
        <div className="mb-8 text-center">
          <Skeleton
            width={220}
            height={36}
            borderRadius={8}
            baseColor="var(--border)"
            highlightColor="var(--muted)"
          />
          <div className="mt-3">
            <Skeleton
              width={260}
              height={16}
              borderRadius={6}
              baseColor="var(--border)"
              highlightColor="var(--muted)"
            />
          </div>
        </div>

        <div className="space-y-5" aria-hidden="true">
          {[0, 1, 2].map((field) => (
            <div key={field}>
              <Skeleton
                width={72}
                height={16}
                borderRadius={6}
                baseColor="var(--border)"
                highlightColor="var(--muted)"
              />
              <div className="mt-2">
                <Skeleton
                  height={44}
                  borderRadius={8}
                  baseColor="var(--border)"
                  highlightColor="var(--muted)"
                />
              </div>
            </div>
          ))}

          <div className="pt-1">
            <Skeleton
              height={44}
              borderRadius={8}
              baseColor="var(--primary)"
              highlightColor="var(--primary-hover)"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Skeleton
            width={210}
            height={16}
            borderRadius={6}
            baseColor="var(--border)"
            highlightColor="var(--muted)"
          />
        </div>
      </div>
    </section>
  )
}


export default CircleLoading;
