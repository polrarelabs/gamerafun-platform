import { useAppDispatch, useAppSelector } from "@store/hooks";
import { upGallery } from "./action";
import { setDataGallery, setIsUpload, SetUrl } from "./reducer";

export const useGallery = () => {
  const dispatch = useAppDispatch();

  const uploadGallery = (body: FormData) => {
    dispatch(upGallery(body)).unwrap();
  };

  const resetGallery = () => {
    dispatch(setDataGallery());
  };

  const SetIsUpload = (value: boolean) => {
    dispatch(setIsUpload(value));
  };

  const setUrl = (value: string | null) => {
    dispatch(SetUrl(value));
  };

  const { dataGallery, loadingGallery, errorGallery, isUpload, url } =
    useAppSelector((state) => state.gallery);

  return {
    dataGallery,
    loadingGallery,
    errorGallery,
    uploadGallery,
    resetGallery,
    isUpload,
    SetIsUpload,
    setUrl,
    url,
  };
};
