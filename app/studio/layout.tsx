import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sanity Studio",
  description: "Sanity Studio",
};
const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
