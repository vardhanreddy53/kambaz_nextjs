import Link from "next/link";
export default function Labs() {
 return (
   <div id="wd-labs">
    <h1>Hello</h1>
     <h1>Labs</h1>
     <ol>
       <li>
         <Link href="/Labs/lab1" id="wd-lab1-link">
           Lab 1</Link>
       </li>
       <li>
         <Link href="/Labs/lab2" id="wd-lab2-link">
           Lab 2 </Link>
       </li>
       <li>
        <Link href="/Labs/lab3" id="wd-lab2-link">
        Lab 3</Link>
       </li>
     </ol>
   </div>
);}
