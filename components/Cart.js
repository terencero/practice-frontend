import styled from 'styled-components';
import CartStyles from './styles/CartStyles';
import Supreme from './styles/Supreme';
import formatCurrency from '../lib/formatCurrency';
import { useUser } from './User';
import calcTotalPrice from '../lib/calcTotalPrice';
import { useCart } from '../lib/cartState';

const CartItemStyles = styled.li`
  padding: 1rem 0;
  border-bottom: 1px solid var(--lightGrey);
  display: grid;
  grid-template-columns: auto 1fr auto;
  img {
    margin-right: 1rem;
  }
  h3,
  p {
    margin: 0;
  }
`;

function CartItem({ cartItem }) {
  const { product } = cartItem;

  if (!product) return null;

  return (
    <CartItemStyles>
      <img
        width="100"
        src={product.photo.image.publicUrlTransformed}
        alt={product.name}
      />
      <div>
        <h3>{product.name}</h3>
        <p>{formatCurrency(product.price * cartItem.quantity)}</p> -
        <em>
          {cartItem.quantity} &times; {formatCurrency(product.price)} each
        </em>
      </div>
    </CartItemStyles>
  );
}

export default function Cart() {
  const me = useUser();
  const data = useCart();

  if (!me) return null;

  return (
    <CartStyles open>
      <header>
        <Supreme>{me.email}'s cart</Supreme>
      </header>
      <ul>
        {me.cart.map((cartItem) => (
          <CartItem key={cartItem.id} cartItem={cartItem} />
        ))}
      </ul>
      <footer>
        <p>{formatCurrency(calcTotalPrice(me.cart))}</p>
      </footer>
    </CartStyles>
  );
}
