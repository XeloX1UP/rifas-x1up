import { MouseEventHandler } from "react";
import styles from "@/components/modules/numberInput.module.css";
import { formatoMonetario } from "@/utils/stringControl";

type SlotsInputProps = {
  handleDecrease: MouseEventHandler<HTMLButtonElement>;
  handleIncrease: MouseEventHandler<HTMLButtonElement>;
  num: number;
  money?: boolean;
};
export default function NumberInput({
  handleDecrease,
  handleIncrease,
  num,
  money,
}: SlotsInputProps): JSX.Element {
  return (
    <div className="d-flex flex-row align-items-center justify-content-center gap-3">
      <div
        className={`rounded-circle d-flex align-items-center justify-content-center ${styles.cntBtn}`}
        style={{ backgroundColor: "#2E3840", width: "50px", height: "50px" }}
      >
        <button
          type="button"
          className="btn fs-3 w-100 h-100 rounded-circle"
          onClick={handleDecrease}
        >
          {"-"}
        </button>
      </div>
      <label>{money ? `${formatoMonetario(num)}` : num}</label>
      <div
        className={`rounded-circle d-flex align-items-center justify-content-center ${styles.cntBtn}`}
        style={{
          backgroundColor: "#2E3840",
          width: "50px",
          height: "50px",
        }}
      >
        <button
          type="button"
          className="btn fs-3 w-100 h-100 rounded-circle"
          onClick={handleIncrease}
        >
          {"+"}
        </button>
      </div>
    </div>
  );
}
