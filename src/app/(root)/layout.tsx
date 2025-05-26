import MainLayout from "@layouts/MainLayout";
import { GoogleOAuthProvider } from "@react-oauth/google";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MainLayout>{children}</MainLayout>;
}
