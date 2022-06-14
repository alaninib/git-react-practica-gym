import React from 'react'
import { Typography, Stack, Button } from '@mui/material';

import BodyPartImage from '../assets/icons/body-part.png';
import TargetImage from '../assets/icons/target.png';
import EquipmentImage from '../assets/icons/equipment.png';

function Detail({ exerciseDetails }) {
  debugger;
  const { bodyPart, equipment, gifUrl, id, name, target } = exerciseDetails;

  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyPart
    },
    {
      icon: TargetImage,
      name: target
    },
    {
      icon: EquipmentImage,
      name: equipment
    },
  ]
  return (
    <Stack gap="60px" sx={{ flexDirection: { lg: 'row'}, p: '20px', alignItems: 'center '}}>
      <img src={gifUrl} alt={name} loading="lazy" className="detail-image"/>
      <Stack sx={{ gap:{ lg:'35px', xs: '20px'}}}>
        <Typography variant="h3">
          {name}
        </Typography>
        <Typography variant="h5">
          Exercise keep strong. {name} {' '}

          is one the best
          exercises to target your abs. It will herl you improve your mood and again enery
        </Typography>
        {extraDetail.map((item, index) => (
           <Stack key={index} direction="row" gap="24px" alignItems="center">
            <Button sx={{ background: '#fff2db', borderRadius: '50%', width: '100px', height: '100px'}}>
              <img src={item.icon} alt={item.name} style={{ width: '50px', height: '50px'}}/>
            </Button>
            <Typography variant="h5">
              {item.name}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}

export default Detail;
