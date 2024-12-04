import { POPULAR_MOVIES,options } from '../utils/constant'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setPopularMovie } from '../redux/slice/movieSlice'


const popularMovie=async()=>{
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch=useDispatch();
    try{
  
      const res=await axios.get(POPULAR_MOVIES,options);
      console.log("popular",res);
      if(res){
        const popularMovie=res.data.results
        // console.log();
        if(localStorage.getItem("token")){
          dispatch(setPopularMovie(popularMovie))
        }
        
        
      }
  
    }
  catch(error){
  console.log("out api error",error);
  }
  }

  export default popularMovie