import { memo } from "react";
import { Button, ButtonProps, Text } from "@components/shared";

type TagProps = {
  label: string;
  active?: boolean;
} & Omit<ButtonProps, "color">;

const Tag = (props: TagProps) => {
  const { label, active, ...rest } = props;

  return (
    <Button
      variant="contained"
      size="small"
      sx={{ borderRadius: 1 }}
      css={{
        backgroundColor: active ? undefined : "grey.A700",
        hoverBackgroundColor: undefined,
        color: active ? "text.secondary" : "grey.400",
        hoverColor: "text.secondary",
      }}
      {...rest}
    >
      <Text variant="subtitle2" color="inherit">
        {label}
      </Text>
    </Button>
  );
};

export default memo(Tag);
