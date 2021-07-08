import React, {  useState,useEffect } from 'react';
import './App.css';
import { GoogleLogin } from 'react-google-login'
import { GoogleLogout } from 'react-google-login'
import Home from './components/Home';
import { BrowserRouter as Router,Switch,Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import AddApplication from './components/AddApplication'
import AddProgress from './components/AddProgress'
import RoleApplicationDetail from './components/RoleApplicationDetail';
import axios from 'axios';  
import ApplicationProgressStatus from './components/ApplicationProgessStatus';  
import EditRole from './components/EditRole';
import AddRole from './components/AddRole';
import { Offline, Online } from "react-detect-offline";
import Alert from 'react-bootstrap/Alert'
import { ToastProvider, useToasts } from 'react-toast-notifications';
import { HOST } from './config'



const App = () => {
 
const [isAuthenticated,setIsAuthenticated] = useState(false);
const [user,setUser]= useState({name:"",email:"",image:""});
const[UserType,setUserType] = useState([]);

const responseGoogle = async(response) => {
  var profile = await response.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  //set user 

  setUser({
    name:profile.getName(),
    email:profile.getEmail(),
    image:profile.getImageUrl()
  })
}

//logout

const logout = () => {
  setUser({name:"",email:"",image:""})
  setIsAuthenticated(false);
}

  useEffect(() => {
    // if((user.email.length> 0 || user.name.length) > 0 &&(user.email.includes('kritikalvision.ai')))
    if((user.email.length> 0 || user.name.length) > 0)

    setIsAuthenticated(true)
  },[user])


async function user_register (username,useremail)  {
const response = await fetch(HOST+"/roles/user_register/"+username+"/"+useremail);
// const body = await response.json();
}



  

return(
  // <div className="App">
  <div style={{ maxWidth:"90em", margin:"4rem auto"}}>
    <section>
    { isAuthenticated ? <AuthenticatedView logout={logout} user={user} user_register = {user_register} /> : <UnAuthenticatedView responseGoogle={responseGoogle} user={user}/>}


    </section>
  </div>
);

}
const AuthenticatedView = ({user,logout,user_register}) => {
  { if(user.email.length> 0 || user.name.length > 0)
    user_register(user.name,user.email)
  } 
  return(
    <div className="authenticated-div">
   
  



   <div className="card">             
  <div className="card-body">
    <h5 className="card-title">  <img className="authenticated__avatar" src={user.image } alt='avatar'  style={{ width:"50px",height:"50px",  "borderRadius": "25px"}}></img></h5>
    <h6 className="card-subtitle mb-2 text-muted">  <small className="authenticated__email" >{user.email} </small></h6>
    <a href="#" className="card-link">  <GoogleLogout clientId="904551788361-6ju396371ssnjo4e88n95e9bsq9hc05k.apps.googleusercontent.com"
    buttonText="logout" onLogoutSuccess={ logout } />

    </a>
  </div>

  {/* <Online>
<Alert key={'success'} variant={'success'}>
    <Alert.Link href="#">  you're in online(Connected to Internet)
</Alert.Link>
  </Alert>
  </Online> */}
  

  {/* <Offline>
  <Alert key={'danger'} variant={'danger'}>
    <Alert.Link href="#">   you're in offline(Not Connected to Internet)
</Alert.Link>
  </Alert>
  </Offline>
   */}

   
  <div>
</div>
</div>


<Router>
  <Switch>
    
  <Route exact path="/"  render={() => <Home email={user.email} />} />


  <Route path="/role/add"  render={() => <AddRole name={user.email} />} />

  <Route exact path="/role/edit/:id" render={props => (<EditRole {...props} email={user.email} />)}/> 


  <Route path="/application/add"  render={() => <AddApplication email={user.email}  />} />


  <Route path="/progress/add"  render={() => <AddProgress name={user.email} />} />



  <Route path="/profiles" component={ApplicationProgressStatus} />



  <ToastProvider>
  <Route exact path="/role/view/:id" render={props => (<RoleApplicationDetail {...props} email={user.email} />)}/> 
  </ToastProvider>

    </Switch>
</Router>

    </div> 
  )
}


const UnAuthenticatedView = ({ responseGoogle,user }) => {
  return (

    <div style={{'top': '50%', 'left': '50%', 'position': 'absolute', 'marginTop': '-50px',  'marginLeft': '-100px' }}> 
   <GoogleLogin clientId="904551788361-6ju396371ssnjo4e88n95e9bsq9hc05k.apps.googleusercontent.com"
    buttonText="login" onSuccess={ responseGoogle } onFailure= { responseGoogle } isSignedIn={true} 
    cookiePolicy={'single_host_origin'}/>

{/* <div className="card">             
  <div className="card-body">
    <h5 className="card-title"></h5>
    <h6 className="card-subtitle mb-2 text-muted">  
    <small className="authenticated__email" > {user.email ? <h1>User Not Authorized</h1>:null} </small>
    </h6>
  </div>
</div> */}

    </div>



  )
  
}



export default App;

