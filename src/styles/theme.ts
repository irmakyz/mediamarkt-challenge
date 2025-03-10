const breakpoints = {
  mobile: "480px",
  tablet: { min: "481px", max: "1024px" },
  desktop: { min: "1025px" },
};

const media = {
  mobile: `@media (max-width: ${breakpoints.mobile})`,
  tablet: `@media (min-width: ${breakpoints.tablet.min}) and (max-width: ${breakpoints.tablet.max})`,
  desktop: `@media (min-width: ${breakpoints.desktop.min})`,
};

const theme = {
  backgroundColor: "#F6F8FA",
  textColor: "#24292E",
  colors: {
    azure: "#25292E",
    white: "#FFFFFF",
    aquaHaze: "#F6F8FA",
    scienceBlue: "#0969DA",
    salmon: "#FD8C73",
    regentGrey: "#818B981A",
    lightGrey: "#D1D9E0B3",
  },
  padding: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
  },
  margin: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
  },
  fontSize: {
    xs: 16,
    s: 18,
    m: 20,
  },
  fontWeight: {
    regular: 500,
    bold: 600,
  },
  borderRadius: 6,
  media,
};

export default theme;
