import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { SINGLE_ITEM_QUERY } from './SingleProduct';
import useForm from '../lib/useForm';
import FormStyles from './styles/Form';
import DisplayError from './ErrorMessage';

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { id: $id, name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  const { data, error, loading } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });

  const [
    updateProduct,
    { data: mutationData, error: mutationError, loading: mutationLoadin },
  ] = useMutation(UPDATE_PRODUCT_MUTATION, {
    variables: {
      id,
    },
  });
  return (
    <FormStyles
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await createProduct();
        console.log('from mutation', res)
        clearForm();
        console.log('mutation func', createProduct)
        console.log('data? ', data)
        Router.push({
          pathname: `/product/${res.data.createProduct.id}`,
        });
      }}
    >
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          Image
          <input type="file" id="image" name="image" onChange={handleChange} />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">+ Add Product</button>
      </fieldset>
      <button type="button" onClick={clearForm}>
        Clear Form
      </button>
      <button type="button" onClick={resetForm}>
        Reset Form
      </button>
    </FormStyles>
  );
}
