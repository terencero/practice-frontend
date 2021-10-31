/* eslint-disable react/prop-types */
import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import TitleStyles from './styles/Title';
import PriceTagStyles from './styles/PriceTag';
import formatCurrency from '../lib/formatCurrency';

export default function Product({ product }) {
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <TitleStyles>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </TitleStyles>
      <PriceTagStyles>{formatCurrency(product.price)}</PriceTagStyles>
      <p>{product.description}</p>
    </ItemStyles>
  );
}
