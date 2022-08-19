import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import FormatCurrency from "../utilities/FormatCurrency";
type storeItemProps = {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
};
function StoreItem({ id, name, price, imgUrl }: storeItemProps) {
  const {
    getItemQuantity,
    incrementQuantity,
    decrementQuantity,
    removeQuantity,
  } = useShoppingCart();
  const quantity = getItemQuantity(id);
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgUrl}
        height="200px"
        style={{ objectFit: "cover" }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{FormatCurrency(price)}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity == 0 ? (
            <Button className="w-100" onClick={()=>incrementQuantity(id)}>
              + Add To Cart
            </Button>
          ) : (
            <div className="d-flex  flex-column align-items-center">
              <div
                className="mb-3 d-flex align-items-center"
                style={{ gap: ".5rem" }}
              >
                <Button onClick={() => decrementQuantity(id)}>-</Button>
                <span className="fs-4"> {quantity} in Cart </span>
                <Button onClick={() => incrementQuantity(id)}>+</Button>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeQuantity(id)}
              >
                Remove
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default StoreItem;
