import { Stack } from "@mui/material";
import { palette } from "public/material";
import React, { memo } from "react";

interface RenderBlogState {
  content: string;
}

const RenderBlog = ({ content }: RenderBlogState) => {
  return (
    <Stack
      width="100%"
      id="news-detail-content"
      sx={{
        color: "white",
        overflowY: "auto",
        "& p": {
          my: 0,
        },
        "& h2, & h3, & h4": {
          my: 0,
        },
        "& a": {
          wordBreak: "break-all",
          "&:any-link": {
            textDecoration: "none",
          },
        },
        "& img": {
          height: "auto",
          maxWidth: "100%",
        },
        "& figure": {
          mx: "auto",
          "&.media": {
            width: "100%",
            height: "100%",
          },
        },
        "& blockquote": {
          borderLeft: `5px solid ${palette.colorReview?.color}`,
          fontStyle: "italic",
          mx: 0,
          px: 2.5,
        },
        "& table": {
          border: `1px double ${palette.colorReview?.borderColorTable}`,
          borderCollapse: "collapse",
          borderSpacing: 0,
          width: "100%",
          "& td": {
            border: `1px solid ${palette.colorReview?.borderTd}`,
            p: 0.75,
          },
        },
        "& pre": {
          background: palette.colorReview?.colorC7,
          border: `1px solid ${palette.colorReview?.colorC4}`,
          borderRadius: 0.5,
          p: 2,
        },
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default memo(RenderBlog);
