import { useAppDispatch, useAppSelector } from "@store/hooks";
import { upGallery } from "./action";
import { setDataGallery } from "./reducer";

export const useGallery = () => {
  const dispatch = useAppDispatch();

  const uploadGallery = (body: FormData) => {
    dispatch(upGallery(body));
  };

  const resetGallery = () => {
    dispatch(setDataGallery());
  };

  const { dataGallery, loadingGallery, errorGallery } = useAppSelector(
    (state) => state.gallery,
  );

  return {
    dataGallery,
    loadingGallery,
    errorGallery,
    uploadGallery,
    resetGallery,
  };
};
