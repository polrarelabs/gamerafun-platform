import { memo } from "react";
import { Text, TextProps } from "@components/shared";

const Heading = (props: TextProps) => {
  return <Text variant="subtitle1" {...props} />;
};

export default memo(Heading);
