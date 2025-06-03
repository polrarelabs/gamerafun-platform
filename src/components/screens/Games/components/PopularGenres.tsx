"use client";

import { ClickWrapper, Image, Slider, Text } from "@components/shared";
import PopularIcon from "@icons/web3/PopularIcon";
import { Box, Stack } from "@mui/material";
import { useGame } from "@store/game";
import { palette } from "public/material";
import { memo, useEffect, useState } from "react";
import img from "public/images/img-local.png";
import { getImageSrc } from "@components/helper";

const PopularGenres = () => {
  const { genreItems, getGenres } = useGame();

  useEffect(() => {
    getGenres({});
  }, []);

  const [hover, setHover] = useState<boolean>(false);
  const [id, setId] = useState<number | null>(null);

  const handleHover = (index: number) => {
    setHover(true);
    setId(index);
  };

  const handleUnHover = () => {
    setHover(false);
    setId(null);
  };

  return (
    <Stack direction="column" gap={2} sx={{ width: "100%" }}>
      <Stack direction="row" alignItems="center" gap={2}>
        <PopularIcon sx={{ color: palette.colorGray }} />
        <Text color="white" fontSize="20px" fontWeight={700}>
          Popular Genres
        </Text>
      </Stack>
      {genreItems && genreItems.length > 6 ? (
        <Slider itemWidth={208} step={16}>
          {genreItems.map((item, index) => (
            <ClickWrapper key={index}>
              <Stack
                borderRadius={"8px"}
                position={"relative"}
                onMouseEnter={() => handleHover(index)}
                onMouseLeave={handleUnHover}
                width={`208px`}
                height="108px"
                // onClick={() => handleClick(item)}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
              >
                <Image
                  src={getImageSrc(item.media, img)}
                  alt={`img-${item.media}`}
                  size="100%"
                  aspectRatio={7 / 4}
                  sizes="960px"
                  containerProps={{
                    sx: {
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                      borderRadius: "16px",
                      border: "1px",
                      "& img": {
                        objectFit: "cover",
                        objectPosition: "center",
                      },
                      opacity: hover && id === index ? 1 : 0.6,
                      cursor: hover && id === index ? "pointer" : undefined,
                      transition: "all 0.2s ease-in-out",
                    },
                  }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    background:
                      "linear-gradient(180deg,rgba(33, 43, 56, 0) 0%, rgba(33, 43, 56, 1) 97%, rgba(33, 43, 56, 1) 100%) !important",
                    width: "100%",
                    height: "100%",
                    bottom: 0,
                    opacity: 0.2,
                    display: hover && id === index ? "block" : "none",
                    transition: "all 0.2s ease-in-out",
                  }}
                />
                <Text
                  sx={{
                    position: "absolute",
                    left: "50%",
                    bottom: 0,
                    translate: "-50% -50%",
                    fontWeight: 700,
                  }}
                >
                  {item.name}
                </Text>
              </Stack>
            </ClickWrapper>
          ))}
        </Slider>
      ) : (
        <Stack direction={"row"} gap={2} alignItems={"center"}>
          {genreItems &&
            genreItems.map((item, index) => {
              return (
                <Stack
                  key={index}
                  borderRadius={"8px"}
                  position={"relative"}
                  onMouseEnter={() => handleHover(index)}
                  onMouseLeave={handleUnHover}
                  width={`208px`}
                  height="108px"
                  // onClick={() => handleClick(item)}
                  sx={{
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                >
                  <Image
                    src={getImageSrc(item.media, img)}
                    alt={`img-${item.media}`}
                    size="100%"
                    aspectRatio={7 / 4}
                    sizes="960px"
                    containerProps={{
                      sx: {
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                        borderRadius: "16px",
                        border: "1px",
                        "& img": {
                          objectFit: "cover",
                          objectPosition: "center",
                        },
                        opacity: hover && id === index ? 1 : 0.6,
                        cursor: hover && id === index ? "pointer" : undefined,
                        transition: "all 0.2s ease-in-out",
                      },
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      background:
                        "linear-gradient(180deg,rgba(33, 43, 56, 0) 0%, rgba(33, 43, 56, 1) 97%, rgba(33, 43, 56, 1) 100%) !important",
                      width: "100%",
                      height: "100%",
                      bottom: 0,
                      opacity: 0.2,
                      display: hover && id === index ? "block" : "none",
                      transition: "all 0.2s ease-in-out",
                    }}
                  />
                  <Text
                    sx={{
                      position: "absolute",
                      left: "50%",
                      bottom: 0,
                      translate: "-50% -50%",
                      fontWeight: 700,
                    }}
                  >
                    {item.name}
                  </Text>
                </Stack>
              );
            })}
        </Stack>
      )}
    </Stack>
  );
};

export default memo(PopularGenres);
