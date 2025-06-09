"use client";

import { Button, DialogShare, Text } from "@components/shared";
// import Snackbar from '@components/Snackbar'
import { formatMMMMDoYYYY } from "@components/helper";
import useBreakpoint from "@hooks/useBreakpoint";
import CircleIcon from "@icons/common/CircleIcon";
import { Stack } from "@mui/material";
import { useBlog } from "@store/new";
import { usePathname } from "next/navigation";
import { palette } from "public/material";
import { memo, useState } from "react";
import { PiShareFat } from "react-icons/pi";
import Related from "./Related";

const NewsDetail = () => {
  const { blogId } = useBlog();
  const [open, setOpen] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const pathname = usePathname();
  const { isMdSmaller } = useBreakpoint();
  return (
    <Stack direction={"column"} gap={2}>
      <Stack
        direction={{ md: "row", xs: "column" }}
        gap={3}
        alignItems={"start"}
      >
        {isMdSmaller && (
          <Stack flex={2} width={"100%"}>
            {blogId.game && blogId.game.length > 0 && (
              <Related
                relateBy="game"
                title="Related Games"
                dataGame={blogId.game}
              />
            )}
          </Stack>
        )}
        <Stack flex={6} gap={2}>
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
            dangerouslySetInnerHTML={{
              __html: blogId.content,
            }}
          />
          <Stack direction={"row"} justifyContent={"center"}>
            <Button
              variant="contained"
              sx={{
                width: "fit-content",
                borderRadius: "8px !important",
                height: "40px !important",
                color: `${palette.greenColorText} !important`,
                background: `${palette.greenColorButton} !important`,
                "&:hover": {
                  color: "black !important",
                  background: `${palette.greenColorText} !important`,
                },
              }}
              size={"small"}
              fullWidth
              onClick={handleClickOpen}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
            >
              <Stack
                direction={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={0.5}
              >
                <Text
                  color={hover ? "black !important" : palette.greenColorText}
                >
                  Share this article
                </Text>
                <PiShareFat />
              </Stack>
            </Button>
          </Stack>
          <Stack width={"100%"} direction={"row"} alignItems={"center"}>
            <hr
              style={{
                width: "100%",
                border: "none",
                borderTop: `1px solid ${palette.colorRelate?.linearHr}`,
                // margin: 0,
              }}
            />
          </Stack>

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack
              direction={{ md: "row", xs: "column" }}
              alignItems={{ md: "center", xs: "start" }}
              gap={1}
            >
              {blogId.tags &&
                blogId.tags.map((item, index) => {
                  return (
                    <Stack
                      key={index}
                      direction={"row"}
                      gap={1}
                      alignItems={"center"}
                      border={`1px solid ${palette.colorBorderTag}`}
                      p={"4px 8px"}
                      bgcolor={palette.colorBorderTag}
                      borderRadius={"4px"}
                      width={"fit-content"}
                    >
                      <Text
                        textTransform={"uppercase"}
                        color={palette.greenColorText}
                        fontSize={"12px"}
                        fontWeight={600}
                      >
                        {item}
                      </Text>
                    </Stack>
                  );
                })}
            </Stack>

            <Stack
              direction={{ md: "row", xs: "column" }}
              alignItems={{ md: "center", xs: "start" }}
              gap={2}
            >
              <Stack direction={"row"} gap={1}>
                <Text
                  textTransform={"uppercase"}
                  color={palette.colorGray}
                  fontSize={"14px"}
                >
                  updated:
                </Text>
                <Text
                  textTransform={"uppercase"}
                  color={palette.textWhite}
                  fontSize={"14px"}
                >
                  {formatMMMMDoYYYY(blogId.publicDate)}
                </Text>
              </Stack>

              {!isMdSmaller && (
                <CircleIcon
                  sx={{
                    fontSize: 3,
                    color: palette.textWhite,
                  }}
                />
              )}
              <Stack direction={"row"} gap={1}>
                <Text
                  textTransform={"uppercase"}
                  color={palette.colorGray}
                  fontSize={"14px"}
                >
                  posted:
                </Text>
                <Text
                  textTransform={"uppercase"}
                  color={palette.textWhite}
                  fontSize={"14px"}
                >
                  {formatMMMMDoYYYY(blogId.createAt ?? "")}
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        {!isMdSmaller && (
          <Stack flex={2}>
            {blogId.game && blogId.game.length > 0 && (
              <Related
                relateBy="game"
                title="Related Games"
                dataGame={blogId.game}
              />
            )}
          </Stack>
        )}
      </Stack>
      <DialogShare open={open} setOpen={setOpen} pathname={pathname} />
    </Stack>
  );
};

export default memo(NewsDetail);
