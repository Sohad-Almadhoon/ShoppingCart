import { createContext, ReactNode, useContext, useState } from "react";
import ShoppingCart from '../components/ShoppingCart';
import useLocalStorage from "../hooks/useLocalStorage";
type CardItem = {
  id: number;
  quantity: number;
};
type ShoppingCartContext = {
  getItemQuantity: (id: number) => number;
  incrementQuantity: (id: number) => void;
  decrementQuantity: (id: number) => void;
  removeQuantity: (id: number) => void;
  CardItems: CardItem[];
  CardQuantity: number;
  openCart: () => void;
  closeCart: () => void;
};
type ProviderProps = {
  children: ReactNode;
};
const ShoppingCartContext = createContext({} as ShoppingCartContext);
function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

function ShoppingCartProvider({ children }: ProviderProps) {
  const [CardItems, setItems] = useLocalStorage<CardItem[]>("Shopping-Cart",[]);
  const [isOpen, setOpen] = useState(false);
  const openCart = () => setOpen(true);
  const closeCart = () => setOpen(false);
  const CardQuantity = CardItems.reduce((quantity, item) => quantity + item.quantity, 0);
  function getItemQuantity(id: number) {
    return CardItems.find((item) => item.id === id)?.quantity || 0;
  }
  function incrementQuantity(id: number) {
    setItems((CardItem) => {
      if (CardItem.find((item) => item.id === id) == null) {
        return [...CardItem, { id, quantity: 1 }];
      } else {
        return CardItem.map((item) => {
          if (item.id === id) {
            return { id, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function decrementQuantity(id: number) {
    setItems((CardItem) => {
      if (CardItem.find((item) => item.id === id)?.quantity == 1) {
        return CardItem.filter((item) => item.id !== id);
      } else {
        return CardItem.map((item) => {
          if (item.id === id) {
            return { id, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }
  function removeQuantity(id: number) {
    setItems((CurrItem) => CurrItem.filter((item) => id !== item.id));
  }
  return (
    <ShoppingCartContext.Provider
      value={{
        openCart,
        closeCart,
        getItemQuantity,
        incrementQuantity,
        decrementQuantity,
        removeQuantity,
        CardItems,
        CardQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
}
export { useShoppingCart, ShoppingCartProvider };
