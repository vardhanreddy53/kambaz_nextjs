'use client';
import { usePathname } from 'next/navigation';
import { FaAlignJustify } from 'react-icons/fa6';
import React from 'react';

export default function Breadcrumb({ courseName }: { courseName: string }) {
  const pathname = usePathname();
  const pathSegments = pathname.split('/');
  let sectionName = pathSegments[3] || 'Home';
  sectionName = sectionName.charAt(0).toUpperCase() + sectionName.slice(1);

  return (
    <h2 className="text-danger">
      <FaAlignJustify className="me-3 fs-4 mb-1" />
      {courseName} &gt; {sectionName}
    </h2>
  );
}