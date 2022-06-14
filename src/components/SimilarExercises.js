import React from 'react'
import { Box, Stack, Typography } from '@mui/material';

import HorizontalScrollBar from './HorizontalScrollBar';
import Loader from './Loader';

function SimilarExercises({ targetMuscle, equipmentExercises }) {
  debugger;
  return (
    <Box sx={{ mt: {lg: '100px', sx: '0'}}}>
      <Typography variant="h3" mb={5}>Exercise that target the same muscle group</Typography>
      <Stack direction="row" sx={{ p: '2', position: 'relative'}}>
        {targetMuscle.length 
        ? <HorizontalScrollBar data={targetMuscle}/>
        : <Loader />
      }
      </Stack>
      <Typography variant="h3" mb={5}>Exercise that use the same equipment</Typography>
      <Stack direction="row" sx={{ p: '2', position: 'relative'}}>
        {equipmentExercises.length 
        ? <HorizontalScrollBar data={equipmentExercises}/>
        : <Loader />
      }
      </Stack>
    </Box>
  )
}

export default SimilarExercises;
