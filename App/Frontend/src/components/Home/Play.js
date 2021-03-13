import React, { useEffect,useState } from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import Navbar from './Navbar2';
import './style/play.css';

const Play = () => {
    const [question , setQuestion] = useState(null);
    const [questionNum , setQuestionNum] = useState(1);
    const [score , setScore] = useState(0);
    const [numTry , setNumTry] = useState(0);
    const [numFalseQuestion , setNumFalseQuestion ] = useState(0);
    // const [questionEnd , setQuestionEnd] = useState(false);
    const history = useHistory();


    let handleClick = (answer,idQuestion)=>{
        
        let questionCount = questionNum
        let idCategory = localStorage.getItem('idCategory');

        if (numTry < 3) {
            
            // check if the anwser is correct
            
            axios.get(`http://localhost:8081/question/oneQuestion/${idQuestion}`)
            .then(function (response) {

                if (response.data.correctAnswer === answer) {

                    let oldScore = score;
                    setScore(oldScore + 10);     
                } else {

                   let falseQuestion = numFalseQuestion;
                   setNumFalseQuestion(falseQuestion +1)
                 
                    
                }

                if (questionCount < 11) {
                    // get question from db 

                    axios.get(`http://localhost:8081/question/${idCategory}`)
                        .then(function (response) {
                            setQuestion(response.data)
                            setQuestionNum( questionCount + 1) 
                    
                            }).catch(function (err) {
                                console.log(err);
                            });

                
                } else {

                    if (numFalseQuestion >= 3) {
                        
                        let oldNumTry = numTry;
                        setNumTry(oldNumTry + 1)
                        setNumFalseQuestion(0);
                        setQuestionNum(0);
                        setScore(0)
                        
                    }else{
                      
                        history.push('/winner');
                        localStorage.setItem('score',score);
                    }
                   
                }

            })



            
        } else {
            history.push('/lose');
          
            
        }


    
        
        console.log('--------------------------------------------------------');

        console.log(score);

        console.log('--------------------------------------------------------');

        console.log(numFalseQuestion);
        console.log('--------------------------------------------------------');

        console.log(numTry);
        console.log('--------------------------------------------------------');

    }
        useEffect(()=>{
            let idCategory = localStorage.getItem('idCategory');
                // console.log(numQuestion);

                axios.get(`http://localhost:8081/question/${idCategory}`)
                .then(function (response) {
                 
                    setQuestion(response.data)
                                  
                }).catch(function (err) {
                  console.log(err);
              });
              
              },[])

        return(
                <body class="questback">
                    <div id="home">
                        {/* <nav class="navbar navbar-light navbar-expand-md bg-faded justify-content-center bg-primary fixed">
                            <a href="/" class="navbar-brand d-flex w-50 mr-auto">The Winning</a>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsingNavbar3">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="navbar-collapse collapse w-100" id="collapsingNavbar3">
                                <ul class="navbar-nav w-100 justify-content-center">
                                    <li class="nav-item active">
                                        <a class="nav-link" href="/quiz">Game</a>
                                    </li>
                                </ul>
                                <ul class="nav navbar-nav ml-auto w-100 justify-content-end">
                                    <li class="nav-item">
                                        {/* <Link  onClick={logOut} className="nav-link">log out</Link> */}
                                    {/* </li>
                                 </ul>
                            </div>
                        </nav>          */}
                        <Navbar />
                        
                        <div className="container play">
                            <div className="row">
                                <div className="col-lg-10 col-lg-offset-1 ">
                                    <div id="question">
                                        <h4 class="questiontitle">Question {questionNum} /10 </h4>
                                        <h4 class="trytitle"><span>Vore Score :{score}</span> Try: {numTry}</h4>
                                        <p className="questiontitle">{ question && question.question}</p>
                                    </div>
                                    <div className="question" id="answers">
                                        <div className="colo1">
                                            <li className="answer" onClick={()=>{ handleClick(question.correctAnswer,question._id) }}><p >{ question && question.correctAnswer}</p></li>
                                            <li className="answer answer2" onClick={()=>{ handleClick(question.incorrectAnswer1,question._id) }}><p className="option" >{ question && question.incorrectAnswer1}</p></li>
                                        </div>
                                        <div>
                                            <li className="answer" onClick={()=>{ handleClick(question.incorrectAnswer2,question._id) }} ><p className="option" >{ question && question.incorrectAnswer2}</p></li>
                                            <li className="answer answer2" onClick={()=>{ handleClick(question.incorrectAnswer3,question._id) }}><p className="option"  >{ question && question.incorrectAnswer3}</p></li>
                                        </div>
                                    </div>
                                    {/* <div id="submit">
                                        {showButton ? <button className="fancy-btn" onClick={this.nextQuestion} >{nr===total ? 'Finish quiz' : 'Next question'}</button> : null}
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </body>
            );
        }
export default Play;