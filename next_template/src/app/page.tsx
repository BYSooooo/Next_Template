import Home from '@/layouts/Home/Home';
import Menu from '@/layouts/Menu/Menu';
import { MenuRounded } from '@mui/icons-material';
import { Button, SwipeableDrawer } from '@mui/material';
import * as React from 'react';


  

const toggleDrawer = (anchor : string, open : boolean) => 
  (event : React.KeyboardEvent | React.MouseEvent) => {
    if( event && 
        event.type === 'keydown' && 
        ((event as React.KeyboardEvent).key === 'Tab' || 
          (event as React.KeyboardEvent).key === 'Shift')) 
          { 
            return; 
          }
    }




export default function RootPage() {
  return (
    <>
      <Menu />      
      <Home />
    </>
      )
}