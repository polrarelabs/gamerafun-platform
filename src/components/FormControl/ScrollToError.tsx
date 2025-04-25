import { memo, useEffect } from "react";

type ScrollToErrorProps = {
  submitting: boolean;
};

const ScrollToError = ({ submitting }: ScrollToErrorProps) => {
  useEffect(() => {
    const el = document.querySelector(".form-error");
    el?.scrollIntoView();
  }, [submitting]);

  return null;
};

export default memo(ScrollToError);
