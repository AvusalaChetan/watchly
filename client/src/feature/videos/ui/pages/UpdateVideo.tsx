import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { useUpdateVideo, useVideo } from "../../hooks/videoHook";
import { type FormDataTypes } from "../../types/video.types";
import VideoForm from "../components/VideoForm";

const UpdateVideo = () => {

  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
    reset,
  } = useForm<FormDataTypes>({
    defaultValues: {
      title: "",
      description: "",
      genre: [],
    },
  });

  const navigate  = useNavigate()
  
  const {id: videoId} = useParams<Readonly<{id: string | undefined}>>();

 
  const {video} = useVideo(videoId);

  useEffect(() => {
    if (video) {
      reset({
        title: video.title,
        description: video.description,
        genre: video.genre,
      });
    }
  }, [video, reset]);

  const {updateVideo} = useUpdateVideo();

  const onSubmit = async (data: FormDataTypes): Promise<void> => {
    if (!videoId) return;
    await updateVideo(data, videoId);
    reset();
    navigate('/admin/dashboard')
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-6">
      <div>
        <h1 className="text-xl font-semibold md:text-2xl capitalize">
          Update video
        </h1>
        <p className="mb-6 text-sm text-slate-500">edit a video</p>
      </div>
      <div></div>

      <VideoForm
        onSubmit={onSubmit}
        mode="update"
        form={{register, handleSubmit, errors, isSubmitting}}
      />
    </div>
  );
};

export default UpdateVideo;
