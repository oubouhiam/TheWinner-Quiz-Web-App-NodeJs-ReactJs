import React, {useEffect, useState} from 'react';
import {useHistory } from 'react-router-dom';
import axios from 'axios';
import './style/quiz.css';
import Navbar from './Navbar2';

const Quiz = () => {

  const history = useHistory();
  const [categories , setCategories] = useState(null);

  useEffect(()=>{
    axios.get(`http://localhost:8081/category`)
      .then(function (response) {
        setCategories(response.data)
      }).catch(function (err) {
        console.log(err);
    });
    
    })

let handleClick =(id)=>{

  localStorage.setItem('idCategory',id);

  history.push('/play');

}
  return(
        <body class="categoryback">
          <Navbar />
          <div  id="home">
            <div className="container">
                <div id="answers">
                  <h6 class="ttlcate">Shoose your Category <br/> Enjoye!</h6> 
                  <div class="categoryitm"> { categories && categories.map(item =>(
                    <li>
                      <p>
                        <a href="/play" onClick={()=>{ handleClick(item._id)}}> {item.nameCategory}
                        </a>
                      </p>
                    </li>))} 
                  </div>
                </div>
              </div>
            </div>
        </body>
      );
    }

export default Quiz;