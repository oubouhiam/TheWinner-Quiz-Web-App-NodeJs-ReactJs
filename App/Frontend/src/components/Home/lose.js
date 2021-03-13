
import video from './pages/videos/lose.mp4'
import Navbar from './Navbar2'
import './style/lose.css';

const Loser = () => {

return(

<div>
  <Navbar />
  <div className='hero-container'>
      <video src={video} autoPlay loop muted />
      <h1>You Lose</h1>
      <p>You Well be a winner just trust Your Self and</p>
      <a href="/quiz" className="btnlose">TRY AGAIN</a>
      
      </div>
    </div>



    );
            }
            
export default Loser;