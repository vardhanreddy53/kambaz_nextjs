 import Link from "next/link";
 export default function Lab2(){
    return(
        <div id="wd-forms">
              <h1>CSS LABS starts from </h1> 
              <Link href="/Labs/lab3" >
        Lab 3</Link>
  <h4>Form Elements</h4>
  <form id="wd-text-fields">
    <h5>Text Fields</h5>
    <label htmlFor="wd-text-fields-username">Username:</label>
    <input placeholder="Username" id="wd-text-fields-username" /> <br />
    <label htmlFor="wd-text-fields-password">Password:</label>
    <input type="password" placeholder="password" title="password" id="wd-text-fields-password" />
    <br/>
    <label htmlFor="wd-text-fields-first-name">First name:</label>
    <input type="text" placeholder="First Name" title="First Name" id="wd-text-fields-first-name" /> <br />
    <label htmlFor="wd-text-fields-last-name">Last name:</label>
    <input type="text" placeholder="LastName" title="The last name" id="wd-text-fields-last-name" />
  </form>
  <h4 id="wd-textarea-tag">Textareas</h4>
<label htmlFor="wd-textarea">Biography:</label><br/>
<textarea id="wd-textarea" placeholder="Tell me something about yourself..." cols={30} rows={10} />
  <h5 id="wd-radio-buttons">Radio buttons</h5>

<label>your Favorite movie genre:</label><br />

<input type="radio" name="radio-genre" id="wd-radio-comedy"/>
<label htmlFor="wd-radio-comedy">Comedy</label><br />

<input type="radio" name="radio-genre" id="wd-radio-drama"/>
<label htmlFor="wd-radio-drama">Drama</label><br />

<input type="radio" name="radio-genre" id="wd-radio-scifi"/>
<label htmlFor="wd-radio-scifi">Science Fiction</label><br />
<input type="radio" name="radio-genre" id="wd-radio-fantasy"/>
<label htmlFor="wd-radio-fantasy">Fantasy</label>

<h5 id="wd-checkboxes">Checkboxes</h5>
<label>Your Favorite webseries genre:</label><br/>

<input type="checkbox" name="check-genre" id="wd-chkbox-comedy"/>
<label htmlFor="wd-chkbox-comedy">romcom</label><br/>

<input type="checkbox" name="check-genre" id="wd-chkbox-drama"/>
<label htmlFor="wd-chkbox-drama">drama</label><br/>

<input type="checkbox" name="check-genre" id="wd-chkbox-scifi"/>
<label htmlFor="wd-chkbox-scifi">K-drama</label><br/>

<input type="checkbox" name="check-genre" id="wd-chkbox-fantasy"/>
<label htmlFor="wd-chkbox-fantasy">anime</label>
<h4 id="wd-dropdowns">Dropdowns</h4>
<h5>Select one</h5>
<label  htmlFor="wd-select-one-genre"> Favorite movie genre: </label><br/>
<select id="wd-select-one-genre">
   <option value="COMEDY">Comedy</option>
   <option value="DRAMA">Drama</option>
   <option selected value="SCIFI">
       Science Fiction</option>
   <option value="FANTASY">Fantasy</option>
</select>
<h5>Select many</h5>
<label  htmlFor="wd-select-many-genre"> Favorite movie genres: </label><br/>
<select multiple id="wd-select-many-genre">
   <option value="COMEDY" selected> Comedy          </option>
   <option value="DRAMA">           Drama           </option>
   <option value="SCIFI"  selected> Science Fiction </option>
   <option value="FANTASY">         Fantasy         </option>
</select>
<h4>Other HTML field types</h4>

<label htmlFor="wd-text-fields-email"> Email: </label>
<input type="email"
       placeholder="Pathuri.sai@Neu.edu"
       id="wd-text-fields-email"/><br/>

<label htmlFor="wd-text-fields-salary-start"> Starting salary:</label>
<input type="number"
       value="1000000"
       placeholder="1000000"
       id="wd-text-fields-salary-start"/><br/>

<label htmlFor="wd-text-fields-rating"> Rating: </label>
<input type="range"
       value="2"
       max="5"
       id="wd-text-fields-rating"/><br/>

<label htmlFor="wd-text-fields-dob"> Date of birth: </label>
<input type="date"
       value="2000-01-21"
       id="wd-text-fields-dob"/><br/>
<h4>Anchor tag</h4>
Please
<a href="https://www.lipsum.com" id="wd-lipsum">click here</a>
to get dummy text<br/>
<h4>Textarea</h4>
<textarea placeholder="Enter your comments here..." rows={4} cols={50}></textarea>

<h4>File Upload</h4>
<input type="file" id="wd-file-upload" />
<h4 id="wd-file-upload">File Upload</h4>
<label htmlFor="wd-file-upload-button">Upload File:</label><br/>
<input type="file" id="wd-file-upload-button" />
</div>);
}