import { Breadcrumbs } from "@mui/material";
import React, { memo } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Link from "@components/Link";
import Text from "./Text";
import { palette } from "public/material";

export interface BreadcumbsItem {
  href?: string;
  title: string;
}

export interface BreadcumbsProps {
  breadcumbs: BreadcumbsItem[];
}

const Breadcumbs = ({ breadcumbs }: BreadcumbsProps) => {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      aria-label="breadcrumb"
      sx={{
        color: palette.textBreadcrumb,
      }}
    >
      {breadcumbs.map((item, index) => {
        if (item.href) {
          return (
            <Link
              key={index}
              underline="hover"
              color="inherit"
              href={item.href}
            >
              <Text
                sx={{
                  color: "text.primary",
                  textTransform: "uppercase",
                }}
              >
                {item.title}
              </Text>
            </Link>
          );
        } else
          return (
            <Text
              key={index}
              sx={{
                color: "text.primary",
                textTransform: "uppercase",
              }}
            >
              {item.title}
            </Text>
          );
      })}
    </Breadcrumbs>
  );
};

export default memo(Breadcumbs);
