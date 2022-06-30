import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  // apollo reads, merges, then reads to check
  // if everything can now be returned from cache if data missing from cache
  return {
    keyArgs: false, // override apollo default behavior
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      console.log({ existing, args, cache });
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      console.log('data', data);
      if (data) {
        const count = data?._allProductsMeta?.count;
        // calculate current page: divide how many we skipped by how many perPage (first) then add one page to get to current page
        const page = skip / first + 1;
        const totalPageCount = Math.ceil(count / first);
        // check if we have items in cache
        //  (skip how ever many previous items, get the next perPage items for the current page)
        const items = existing.slice(skip, skip + first).filter((x) => x);
  
        // if there are items in cache, but not the same amount as requested (first) and it's the last page
        // simply return the items
        if (items.length && items.length !== first && page === totalPageCount) {
          return items;
        }
        if (items.length !== first) {
          return false;
        }
  
        if (items.length) {
          console.log(`There are ${items.length} items in the cache!`);
          return items;
        }
      }

      return false;
    },
    merge(existing, incoming, { args }) {
      // runs after apollo makes a network request
      const { skip } = args;
      console.log(`merging from network ${incoming.length}`, `existing ? ${existing}`);
      const merged = existing ? existing.slice(0) : [];

      for (let i = skip; i < skip + incoming.length; i += 1) {
        merged[i] = incoming[i - skip];
      }
      console.log(`Merged: ${merged}`);

      return merged;
    },
  };
}
