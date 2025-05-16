import { Box, IconButton, Modal, Stack } from "@mui/material";
import logoGame from "public/images/img-logo.png";
import { Image, Text } from "@components/shared";
import XIcon from "@icons/XIcon";
import TelegramIcon from "@icons/TelegramIcon";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Link from "next/link";
import FacebookIcon from "@icons/FacebookIcon";
import RedditIcon from "@icons/RedditIcon";
import WhatsAppIcon from "@icons/WhatsAppIcon";
interface PropsModalShare {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalShare = ({ open, setOpen }: PropsModalShare) => {
  const YOUR_URL = "https://gam3s.gg/earth-from-another-sun/";
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleCopy = () => {
    try {
      navigator.clipboard.writeText("https://gam3s.gg/earth-from-another-sun/");
    } catch (error) {
      console.error("Error copying to clipboard: ", error);
    }
  };
  interface IconShare {
    label: string;
    url: string;
    icon: React.ReactNode;
  }

  const listIconShare: IconShare[] = [
    {
      label: "X",
      url: `https://t.me/share/url?url=${encodeURIComponent(YOUR_URL)}`,
      icon: <XIcon sx={{ width: "32px", height: "32px", p: "0 !important" }} />,
    },
    {
      label: "Telegram",
      url: `https://t.me/share/url?url=${encodeURIComponent(YOUR_URL)}`,
      icon: (
        <TelegramIcon
          sx={{ width: "32px", height: "32px", p: "0 !important" }}
        />
      ),
    },
    {
      label: "Reddit",
      url: `https://www.reddit.com/submit?url=${YOUR_URL}`,
      icon: (
        <RedditIcon sx={{ width: "32px", height: "32px", p: "0 !important" }} />
      ),
    },
    {
      label: "Facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${YOUR_URL}`,
      icon: (
        <FacebookIcon
          sx={{
            width: "32px",
            height: "32px",
            p: "0 !important",
            color: "#1877f2",
          }}
        />
      ),
    },
    {
      label: "WhatsApp",
      url: `https://wa.me/?text=${YOUR_URL}`,
      icon: (
        <WhatsAppIcon
          sx={{ width: "32px", height: "32px", p: "0 !important" }}
        />
      ),
    },
  ];
  return (
    <Modal
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        backgroundColor: "rgba(14, 20, 32, 0.95)",
        backdropFilter: "blur(2px)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          boxShadow: 24,
          padding: 4,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "60%",
          backgroundColor: "rgba(14, 20, 32, 0.9)",
          borderRadius: "15px",
        }}
      >
        <Stack
          direction={"column"}
          spacing={2}
          sx={{
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
            padding: 2,
          }}
        >
          <Image
            src={logoGame}
            alt={`img-${logoGame}`}
            containerProps={{
              width: "200px",
              height: "auto",
            }}
          />
          <Text variant="h4">Share it with tour friends</Text>
          <Stack
            direction={"row"}
            spacing={2}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              my: 2,
            }}
          >
            {listIconShare.map((item, index) => (
              <Stack
                key={index}
                direction={"column"}
                gap={1}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Stack
                  sx={{
                    borderRadius: "50%",
                    backgroundColor: "rgb(27, 35, 50)",
                    width: "56px",
                    height: "56px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Link
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ height: "32px" }}
                  >
                    {item.icon}
                  </Link>
                </Stack>
                <Text variant={"subtitle2"}>{item.label}</Text>
              </Stack>
            ))}
          </Stack>
          <Stack
            direction={"row"}
            p={2}
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              backgroundColor: "rgba(156, 163, 175, 0.39)",
              border: "1px solid ",
              borderRadius: "16px",
            }}
          >
            <Stack direction={"column"} spacing={1}>
              <Text variant={"body2"}>Or copy link</Text>
              <Text variant={"subtitle2"}>
                https://gam3s.gg/earth-from-another-sun/
              </Text>
            </Stack>
            <IconButton onClick={handleCopy} sx={{ color: "white" }}>
              <ContentCopyIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ModalShare;
