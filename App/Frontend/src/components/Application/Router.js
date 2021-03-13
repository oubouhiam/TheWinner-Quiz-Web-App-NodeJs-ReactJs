import React from 'react';
import { BrowserRouter , Route, Switch} from 'react-router-dom';
// ______________Public Route__________________
import Home from '../Home/Home';
import Quiz from '../Home/Quiz';
import Play from '../Home/Play';
import Winner from '../Home/Winner';
import Lose from '../Home/lose';
import SignUp from '../Home/pages/SignUp';
import inscrit from '../Home/pages/inscrit';
// ______________Private Route__________________
import Categories from '../Dash/Categories';
import dashboard from '../Dash/Dashboard';
import Question from '../Dash/Question';
import AddCategory from '../Dash/AddCategory';
import EditCategory from '../Dash/EditCategory';
import AddQuestion from '../Dash/AddQuestion';
import EditQuestion from '../Dash/EditQuestion';
import AdminLogin from '../Dash/AdminLogin';
import PrivateRoute from '../authtification/PrivateRoute';

function Routes() {
  return (
<BrowserRouter>
      <Switch> 
      {/* // ______________Public Route__________________ */}
          <Route  path="/" exact component={Home}/> 
          <Route  path="/admin" exact component={AdminLogin}/>
          <Route path='/sign-up' component={SignUp} />
          <Route path='/inscrit' component={inscrit} />
          {/* // ______________Private Route__________________ */}
          <PrivateRoute  path="/quiz" exact component={Quiz}/> 
          <PrivateRoute  path="/categories" exact component={Categories}/>
          <PrivateRoute  path="/dashboard" exact component={dashboard}/>
          <PrivateRoute  path="/questions" exact component={Question}/>
          <PrivateRoute  path="/addCategory" exact component={AddCategory}/>
          <PrivateRoute  path="/editCategory" exact component={EditCategory}/>
          <PrivateRoute  path="/addQuestion" exact component={AddQuestion}/>
          <PrivateRoute  path="/editQuestion" exact component={EditQuestion}/>
          <PrivateRoute  path="/play" exact component={Play}/>
          <PrivateRoute  path="/winner" exact component={Winner}/>
          <PrivateRoute  path="/lose" exact component={Lose}/>
      </Switch>
</BrowserRouter>
  );
}
export default Routes;