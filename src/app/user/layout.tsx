import { cookies } from "next/headers";
import LoginBtn from "../loginBtn";
import { Metadata } from "next";
import { UserInfoProvider } from "@/contexts/userData";
import { validateUserJwt } from "@/utils/validations";
import LoginForm from "@/components/loginForm";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const user = cookieStore.get("usuario");

  return (
    <UserInfoProvider>
      <div className="d-flex justify-content-end container-md">
        <LoginBtn />
      </div>
      {children}
    </UserInfoProvider>
  );
}
export const metadata: Metadata = {
  title: "Panel",
  description: "User Panel",
};
