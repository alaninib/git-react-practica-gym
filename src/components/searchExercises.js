import React, { useEffect, useState } from 'react'
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import HorizontalScrollBar from '../components/HorizontalScrollBar'

import { exerciseOptions, fetchData } from '../utils/fetchData';

function SearchExercises({setExercises, bodyPart, setBodyPart}) {
  const [search, setSearch] = useState('');
  const [bodyParts, setBodyParts] = useState([])

  const bodyPartsData = () => {
    const bodyPartsData = JSON.parse(localStorage.getItem('partsBodyData')) || [];
    
    if(bodyPartsData.length > 0){
      setBodyParts(["all", ...bodyPartsData])
    }else{
      fetchBodyPartsData();
    }
  }

  useEffect(() => { 
    bodyPartsData();
  }, [])


  //Trae las partes del cuerpo para filtrar por categoria;
  const fetchBodyPartsData = async () => {
    const response = await fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
    if(!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
    else{
      const data = await response.json();
      localStorage.setItem('partsBodyData', JSON.stringify(data));
      setBodyParts(["all", ...data]);
    }
  }

  //Trae todos los ejercicios y filtra segun lo ingresado en el input search(estado search);
  const handleSearch = async () => {
    if(search){
      const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
      const searchedExercises = exercisesData.filter((exercise) => {
        return exercise.name.toLowerCase().includes(search)
        || exercise.bodyPart.toLowerCase().includes(search)
        || exercise.target.toLowerCase().includes(search)
      });

      setSearch('');
      setExercises(searchedExercises);
    }
  }

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography fontWeight={700} sx={{fontSize: { lg: '44px', xs:'30px'}}} mb="50px" textAlign="center">
        Awesome Exercises You <br />
        Should Know
      </Typography>
      <Box position="relative" mb="72px">
        <TextField sx={{ 
          input: {fontWeight: '700', border: 'none', borderRadius: '4px'}, 
          width:{ lg: '800px', xs:'300px'},
          background: '#fff',
          borderRadius: '40px'
        }} 
          height="76px" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" type="text"
          onKeyPress={
            (e)=>{if(e.key === "Enter"){
            handleSearch()
          }}}
        />
        <Button className="search-btn"
          sx={{
            backgroundColor:'#FF2625',
            color: '#fff',
            textTransform: 'none',
            width:{ lg: '175px', xs: '80px'},
            fontSize:{ lg: '20px', xs: '14px'},
            height:'56px',
            position: 'absolute'
          }}
          onClick={handleSearch}
          
        >
          Search
        </Button>
      </Box>
      <Box sx={{position: 'relative', width: '100%', p:'20px'}}>
        <HorizontalScrollBar data={bodyParts} bodyParts bodyPart={bodyPart} setBodyPart={setBodyPart} />
      </Box>
    </Stack>
  )
}

export default SearchExercises;