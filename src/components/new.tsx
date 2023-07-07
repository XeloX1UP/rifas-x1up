import { FormEventHandler, useState, useRef, MouseEventHandler } from "react";
import type { GameProps } from "@/utils/interfaces";
import { addNewGame } from "@/utils/fetchs";
import { useContext } from "react";
import { UserInfoCtx, UserInfoCtxType } from "@/contexts/userData";
import style from "@/components/modules/newGameForm.module.css";
import NumberInput from "./numberInput";
import DropDownList from "./dropDownList";

interface NewGameProps {
  premium: boolean;
}
const NewGame: React.FC<NewGameProps> = ({ premium }) => {
  const { user, setUser } = useContext<UserInfoCtxType>(UserInfoCtx);
  const [type, setType] = useState<string>("Seleccione...");
  const [title, setTitle] = useState<string>("");
  const [slots, setSlots] = useState<number>(5);
  const [price, setPrice] = useState<number>(500);
  const [author, setAuthor] = useState<string>(user.personalInfo.email);

  const formRef = useRef<HTMLFormElement>(null);

  const maxSlots = premium ? 50 : 20;
  const maxPrice = premium ? 10000 : 5000;

  const reset = () => {
    setType("Seleccione...");
    setTitle("");
    setSlots(5);
    setPrice(500);
    formRef.current?.reset();
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const game: GameProps = {
      type,
      title,
      slots,
      price,
      author,
      gameID: "",
    };
    if (confirm(`¿Estas seguro que quieres crear esta rifa?`)) {
      const result = await addNewGame(game);
      if (result.passed) {
        alert(result.message);
        reset();
      } else {
        alert(result.message);
      }
    }
  };
  const handleIncreaseSlots: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (slots < maxSlots) setSlots((current) => current + 5);
  };
  const handleDecreaseSlots: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (slots > 5) setSlots((current) => current - 5);
  };
  const handleIncreasePrice: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (price < maxPrice) setPrice((current) => current + 500);
  };
  const handleDecreasePrice: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (price > 500) setPrice((current) => current - 500);
  };
  const handleClickDropDown: MouseEventHandler<HTMLButtonElement> = (e) => {
    setType(e.currentTarget.innerText);
  };
  return (
    <form
      onSubmit={submitHandler}
      ref={formRef}
      className="container-md p-4 rounded-5 rounded-start-2 d-flex gap-5 align-content-start justify-content-center flex-wrap text-wrap text-center"
    >
      <div className={`${style.formInput}`}>
        <label htmlFor="type">Tipo de rifa </label>
        <DropDownList text={type} handleClick={handleClickDropDown} />
      </div>
      <div className={`${style.formInput}`}>
        <label htmlFor="title">Titulo de tu rifa </label>
        <input
          className={`${style.text}`}
          type="text"
          placeholder="Gran rifa gran"
          id="title"
          defaultValue={title}
          onChange={(e) => {
            setTitle(e.target.value.trim());
          }}
        />
      </div>
      <div className={`${style.formInput}`}>
        <label htmlFor="number">
          ¿Cuantos números tendrá tu rifa?{" "}
          <span className="fs-6">
            <b>
              <i>Puede ser entre 5 a {maxSlots}</i>
            </b>
          </span>
        </label>
        <NumberInput
          handleIncrease={handleIncreaseSlots}
          handleDecrease={handleDecreaseSlots}
          num={slots}
        />
      </div>
      <div className={`${style.formInput}`}>
        <label htmlFor="price">
          Valor del número{" "}
          <span className="fs-6">
            <b>Puede ser entre $500 a ${maxPrice} </b>
          </span>
        </label>
        <NumberInput
          num={price}
          handleDecrease={handleDecreasePrice}
          handleIncrease={handleIncreasePrice}
          money
        />
        <div className="d-flex flex-row gap-2">
          <label
            className={`badge ${style.badge}`}
            onClick={() => {
              setPrice(500);
            }}
          >
            $500
          </label>
          <label
            className={`badge ${style.badge}`}
            onClick={() => {
              setPrice(5000);
            }}
          >
            $5000
          </label>
          <label
            className={`badge ${style.badge}`}
            onClick={() => {
              setPrice(10000);
            }}
          >
            $10000
          </label>
        </div>
      </div>
      <div className={`${style.formInput}`}>
        <label className="fs-3">Ganancia total:</label>
        <span>
          <b className="fs-1">{`$${price * slots}`}</b>
        </span>
      </div>
      <div className={`${style.formInput}`}>
        <button className={`${style.btn}`} type="submit">
          Crear
        </button>
      </div>
    </form>
  );
};
export default NewGame;
