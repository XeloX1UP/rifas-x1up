// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  child,
  get,
  query,
  equalTo,
  onValue,
} from "firebase/database";
import type {
  ActiveGameProps,
  AllGamesSnapProps,
  GameProps,
  NewUserProps,
  PersonalInfoProps,
  UserInfoProps,
} from "./utils/interfaces";
import { v4 as uuidv4 } from "uuid";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${process.env.FIREBASE_API_KEY}`,
  authDomain: `${process.env.FIREBASE_AUTH_DOMAIN}`,
  projectId: `${process.env.FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.FIREBASE_APP_ID}`,
  measurementId: `${process.env.FIREBASE_MEASUREMENT_ID}`,
  databaseURL: `${process.env.FIREBASE_DATABASE_URL}`,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
//Interfaces

//Funciones basicas
//Escribir en bd
const writeNewGame = async ({
  title,
  price,
  slots,
  type,
  author,
}: GameProps) => {
  try {
    const db = getDatabase();
    const id = uuidv4();
    const players: PersonalInfoProps[] = [];
    await set(ref(db, "games/" + `${author?.replaceAll(".", "-")}/${id}`), {
      title,
      price,
      slots,
      type,
      author,
      id,
      players,
    });
    return true;
  } catch (error) {
    return false;
  }
};
//Agregar nuevo usuario
const writeNewUser = async ({
  email,
  fullName,
  phoneNumber,
  bornDate,
  password,
  premium,
  rut,
}: PersonalInfoProps) => {
  try {
    const db = getDatabase();
    await set(ref(db, "users/" + `${email.replaceAll(".", "-")}`), {
      email,
      fullName,
      phoneNumber,
      bornDate,
      password,
      premium,
      rut,
    });
    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};
//Obtener Juego de bd
type GetGameProps = {
  [key: string]: {
    [key: string]: {
      author: string;
      id: string;
      price: number;
      slots: number;
      title: string;
      type: string;
    };
  };
};
const getGame = async (
  gameID: string
): Promise<ActiveGameProps | undefined> => {
  let game: ActiveGameProps | undefined = undefined;
  const gameRef = ref(getDatabase(), "games/");
  await get(child(gameRef, "/")).then((snap) => {
    if (snap.exists()) {
      const data: GetGameProps = snap.val();
      const list = Object.values(data);
      const result = list.find((game) => game[gameID]);
      if (result) {
        const { author, id, price, slots, title, type } = result[gameID];
        game = {
          author,
          gameID: id,
          players: [],
          price,
          slots,
          title,
          type,
        };
      }
    } else {
      console.log({ message: "error" });
    }
  });
  return game;
};
const getAllGames = async (): Promise<AllGamesSnapProps[] | undefined> => {
  const dbRef = ref(getDatabase());
  const data = await get(child(dbRef, "games/"))
    .then((snap) => {
      if (snap.exists()) {
        const games: AllGamesSnapProps[] = Object.values(snap.val());
        const gameList = games.flatMap(Object.values);
        return gameList.map((game) => {
          if (!game.players) {
            return { ...game, players: [] };
          } else {
            return { ...game };
          }
        });
      } else {
        return undefined;
      }
    })
    .catch((error) => {
      console.log(error);

      return undefined;
    });
  return data;
};
const getUser = async (user: string) => {
  const dbRef = ref(getDatabase());
  const result = await get(
    child(dbRef, `users/${user.replaceAll(".", "-")}`)
  ).then((snap) => {
    if (snap.exists()) {
      const { password, premium, email, bornDate, fullName, phoneNumber, rut } =
        snap.val();
      return {
        message: "Usuario encontrado",
        passed: true,
        pwd: password,
        premium,
        email,
        bornDate,
        fullName,
        phoneNumber,
        rut,
      };
    } else {
      return { message: "Usuario no encontrado", passed: false };
    }
  });
  return result;
};
type GameListProps = {
  [key: string]: {
    author: string;
    id: string;
    price: number;
    slots: number;
    title: string;
    type: string;
    players: PersonalInfoProps[];
  };
};
const findGames = async (text: string) => {
  const dbRef = ref(database);
  const result = await get(child(dbRef, `games`)).then((snap) => {
    if (snap.exists()) {
      return snap.val();
    }
    return undefined;
  });
  if (result) {
    const gameList = Object.values<GameListProps>(result);
    const res = gameList
      .map((game) => {
        const dataList = Object.values(game);
        const filteredList = dataList.filter((game) => {
          // console.log({
          //   text: text.toLowerCase(),
          //   author: game.author.toLowerCase(),
          //   id: game.id.toLowerCase(),
          //   title: game.title.toLowerCase(),
          //   contains: {
          //     author: game.author.toLowerCase().includes(text.toLowerCase()),
          //     id: game.id.toLowerCase().includes(text.toLowerCase()),
          //     title: game.title.toLowerCase().includes(text.toLowerCase()),
          //   },
          // });

          if (game.author.toLowerCase().includes(text.toLowerCase()))
            return true;
          if (game.id.toLowerCase().includes(text.toLowerCase())) return true;
          if (game.title.toLowerCase().includes(text.toLowerCase()))
            return true;
          return false;
        });

        return filteredList.map((item) => {
          if (!item.players) {
            return { ...item, players: [] };
          }
          return item;
        });
      })
      .flat();

    return res.map((game) => {
      return {
        author: game.author,
        gameID: game.id,
        price: game.price,
        slots: game.slots,
        title: game.title,
        type: game.type,
        players: game.players,
      };
    });
  }
  return undefined;
};
export { writeNewGame, getGame, writeNewUser, getUser, getAllGames, findGames };
