import { Stack } from "@mui/material";

export default function NotFound() {
  return (
    <>
      <Stack
        sx={styles.error}
        height={{ xs: "calc(100svh - 365px)", md: "calc(100svh - 193px)" }}
      >
        <div>
          <h1 className="next-error-h1" style={styles.h1}>
            404
          </h1>
          <div style={styles.desc}>
            <h2 style={styles.h2}>This page could not be found.</h2>
          </div>
        </div>
      </Stack>
    </>
  );
}

const styles = {
  error: {
    fontFamily:
      'system-ui,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  desc: {
    display: "inline-block",
  },

  h1: {
    display: "inline-block",
    margin: "0 20px 0 0",
    padding: "0 23px 0 0",
    fontSize: 24,
    fontWeight: 500,
    verticalAlign: "top",
    lineHeight: "49px",
  },

  h2: {
    fontSize: 14,
    fontWeight: 400,
    lineHeight: "49px",
    margin: 0,
  },
} as const;
