import { ReactNode } from "react";
import AccountNavigation from "./Navigation";

export default function AccountLayout({ 
  children 
}: Readonly<{ children: ReactNode }>) {
  return (
    <div id="wd-account" className="container-fluid">
      <div className="row">
        <div className="col-md-3 col-lg-2 d-none d-md-block">
          <AccountNavigation />
        </div>
        <div className="col-md-9 col-lg-10">
          {children}
        </div>
      </div>
    </div>
  );
}