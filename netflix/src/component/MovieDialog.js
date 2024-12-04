import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch, useSelector } from 'react-redux';
import {setOpenDetails } from '../redux/slice/movieSlice';
import VideoBackground from './VideaBackground'

 const MovieDialog=()=> {
    let {open,playMovieId}=useSelector((store)=>store.movie)
    const dispatch=useDispatch();
    const handleClose=() =>{
        const movieId=null;
        open=false;
        dispatch(setOpenDetails({open,movieId}))
    }

  return (
    <React.Fragment>
      
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
       
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           <VideoBackground bool={true} movieId={playMovieId}/>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
         
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
export default MovieDialog;
