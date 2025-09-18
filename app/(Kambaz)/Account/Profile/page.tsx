import Link from "next/link";

export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <input defaultValue="Vardhan" placeholder="username" className="wd-username"/><br/>
      <input defaultValue="123123123" placeholder="password" type="password"
             className="wd-password" /><br/>
      <input defaultValue="Vardhan" placeholder="First Name" id="wd-firstname" /><br/>
      <input defaultValue="Reddy" placeholder="Last Name" id="wd-lastname" /><br/>
      <input defaultValue="2004-02-29" type="date" id="wd-dob" /><br/>
      <input defaultValue="Vardhan@northeastern" type="email" id="wd-email" /><br/>
      <select defaultValue="STUDENT" id="wd-role">
        <option value="USER">User</option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </select><br/>
      <Link href="/Account/Signin">Sign out</Link>
    </div>
  );
}