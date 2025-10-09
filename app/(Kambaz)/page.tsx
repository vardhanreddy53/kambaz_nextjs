import Link from "next/link";

export default function Kambaz(){
  return (
    <div id="wd-kambaz">
      <p>Hi My Name is Sai Vardhan Reddy Pathuri Currently pursuing</p> 
        <p>my master in computer science from Northeastern university i have joined NEU for Fall 2025 and taken CS5610</p><p>202610 WebDev By Jose Annunziato</p>
    <a href="https://github.com/vardhanreddy53/kambaz_nextjs">Github</a>
    <div id="wd-labs">
      <h1>This is</h1>
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
    </div>
);}
