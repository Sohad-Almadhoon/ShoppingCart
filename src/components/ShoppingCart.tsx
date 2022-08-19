import React from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import FormatCurrency from "../utilities/FormatCurrency";
import CartItem from "./CartItem";
type ShoppingCartProps = {
  isOpen: boolean;
}
function ShoppingCart({ isOpen}:ShoppingCartProps) {
  const { closeCart , CardItems} = useShoppingCart();
  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {CardItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </Stack>
          <div className="d-flex justify-content-end fw-bold fs-4">
            Total:
            {FormatCurrency(
              CardItems.reduce((total, cartItem) => {
                const item = storeItems.find(i => i.id === cartItem.id)
                return total + (item?.price || 0) * cartItem.quantity
              }, 0)
            )}
          </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default ShoppingCart;
