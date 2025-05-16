import { memo } from "react";
import { Image, ImageProps } from "@components/shared";
import LogoImg from "public/images/img-logo.png";
import LogoTextImg from "public/images/img-logo-text.png";
import Link, { LinkProps } from "@components/Link";
import { HOME_PATH } from "@constant/paths";

type LogoProps = {
  linkProps?: Partial<LinkProps>;
  type?: "short" | "long";
  size?: number;
} & Partial<ImageProps>;

const Logo = (props: LogoProps) => {
  const { linkProps, type = "long", size = 40, ...rest } = props;
  return (
    <Link
      component={Link}
      sx={{
        height: size,
        display: "flex",
        alignItems: "center",
      }}
      href={HOME_PATH}
      {...linkProps}
    >
      <Image
        src={type === "short" ? LogoImg : LogoTextImg}
        alt="Noctra logo"
        height={type === "short" ? size : ""}
        priority
        {...rest}
      />
    </Link>
  );
};

export default memo(Logo);

const ASPECT_RATIO = 152 / 48.14;
