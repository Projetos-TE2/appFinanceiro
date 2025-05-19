import { Account } from "./account.type";

export type Transaction = {
  id?: number,
  image: string | null,
  title: string,
  launchDate: Date | string,
  price: number | string,
  category: string,
  accounts: Account[]
}

