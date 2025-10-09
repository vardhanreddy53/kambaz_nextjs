import "./index.css";
import ForeGround from "./ForegroundColors";
import Background from "./BackgroundColors"
import Borders from "./Borders";
import Padding from "./Padding";
import Margins from "./Margins";
import Corners from "./Corners";
import Dimensions from "./Dimensions";
import Positions from "./Positions";
import Zindex from "./Zindex";
import Float from "./Float";
import Grid from "./GridLayout";
import ReactIcons from "./ReactIcons";
import { Container } from "react-bootstrap";
import Bootgrid from "./BootstrapGrids";
import Ss from "./ScreenSizeLabel";
import BootstrapTables from "./BootstrapTables";
import BootstrapLists from "./BootstrapLists";
import BootstrapForm from "./BootstrapForms";
import BootstrapNavigation from "./BootstrapNavigation";
import Flex from "./Flex";

export default function lab3(){
    return(
        <Container>
      <h2>Lab 2 - CSS Basics</h2>

   
      <div id="wd-css-id-selectors">
        <h3>ID Selectors</h3>
        <p id="wd-id-selector-1">This is a red paragraph with white text.</p>
        <p id="wd-id-selector-2">This is a yellow paragraph with black text.</p>
      </div>

      <div id="wd-css-class-selectors">
        <h3>Class Selectors</h3>
        <p className="wd-class-selector-1">This is a blue paragraph on a yellow background.</p>
        <h4 className="wd-class-selector-2">This is a blue heading on a yellow background.</h4>
      </div>

      <div id="wd-css-doc-structure">
        <h3>Document Structure</h3>
        <div id="wd-doc-structure-1">This is a red div with white text.</div>
        <div id="wd-doc-structure-2">
          This is a yellow div with a <span>small blue span</span> inside.
        </div>
      </div>

     <ForeGround />
     <Background/>
     <Borders/>
     <Padding/>
     <Margins/>
     <Corners/>
     <Dimensions/>
     <Positions/>
     <Zindex/>
     <Float/>
     <Grid/>
     <Flex/>
     <ReactIcons/>
     <Bootgrid/>
     <Ss/>
     <BootstrapTables/>
     <BootstrapLists/>
     <BootstrapForm/>
     <BootstrapNavigation/>
    </Container>    
  );
}