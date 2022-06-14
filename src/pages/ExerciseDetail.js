import React, {useState, useEffect} from 'react';
import { Box } from '@mui/material'
import { useParams } from 'react-router-dom';

import { exerciseOptions, youtubeOptions, fetchData } from '../utils/fetchData';
import Detail from '../components/Detail';
import ExerciseVideos from '../components/ExerciseVideos';
import SimilarExercises from '../components/SimilarExercises';


function ExerciseDetail(){
  const [exerciseDetails, setExerciseDetails] = useState({});
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscle, setTargetMuscle] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  const { id } = useParams();

  const fetchExerciseData = async (id) => {
    const bdData = 'https://exercisedb.p.rapidapi.com';
    const dbYouTubeData = 'https://youtube-search-and-download.p.rapidapi.com';

    const exerciseDetailData = await fetchData(`${bdData}/exercises/exercise/${id}`, exerciseOptions);
    setExerciseDetails(exerciseDetailData)
    const exerciseVideoData = await fetchData(`${dbYouTubeData}/search?query=${exerciseDetailData.name} exercise`, youtubeOptions)
    setExerciseVideos(exerciseVideoData.contents);
    const targetMuscleExerciseData = await fetchData(`${bdData}/exercises/target/${exerciseDetailData.target}`, exerciseOptions);
    setTargetMuscle(targetMuscleExerciseData)
    const equipmentExerciseData = await fetchData(`${bdData}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions)
    setEquipmentExercises(equipmentExerciseData);
  }

  useEffect(() => {
    fetchExerciseData(id);
  }, [id])

  return(
    <Box>
      <Detail exerciseDetails={exerciseDetails}/>
      <ExerciseVideos exerciseVideos={exerciseVideos} name={exerciseDetails.name} />
      <SimilarExercises targetMuscle={targetMuscle} equipmentExercises={equipmentExercises}/>
    </Box>
  )
}

export default ExerciseDetail;