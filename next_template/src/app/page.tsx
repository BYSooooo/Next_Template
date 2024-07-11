"use client"

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import MovieCard from './components/MovieCard';
import MessengerCard from './components/MessengerCard';
import ShoppingCard from './components/ShoppingCard';

export default function RootPage() {

  return (
      <Container maxWidth="lg" sx={{ mt : "5rem", maxWidth : "80vw"}}>
          <Box>
              <Typography variant='h4' component="h1" gutterBottom fontWeight='bold'>
                  Project List
              </Typography>
              <Grid container spacing={2}>
                  <Grid xs={12} sm={6} md={4}>
                      <MovieCard path='/movie'/>
                  </Grid> 
                  <Grid xs={12} sm={6} md={4}>
                      <MessengerCard path='/messenger' />
                  </Grid>
                  <Grid xs={12} sm={6} md={4}>
                      <ShoppingCard path='/shopping' />
                  </Grid>
              </Grid>
          </Box>
      </Container>
  )
}