import type {
  ActiveGameProps,
  AllGamesSnapProps,
  GameProps,
  PersonalInfoProps,
} from "./interfaces";
//AddNewUser
const addNewUserToFirebase = async (
  personalInfo: PersonalInfoProps
): Promise<{ message?: string | string[]; passed: boolean }> => {
  try {
    const result = await fetch("/api/user/addNewUser", {
      method: "POST",
      body: JSON.stringify(personalInfo),
    }).then((data) => data.json());

    return result;
  } catch (error) {
    return { passed: false };
  }
};
const addNewGame = async (game: GameProps) => {
  try {
    const result = await fetch("/api/game/addGame", {
      method: "POST",
      body: JSON.stringify(game),
    }).then((data) => data.json());
    return result;
  } catch (error) {
    return { passed: false, message: `${error}` };
  }
};
const loggin = async (user: string, password: string) => {
  try {
    const result = await fetch(
      `/api/user/loggin?user=${user}&password=${password}`,
      {
        method: "GET",
        credentials: "include",
      }
    ).then((data) => data.json());

    return result;
  } catch (error) {
    return { message: "error", passed: false };
  }
};
const logout = async () => {
  return await fetch("/api/user/logout", {
    method: "POST",
    credentials: "include",
  });
};
const getAllActiveGames = async () => {
  return await fetch("/api/game/allGames", {
    method: "GET",
  }).then((data) => data.json());
};

const getUser = async (validUser: string) => {
  return await fetch(
    `/api/user/getUser?validUser=${encodeURIComponent(validUser)}`,
    {
      credentials: "include",
      method: "GET",
    }
  ).then((data) => data.json());
};

const getGame = async (
  gameID: string
): Promise<ActiveGameProps | undefined> => {
  return await fetch(`/api/game/getGame?gameID=${gameID}`, {
    method: "GET",
    credentials: "include",
    next: { revalidate: 1 * 60 * 60 * 24 },
  })
    .then((data) => data.json())
    .catch(() => {
      return undefined;
    });
};
const searchGame = async (
  textToFind: string
): Promise<ActiveGameProps[] | undefined> => {
  return await fetch(`/api/search/game?textToFind=${textToFind}`, {
    method: "GET",
  }).then((data) => data.json());
};
export {
  addNewUserToFirebase,
  addNewGame,
  loggin,
  logout,
  getAllActiveGames,
  getUser,
  getGame,
  searchGame,
};
