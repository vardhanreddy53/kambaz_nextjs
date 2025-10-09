"use client";
import { ReactNode } from "react";
import TOC from "./TOC";

export default function LabsLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2 col-lg-2">
          <TOC/>
        </div>
        <div className="col-md-10 col-lg-10">
          {children}
        </div>
      </div>
    </div>
  );
}
