import { UPCOMING_MOVIES,options } from '../utils/constant'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUpcomingMovie } from '../redux/slice/movieSlice'


const upcomingMovie=async()=>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch=useDispatch();
    try{
  
      const res=await axios.get(UPCOMING_MOVIES,options);
      console.log("upcomingMovie",res);
      if(res){
        const upcomingMovie=res.data.results
        // console.log();
        if(localStorage.getItem("token")){
          dispatch(setUpcomingMovie(upcomingMovie))
        }
        
        
      }
  
    }
  catch(error){
  console.log("out api error",error);
  }
  }

  export default upcomingMovie