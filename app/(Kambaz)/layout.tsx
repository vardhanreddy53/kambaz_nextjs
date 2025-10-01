import { ReactNode } from "react";
import "./styles.css";
import KambazNavigation from "./Navigation";
export default function KambazLayout({ children }: Readonly<{ children: ReactNode }>) {
 return (
   <div id="wd-kambaz">
      <KambazNavigation />
      <div className="wd-main-content-offset p-3">
         {children}
      </div>
    </div>
);}
