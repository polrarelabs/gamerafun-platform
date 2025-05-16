import MainLayout from "@layouts/MainLayout";
import { GoogleOAuthProvider } from "@react-oauth/google";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID!}>
      <MainLayout>{children}</MainLayout>
    </GoogleOAuthProvider>
  );
}
