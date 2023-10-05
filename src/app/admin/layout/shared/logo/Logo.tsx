import Link from "next/link";
import { styled } from "@mui/material";
import Image from "next/image";

// Define CSS styles for the heading
const HeadingStyle = {
  fontSize: "24px", // Adjust the font size as needed
  fontWeight: "bold", // You can also adjust other styles like color, margin, etc.
  // Add any other CSS styles you want here
};

const LinkStyled = styled(Link)(() => ({
  display: "flex", // Make the content inside the link a flex container
  alignItems: "center", // Vertically center the content
  textDecoration: "none", // Remove underlines from the link
}));

const Logo = () => {
  return (
    <LinkStyled href="/">
      {/* Include the QR code image */}
      <div style={{ marginRight: "10px" }}>
        <Image src="/images/logos/logo-dark.svg" alt="QR Code" width={40} height={40} />
      </div>
      {/* Use an <h1> element to style "Attendify" as a heading */}
      <h1 style={HeadingStyle}>Attendify</h1>
    </LinkStyled>
  );
};

export default Logo;
