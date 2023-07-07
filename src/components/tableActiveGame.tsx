import { Table } from "react-bootstrap";
import styles from "@/components/modules/tableActiveGame.module.css";
type TableActiveGameProps = {
  slots: number;
};

export default function TableActiveGame({ slots }: TableActiveGameProps) {
  const addRows = () => {
    let rows = [];
    for (let i = 0; i < slots; i++) {
      rows.push(
        <tr key={i}>
          <td className="fw-bolder text-center">{i + 1}</td>
          <td className=""></td>
        </tr>
      );
    }
    return rows;
  };
  return (
    <Table className={styles.table}>
      <thead>
        <tr>
          <th style={{ width: "70px" }}>Número</th>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>{addRows()}</tbody>
    </Table>
  );
}
