import { memo } from "react";
import { Text, TextProps } from "components/shared";

type LabelProps = {
  htmlFor: string;
  required?: boolean;
  error?: boolean;
} & TextProps;

const Label = (props: LabelProps) => {
  const { required, children, className, error, ...rest } = props;

  return (
    <Text
      variant="subtitle2"
      component="label"
      minHeight={27.12}
      noWrap
      width="fit-content"
      className={`${error ? "form-error" : ""} ${className}`}
      {...rest}
    >
      {children}
      {Boolean(required) && (
        <Text component="span" color="error.main" pl={0.5}>
          *
        </Text>
      )}
    </Text>
  );
};

export default memo(Label);
