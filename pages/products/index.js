import { useRouter } from 'next/dist/client/router';
import Products from '../../components/Products';
import Pagination from '../../components/Pagination';

export default function ProductsPage() {
  const {
    query: { page = 1 },
  } = useRouter();
  const currentPageNumber = Number(page);
  return (
    <div>
      <Pagination page={currentPageNumber} />
      <Products page={currentPageNumber} />
      <Pagination page={currentPageNumber} />
    </div>
  );
}
