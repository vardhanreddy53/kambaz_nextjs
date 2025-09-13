import Link from 'next/link';

export default function Homepage() {
  return (
     <div className="container">
      <h1>Hi, this is Sai Vardhan Reddy Pathuri</h1>
      <h3>This is the homepage for CS610</h3>
     <ol>
      <li><Link href="Labs">Home</Link></li>
      <li><Link href="kambaz">Kambaz</Link></li>
    <li><Link href="Labs/lab1">Lab 1</Link></li>
    <li><Link href="/Labs/lab2">Lab 2</Link></li>
  </ol>
      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div>
          <p>&copy; 2024 Sai Vardhan Reddy Pathuri. All rights reserved.</p>
          <p className="text-sm text-gray-400 mt-1">CS610 - Web Development Portfolio</p>
        </div>
      </footer>
      </div>
  );
}