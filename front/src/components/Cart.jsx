import BackButton from "../assets/BackButton";
import { useCart } from "../hooks/useCart";

export default function Cart() {
  const { cart, removeFromCart, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return <div className="p-4">Your cart is empty.</div>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex gap-6">
        <BackButton />
        <h1 className="text-2xl font-bold mb-4">Your Shopping Cart</h1>
      </div>
      {cart.map((item, index) => {
        const totalPrice = item.price * item.quantity;

        return (
          <div
            key={index}
            className="flex items-center justify-between border-b py-4"
          >
            <div>
              <h2 className="text-lg font-semibold">{item.name}</h2>
              <p className="text-gray-600">
                Size: {item.size} | Color: {item.color}
              </p>
              <p className="text-gray-600">Quantity: {item.quantity}</p>
            </div>
            <div className="flex items-center gap-4">
              <p>{totalPrice} EGP</p>
              <button
                onClick={() => removeFromCart(item.id, item.size, item.color)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        );
      })}

      <div className="flex justify-between mt-4">
        <h2 className="text-xl font-semibold">Total Price:</h2>
        <p className="text-xl font-semibold">{getTotalPrice()} EGP</p>
      </div>
    </div>
  );
}
