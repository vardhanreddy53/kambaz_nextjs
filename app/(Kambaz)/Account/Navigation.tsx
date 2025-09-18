import Link from "next/link";
export default function AccountNavigation() {
 return (
   <div id="wd-account-navigation">
    <ul>
     <li><Link href="Signin"> Signin </Link></li>
    <li><Link href="Signup"> Signup </Link></li>
     <li><Link href="Profile"> Profile </Link> </li>
     </ul>
   </div>
);}
