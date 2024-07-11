import { Card, Grid, Typography } from '@mui/material'
import React from 'react'
import Posts from './Posts'

const about = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks

  return (
    <Grid container spacing={7.45} sx={{ width: '60%' }}>
      <Grid item xs={12}>
        <Card>
          <Typography sx={{ color: 'text.secondary' }}>
            <Posts />
          </Typography>
        </Card>
      </Grid>
    </Grid>
  )
}

export default about
