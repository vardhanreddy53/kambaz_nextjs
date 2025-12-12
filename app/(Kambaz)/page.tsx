import Link from "next/link";

export default function Kambaz(){
  return (
    <div id="wd-kambaz">
      <p>Hi My Name is Sai Vardhan Reddy Pathuri Currently pursuing</p> 
        <p>my master in computer science from Northeastern university i have joined NEU for Fall 2025 and taken CS5610</p><p>202610 WebDev By Jose Annunziato</p>
    <a href="https://github.com/vardhanreddy53/kambaz_nextjs">Github</a>
    <p>Bala Asrith Chavla</p>
    <a href="https://github.com/chavalab">Github</a>
    <div id="wd-labs">
     <h1>Labs</h1>
     <ol>
       <li>
         <Link href="/Labs/lab1" id="wd-lab1-link">
           Lab 1(basic html)</Link>
       </li>
       <li>
         <Link href="/Labs/lab2" id="wd-lab2-link">
           Lab 2(Basic html)</Link>
       </li>
       <li>
        <Link href="/Labs/lab3" id="wd-lab2-link">
        Lab 3(CSS+bootstrap)</Link>
       </li>
       <li>
        <Link href="/Labs/lab4" id="wd-lab4-link">Lab4(JS)</Link>
       </li>
       <li>
        <Link href="/Labs/lab5" id="wd-lab4-link">Lab5(Handler functinons)</Link>
       </li>
        <li>
        <Link href="/Labs/lab6" id="wd-lab4-link">Lab5(API)</Link>
       </li>
     </ol>
   </div>
    </div>
);}
