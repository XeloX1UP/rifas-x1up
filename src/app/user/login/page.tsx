import LoginForm from "@/components/loginForm";
import { NextPage } from "next";

const LoginPage: NextPage = () => {
  return (
    <div
      className={`container d-flex flex-column justify-content-center align-items-center`}
      style={{ height: "70vh" }}
    >
      <LoginForm />
    </div>
  );
};
export default LoginPage;
