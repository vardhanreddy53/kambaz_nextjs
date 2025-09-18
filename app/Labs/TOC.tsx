import Link from "next/link";
export default function TOC() {
 return (
   <ul>
     <li>
       <Link href="/Labs" id="wd-Home-link">
         Home </Link>
     </li>
     <li>
       <Link href="/Labs/lab1" id="wd-lab1-link">
         Lab 1 </Link>
     </li>
     <li>
       <Link href="/Labs/lab2" id="wd-lab2-link">
         Lab 2 </Link>
     </li>
     <li>
       <Link href="Labs/lab3" id="wd-lab3-link">
         Kambaz</Link>
     </li>
      <li>
       <Link href="/" id="wd-Kambaz-link">
         Kambaz</Link>
     </li>
   </ul>
);}
