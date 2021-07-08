import React, {  useState,useEffect } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { Row,Col,Form,FormGroup,Label,Input,Button } from 'reactstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import Figure from 'react-bootstrap/Figure';
import bag from './components/bag.jpg'
import watch from './components/watch.jpg'
import shoe from './components/shoe.jpg'
import axios from 'axios';  
import { useHistory } from 'react-router';
import FigureCaption from 'react-bootstrap/FigureCaption'
import './App.css';

const App = () => {

  const [INR,SetINR] = useState({INR:'1'});
  const [USD,SetUSD] = useState({USD:'1'});
  const history = useHistory();


  // useEffect(() => {
  //   async function fetchApiPrice() {
  //     const response = await fetch("https://v6.exchangerate-api.com/v6/bb7d6f09d4b6f55794c92ea0/latest/INR");
  //     const body = await response.json();
  //     SetINR({INR:body.conversion_rates.INR})


  //   }
  //   fetchApiPrice();
    
  // }, []);


  function fetchINRApiPrice() {
    window.location.reload();
    axios.get("https://v6.exchangerate-api.com/v6/9636f34c0d7fa01e04e9decb/latest/INR")
     .then(response => SetINR({ INR: response.data.conversion_rates.INR }));

  }


   function fetchUSDApiPrice() {
    axios.get("https://v6.exchangerate-api.com/v6/9636f34c0d7fa01e04e9decb/latest/INR")
     .then(response => SetUSD({ USD: response.data.conversion_rates.USD }));

  }



return(
  <div> 

<Navbar bg="light" expand="lg" >
  <Navbar.Brand href="#home">Assignment</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <NavDropdown title="Currency" id="basic-nav-dropdown">
        {/* <NavDropdown.Item href="#action/3.1">INR</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">USD</NavDropdown.Item> */}
              <NavDropdown.Item href="" onClick={fetchINRApiPrice}>INR</NavDropdown.Item>
        <NavDropdown.Item href="" onClick={fetchUSDApiPrice}>USD</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  </Navbar.Collapse>
</Navbar>


<Figure>
  <Figure.Image
   width={171}
   height={180}
    src={shoe}
 
  />
  <Figure.Caption>
Product Name : Shoe  
</Figure.Caption>
<Figure.Caption>
Price : {100*(INR.INR)*(USD.USD)}
  </Figure.Caption>
  </Figure>


<Figure>
  <Figure.Image
  width={171}
  height={180}
    alt="171x180"
    src={watch}

  />
  <Figure.Caption>
Product Name : Watch
  </Figure.Caption>

  <Figure.Caption>
 Price :  {200*(INR.INR)*(USD.USD)}
  </Figure.Caption>

</Figure>



<Figure>
  <Figure.Image
  width={171}
  height={180}
    alt="171x180"
    src={bag}
  />
  <Figure.Caption>
Product Name : Bag
</Figure.Caption>


<Figure.Caption>
Price : {300*(INR.INR)*(USD.USD)}
  </Figure.Caption>

  </Figure>


  </div>
  
  )
}






export default App;

