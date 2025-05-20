import { memo } from "react";
import { Stack } from "@mui/material";
import LogoImg from "public/images/img-logo.png";
import AptosImg from "public/images/img-aptos.svg";
import UsdcImg from "public/images/img-usdc.svg";
import { Button, Text } from "@components/shared";
import Image, { StaticImageData } from "next/image";
import { Container, Label } from "@components/FormControl";
import { typography } from "public/material";
import { Currency } from "@constant/enum";

type RaisedTokenProps = {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  value?: string;
  description?: string;
  onChange: (name: string, value: string) => void;
};

const RaisedToken = (props: RaisedTokenProps) => {
  const { label, value, name, required, error, onChange, description } = props;

  return (
    <Container position="relative">
      {!!label && (
        <Label htmlFor={name} required={required} error={!!error}>
          {label}
        </Label>
      )}
      {!!description && (
        <Text variant="body2" pb={0.5} color="grey.400">
          {description}
        </Text>
      )}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        spacing={2}
        width="100%"
      >
        {DATA.map((item) => (
          <Button
            variant="outlined"
            fullWidth
            disabled={!!item?.isComingSoon}
            onClick={() => {
              onChange(name, item.name);
            }}
            key={item.name}
            color={value === item.name ? "primary" : "info"}
            sx={{ px: 2, py: 1, ...typography.subtitle2 }}
            startIcon={<Image src={item.icon} alt="" width={24} />}
          >
            {item.name}
            {!!item?.isComingSoon && (
              <>
                <br />
                <Text textTransform="initial" variant="body2">
                  (Coming soon)
                </Text>
              </>
            )}
          </Button>
        ))}
      </Stack>
    </Container>
  );
};

export default memo(RaisedToken);

const DATA: {
  name: string;
  icon: StaticImageData;
  isComingSoon?: boolean;
}[] = [
  { name: Currency.GAMERA, icon: LogoImg },
  { name: Currency.APT, icon: AptosImg },
  { name: Currency.USDC, icon: UsdcImg },
];
