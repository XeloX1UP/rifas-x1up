import ActiveGame from "@/components/activeGame";
import { NextPage } from "next";
type PageProps = {
  params: {
    gameID: string;
  };
};
const Page: NextPage<PageProps> = ({ params }) => {
  return (
    <div>
      <ActiveGame gameID={params.gameID} />
    </div>
  );
};
export default Page;
