import History from "./history";
import UserInfo from "./info";
import NewGame from "./new";
import styles from "@/components/modules/menuOpt.module.css";

interface MenuOptProps {
  option: string;
}
interface OPTProps {
  [key: string]: React.ReactElement;
}
const MenuOpt: React.FC<MenuOptProps> = ({ option }) => {
  const OPT: OPTProps = {
    new: <NewGame premium={true} />,
    info: <UserInfo />,
    history: <History />,
  };
  return (
    <section className={`container ${styles.container}`}>{OPT[option]}</section>
  );
};
export default MenuOpt;
