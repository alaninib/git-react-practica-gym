import React, { useState, useEffect }from 'react'
import Pagination from '@mui/material/Pagination';
import { Box, Stack, Typography } from '@mui/material';

import ExerciseCard from '../components/ExerciseCard';

import { exerciseOptions, fetchData } from '../utils/fetchData';

export default function Exercises({exercises, setExercises, bodyPart}) {
  const [currentPage, setCurrentPage] = useState(1);
  const exercisesPerPage = 9;

  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise) //obtiene los primeros 9

  const paginate = (e, value) => {
    setCurrentPage(value) //trae el numero de pagina
    window.scrollTo({ top: 1800, behavior: 'smooth'})
  }

  const fetchExercseData = async () => {
    let exercisesData = [];
    if(bodyPart === "all"){
      exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
    } else{
      exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);
    }
    setExercises(exercisesData);
  }

  useEffect(() => {
    fetchExercseData();
  }, [bodyPart])

  return (
    <Box id="exercies" sx={{mt: { lg:'110px'}}} mt="50px" p="20px">
      <Typography variant="h3" mb="46px">
        Showing Results
      </Typography>
      <Stack direction="row" sx={{ gap:{ lg: '110px', sx: '50px'}}} flexWrap="wrap" justifyContent="center">
        {currentExercises.map((exercise, index) => {
          return <ExerciseCard key={index} exercise={exercise}/>
        })}
      </Stack>
      <Stack mt="100px" alignItems="center">
        {exercises.length > 9 && 
          <Pagination 
            color="standard" 
            shape="rounded" 
            defaultPage={1} 
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        }
      </Stack>
    </Box>
  )
}
 