'use client';
import React from "react";
import { Box, Typography } from "@mui/material";
import Link from "next/link";
const Footer = () => {
  const domain = process.env.NEXT_PUBLIC_DOMAIN!;
  return (
    <Box sx={{ pt: 6, textAlign: "center" }}>
      <Typography>
        © 2023 All rights reserved by{" "}
        <Link href={domain}>
        {domain}
        </Link>{" "}
      </Typography>
    </Box>
  );
};

export default Footer;
    