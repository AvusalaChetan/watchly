import { useForm } from "react-hook-form";
import {
  GENRES,
  type Genre,
  type UploadFormData,
} from "../../../../shared/types/videos/video.types";
import Button from "../../../../shared/ui/components/Button";
import { useUpload } from "../../hooks/hook";

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500";

const Field = ({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-1">
    <label className="text-sm font-medium">{label}</label>
    {children}
    {error && <p className="text-xs text-red-600">{error}</p>}
  </div>
);

const UploadVideo = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<UploadFormData>();

  const { upload } = useUpload();
  
   const onSubmit = async (data:UploadFormData)=>{
    await upload(data)
    reset()
   }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6">
      <h1 className="text-xl font-semibold md:text-2xl">Upload video</h1>
      <p className="mb-6 text-sm text-slate-500">
        Add a new video to the library
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 rounded-lg border border-slate-200 p-4 md:p-6"
      >
        <Field label="Title" error={errors.title?.message}>
          <input
            type="text"
            placeholder="Enter a title"
            className={inputClass}
            {...register("title", {
              required: "Title is required",
              minLength: { value: 3, message: "At least 3 characters" },
            })}
          />
        </Field>

        <Field label="Description" error={errors.description?.message}>
          <textarea
            rows={4}
            placeholder="What is this video about?"
            className={inputClass}
            {...register("description", {
              required: "Description is required",
              minLength: { value: 20, message: "At least 20 characters" },
              maxLength: { value: 500, message: "At most 500 characters" },
            })}
          />
        </Field>

        <Field label="Genres" error={errors.genre?.message}>
          <div className="flex flex-wrap gap-2">
            {GENRES.map((g: Genre) => (
              <label
                key={g}
                className="flex cursor-pointer items-center gap-2 rounded-full border border-slate-300 px-3 py-1 text-sm capitalize has-checked:border-slate-900 has-checked:bg-slate-900 has-checked:text-white"
              >
                <input
                  type="checkbox"
                  value={g}
                  className="sr-only"
                  {...register("genre", {
                    required: "Select at least one genre",
                  })}
                />
                {g}
              </label>
            ))}
          </div>
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Video file" error={errors.video?.message}>
            <input
              type="file"
              accept="video/*"
              className={inputClass}
              {...register("video", { required: "Video file is required" })}
            />
          </Field>

          <Field label="Thumbnail" error={errors.thumbnail?.message}>
            <input
              type="file"
              accept="image/*"
              className={inputClass}
              {...register("thumbnail", { required: "Thumbnail is required" })}
            />
          </Field>
        </div>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isSubmitting ? "Uploading..." : "Upload video"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UploadVideo;
