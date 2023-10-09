import type { IconObj } from "../app/types";

export function useGetIcon(searchArr: IconObj[], id: number) {
  const itemObj = searchArr.find((searchItem: IconObj) => searchItem.id === id)

  return itemObj?.icon
}