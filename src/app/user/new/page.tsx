import NewUserForm from "@/components/newUserForm";
import { NextPage } from "next";

const NewUserPage: NextPage = () => {
  return (
    <div
      className="container p-5"
      style={{
        backgroundColor: "#F9DBBB",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
        borderRadius: "8px",
      }}
    >
      <NewUserForm />
    </div>
  );
};
export default NewUserPage;
