import { TOP_RATED_MOVIES,options } from '../utils/constant'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setTopRatedMovie } from '../redux/slice/movieSlice'


const topRatedMovie=async()=>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch=useDispatch();
    try{
  
      const res=await axios.get(TOP_RATED_MOVIES,options);
      console.log("toprated",res);
      if(res){
        const topRatedMovie=res.data.results
        // console.log();
        if(localStorage.getItem("token")){
          dispatch(setTopRatedMovie(topRatedMovie))
        }
        
        
      }
  
    }
  catch(error){
  console.log("out api error",error);
  }
  }

  export default topRatedMovie