import React from "react";
import { Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { BorderBeam } from "border-beam";

const toneStyles = {
  dark: {
    color: "#F4FAFF",
    background:
      "linear-gradient(180deg, rgba(8, 20, 34, 0.86) 0%, rgba(6, 16, 28, 0.94) 100%)",
    border: "1px solid rgba(139, 214, 255, 0.22)",
    boxShadow:
      "0 14px 30px rgba(0, 16, 34, 0.28), inset 0 1px 0 rgba(222, 244, 255, 0.16), inset 0 -1px 0 rgba(56, 151, 255, 0.12)",
    hoverShadow:
      "0 18px 40px rgba(0, 18, 40, 0.34), inset 0 1px 0 rgba(222, 244, 255, 0.2), inset 0 -1px 0 rgba(56, 151, 255, 0.18)",
    sheen:
      "linear-gradient(180deg, rgba(237, 249, 255, 0.18) 0%, rgba(237, 249, 255, 0.04) 46%, rgba(237, 249, 255, 0) 100%)",
  },
  light: {
    color: "#07111C",
    background:
      "linear-gradient(180deg, rgba(248, 252, 255, 0.98) 0%, rgba(235, 246, 255, 0.94) 100%)",
    border: "1px solid rgba(78, 170, 255, 0.2)",
    boxShadow:
      "0 10px 24px rgba(56, 125, 190, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.92), inset 0 -1px 0 rgba(111, 190, 255, 0.16)",
    hoverShadow:
      "0 14px 30px rgba(56, 125, 190, 0.12), inset 0 1px 0 rgba(255, 255, 255, 1), inset 0 -1px 0 rgba(111, 190, 255, 0.22)",
    sheen:
      "linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.38) 46%, rgba(255, 255, 255, 0) 100%)",
  },
};

export default function BeamCTAButton({
  children,
  to,
  href,
  endIcon = null,
  tone = "dark",
  fullWidth = false,
  sx = {},
  beamProps = {},
  ...rest
}) {
  const isExternal = Boolean(href);
  const surface = toneStyles[tone] ?? toneStyles.dark;
  const Component = isExternal ? "a" : RouterLink;

  return (
    <BorderBeam
      size="sm"
      theme={tone === "light" ? "light" : "dark"}
      colorVariant="ocean"
      strength={0.42}
      brightness={1.15}
      saturation={1.05}
      hueRange={12}
      duration={2.8}
      staticColors
      style={{
        display: fullWidth ? "flex" : "inline-flex",
        width: fullWidth ? "100%" : "fit-content",
        borderRadius: 999,
        overflow: "visible",
        filter: tone === "light" ? "drop-shadow(0 0 10px rgba(123, 196, 255, 0.18))" : "drop-shadow(0 0 12px rgba(60, 156, 255, 0.14))",
      }}
      {...beamProps}
    >
      <Box
        component={Component}
        to={!isExternal ? to : undefined}
        href={isExternal ? href : undefined}
        sx={{
          position: "relative",
          isolation: "isolate",
          overflow: "hidden",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 0.8,
          minHeight: "44px",
          width: fullWidth ? "100%" : "auto",
          px: 2.5,
          py: 1,
          borderRadius: "999px",
          textDecoration: "none",
          fontFamily: "Poppins, sans-serif",
          fontSize: "13.5px",
          fontWeight: 500,
          letterSpacing: "0.01em",
          lineHeight: 1,
          backdropFilter: "blur(18px) saturate(135%)",
          WebkitBackdropFilter: "blur(18px) saturate(135%)",
          transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1), background 0.3s ease",
          color: surface.color,
          background: surface.background,
          border: surface.border,
          boxShadow: surface.boxShadow,
          "&::before": {
            content: '""',
            position: "absolute",
            inset: 0,
            background: surface.sheen,
            pointerEvents: "none",
            zIndex: 0,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            inset: "1px",
            borderRadius: "inherit",
            background: "linear-gradient(135deg, rgba(127, 211, 255, 0.06), rgba(127, 211, 255, 0))",
            pointerEvents: "none",
            zIndex: 0,
          },
          "&:hover": {
            transform: "translateY(-1px)",
            boxShadow: surface.hoverShadow,
          },
          "&:hover .beam-cta-icon": {
            transform: "translateX(3px)",
          },
          "&:active": {
            transform: "translateY(0)",
          },
          ...sx,
        }}
        className="gradient-border gradient-border-to-r gradient-border-from-zinc-200/50 gradient-border-via-zinc-300/50 gradient-border-to-zinc-200/50"
        {...rest}
      >
        <Box component="span" sx={{ position: "relative", zIndex: 1 }}>
          {children}
        </Box>
        {endIcon ? (
          <Box
            component="span"
            className="beam-cta-icon"
            sx={{
              position: "relative",
              zIndex: 1,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
          >
            {endIcon}
          </Box>
        ) : null}
      </Box>
    </BorderBeam>
  );
}
