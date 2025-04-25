import { memo } from "react";
import { Text, TextProps } from "components/shared";

const Message = (props: TextProps) => {
  return <Text variant="body2" fontSize={13} color="error" {...props} />;
};

export default memo(Message);
