import Link from "next/link";

export default function AccountNavigation() {
  return (
    <div id="wd-account-navigation">
      <ul>
        <li><Link href="/Account/Signin">Signin</Link></li>
        <li><Link href="/Account/Signup">Signup</Link></li>
        <li><Link href="/Account/Profile">Profile</Link></li>
      </ul>
    </div>
  );
}