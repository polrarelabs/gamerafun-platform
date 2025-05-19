import "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    textBreadcrumb?: string;
    bgLinearGradient?: string;
    colorGray?: string;
    avatarAI?: string;
    colorBorderBlack?: string;
    text80?: string;
    borderColorLinear?: string;
    greenColorText?: string;
    greenColorButton?: string;
    backgroundReview?: string;
    colorTextRed?: string;
    colorTextGray?: string;
    colorBgGray?: string;
    textWhite?: string;
    borderMenu?: string;
    bgMenu?: string;
    bgMenuHover?: string;
    colorIcon?: string;
    colorIconHover?: string;
    colorBgHover?: string;
    bgColorYellow?: string;
    bgColorLinearOrigin?: string;
    bgColorProfile?: string;
    greenColor?: string;

    colorItemGame?: Record<string, string>;
    colorReview?: Record<string, string>;
    colorModalShare?: Record<string, string>;
    colorGame?: Record<string, string>;
    colorRelate?: Record<string, string>;
    colorBanner?: Record<string, string>;

    // Tương tự nếu bạn muốn dùng AppBar, Avatar, Button... bên trong theme.palette
    AppBar?: Record<string, string>;
    Avatar?: Record<string, string>;
    Button?: Record<string, string>;
    Chip?: Record<string, string>;
    FilledInput?: Record<string, string>;
    LinearProgress?: Record<string, string>;
    Skeleton?: Record<string, string>;
    Slider?: Record<string, string>;
    SnackbarContent?: Record<string, string>;
    SpeedDialAction?: Record<string, string>;
    StepConnector?: Record<string, string>;
    StepContent?: Record<string, string>;
    Switch?: Record<string, string>;
    TableCell?: Record<string, string>;
    Tooltip?: Record<string, string>;
    Alert?: Record<string, string>;
  }

  interface PaletteOptions extends Palette {}
}
