import { memo } from "react";

const LoadingDot = () => {
  return (
    <span className="loading">
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </span>
  );
};

export default memo(LoadingDot);
