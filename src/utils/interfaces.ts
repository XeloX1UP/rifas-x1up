interface GameProps {
  gameID: string;
  title: string;
  price: number;
  slots: number;
  type: string;
  author: string;
}
interface ActiveGameProps extends GameProps {
  players: PersonalInfoProps[];
}
interface NewUserProps {
  user: string;
  reUser: string;
  password: string;
  rePassword: string;
}
interface PersonalInfoProps {
  fullName: string;
  phoneNumber: string;
  bornDate: string;
  email: string;
  password: string;
  rut: string;
  premium: boolean;
}
interface GamesInfoProps {
  created: GameProps[];
  played: GameProps[];
}
interface BankCardProps {
  cardNumber: number;
  expireDate: string;
  secretKey: number;
}
interface BankAccountProps {
  bank: string;
  account: number;
  userName: string;
  mail?: string;
  accountType: string;
}
interface BankInfoProps {
  cards: BankCardProps[];
  bankAccount: BankAccountProps;
}
interface WalletInfo {
  balance: number;
  cashIn: number;
  cashOut: number;
  bankInfo: BankInfoProps;
}
interface UserInfoProps {
  personalInfo: PersonalInfoProps;
  gamesInfo?: GamesInfoProps;
  walletInfo?: WalletInfo;
}
interface AllGamesSnapProps {
  title: string;
  price: number;
  slots: number;
  type: string;
  author: string;
  id: string;
  message?: string;
  players: PersonalInfoProps[];
}

export {
  type GameProps,
  type NewUserProps,
  type UserInfoProps,
  type PersonalInfoProps,
  type AllGamesSnapProps,
  type ActiveGameProps,
};
