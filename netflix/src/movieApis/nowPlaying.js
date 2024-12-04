import { NOW_PLAYING_MOVIES,options } from '../utils/constant'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setNowMovie } from '../redux/slice/movieSlice'


const nowPlayingMovie=async()=>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch=useDispatch();
    try{
  
      const res=await axios.get(NOW_PLAYING_MOVIES,options);
      if(res){
        const nowMovie=res.data.results
        // console.log();
        if(localStorage.getItem("token")){
          dispatch(setNowMovie(nowMovie))
        }
        
        
      }
  
    }
  catch(error){
  console.log("out api error",error);
  }
  }

  export default nowPlayingMovie