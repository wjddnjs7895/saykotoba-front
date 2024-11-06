import api from "@lib/api";
import { useMutation } from "@tanstack/react-query";

export type PostAudioForResponseRequest = {
  formData: FormData;
};

export type PostAudioForResponseResponse = {
  id: number;
  message: string;
  isUser: boolean;
  createdAt: Date;
}[];

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

const postAudioForResponse = (
  postAudioForResponseRequest: PostAudioForResponseRequest
): Promise<PostAudioForResponseResponse> => {
  console.log(postAudioForResponseRequest);
  return api.post(
    `/conversation/audio-response`,
    postAudioForResponseRequest.formData,
    config
  );
};

export const usePostAudioForResponse = () => {
  return useMutation({
    mutationKey: ["postAudioForResponse"],
    mutationFn: (postAudioForResponseRequest: PostAudioForResponseRequest) =>
      postAudioForResponse(postAudioForResponseRequest),
  });
};
