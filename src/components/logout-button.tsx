'use client';

import { useLogout } from "getjacked-components";

export function LogoutButton() {
  const { logout } = useLogout();
  return <button onClick={logout}>Logout</button>;
}
