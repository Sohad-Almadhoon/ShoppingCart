import { Button, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import FormatCurrency from "../utilities/FormatCurrency";
type cartItemProps = {
  id: number;
  quantity: number;
};
function CartItem({ id, quantity }: cartItemProps) {
  const { removeQuantity } = useShoppingCart();
  const item = storeItems.find((i) => i.id === id);
  if (item == null) return null;
  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        alt="item"
        width="125px"
        height="75px"
        style={{ objectFit: "cover" }}
      />
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 1 && <span className="text-muted fs-6">{quantity}x</span>}
        </div>
        <div className="text-muted fs-6">{FormatCurrency(item.price)}</div>
      </div>
          <div className="text-muted fs-6">{FormatCurrency(item.price * quantity)}</div>
          <Button variant="outline-danger"size="sm"onClick={()=>removeQuantity(item.id)}>&times;</Button>
      </Stack>
  );
}

export default CartItem;
