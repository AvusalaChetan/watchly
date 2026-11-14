import type {
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import Button from "../../../../shared/ui/components/Button";
import { GENRES, type Genre } from "../../types/video.types";
import Field from "./Field";

import type { FormDataTypes } from "../../types/video.types";
import { memo } from "react";

interface VideoFormProps {
  onSubmit: SubmitHandler<FormDataTypes>;
  form: {
    register: UseFormRegister<FormDataTypes>;
    handleSubmit: UseFormHandleSubmit<FormDataTypes>;
    errors: FieldErrors<FormDataTypes>;
    isSubmitting: boolean;
  };
  mode: "create" | "update";
}

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-500";

const VideoForm = ({onSubmit, form, mode}: VideoFormProps) => {
  const {register, handleSubmit, errors, isSubmitting} = form;


   return (
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
            minLength: {value: 3, message: "At least 3 characters"},
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
            minLength: {value: 20, message: "At least 20 characters"},
            maxLength: {value: 500, message: "At most 500 characters"},
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

      {mode === "create" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Video file" error={errors.video?.message}>
            <input
              type="file"
              accept="video/*"
              className={inputClass}
              {...register("video", {required: "Video file is required"})}
            />
          </Field>

          <Field label="Thumbnail" error={errors.thumbnail?.message}>
            <input
              type="file"
              accept="image/*"
              className={inputClass}
              {...register("thumbnail", {required: "Thumbnail is required"})}
            />
          </Field>
        </div>
      )}

      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          className={isSubmitting ? "bg-gray-400" : ""}
        >
          {isSubmitting ? (
            // <CircleLoading />
            'loading'
          ) : mode === "create" ? (
            "upload"
          ) : (
            "update conform"
          )}
        </Button>
      </div>
    </form>
  );
};

export default memo(VideoForm);
