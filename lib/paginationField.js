import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  // apollo reads, merges, then reads to check
  // if everything can now be returned from cache if data missing from cache
  return {
    keyArgs: false, // override apollo default behavior
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      console.log({ existing, args, cache })
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      console.log(data);
      const count = data?._allProductsMeta?.count;
      // calculate current page: divide how many we skipped by how many perPage (first) then add one page to get to current page
      const page = skip / first + 1;
      const pageCount = Math.ceil(count / first);
      // check if we have items in cache
      //  (skip how ever many previous items, get the next perPage items for the current page)
      const items = existing.slice(skip, skip + first).filter((x) => x);

      if (items.length !== first) {
        return false;
      }

      if (items.length) {
        console.log(`There are ${items.length} items in the cache!`);
        return items;
      }

      return false;
    },
    merge() {
      // runs after apollo makes a network request
    },
  };
}
