import {useForm} from "react-hook-form";
import {useUploadVideo} from "../../hooks/videoHook";
import {type FormDataTypes} from "../../types/video.types";
import VideoForm from "../components/VideoForm";

const UploadVideo = () => {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset,
  } = useForm<FormDataTypes>();

  const {upload} = useUploadVideo();

  const onSubmit = async (data: FormDataTypes): Promise<void> => {
    await upload(data);
    reset();
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6">
      <h1 className="text-xl font-semibold md:text-2xl">Upload video</h1>
      <p className="mb-6 text-sm text-slate-500">
        Add a new video to the library
      </p>

      <VideoForm
        onSubmit={onSubmit}
        mode='create'
        form={{register, handleSubmit, errors, isSubmitting}}
      />
    </div>
  );
};

export default UploadVideo;
