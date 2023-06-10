import { createContext, useContext } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  // Custom provider. Stores state and functionality to update state.
  // Accessed via consumer.

  const cartOpen = true;

  return (
    <LocalStateProvider value={{ cartOpen }}>{children}</LocalStateProvider>
  );
}

// custom hook for accessing local cart state
function useCart() {
    // Consumer to access local state
    const all = useContext(LocalStateContext);

    return all;
}
export { CartStateProvider, useCart };
