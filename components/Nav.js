import Link from 'next/link';
import { SignOut } from './SignOut';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

export default function Nav() {
  const user = useUser();
  console.log(user);
  const signOut = SignOut();
  async function handleSignOut() {
    const res = await signOut();
    console.log('sign out ', res);
  }

  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <Link href="/">
            <a
              role="link"
              tabIndex={0}
              onKeyDown={handleSignOut}
              onClick={handleSignOut}
            >
              Sign Out
            </a>
          </Link>
        </>
      )}
      {!user && (
        <>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  );
}
