// ** Next Import

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import InputLabel from '@mui/material/InputLabel'

import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'

import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

// interface State {
//   password: string
//   showPassword: boolean
// }
const addUser = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const [values, setValues] = useState<State>({
  //   password: '',
  //   showPassword: false
  // })

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [name, setName] = useState('')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [email, setEmail] = useState('')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [password, setPassword] = useState('')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [contactNumber, setContactNumber] = useState('')

  // eslint-disable-next-line react-hooks/rules-of-hooks

  // eslint-disable-next-line react-hooks/rules-of-hooks

  const add = async (id: number) => {
    console.log('Hiii')

    axios
      .put(
        `http://localhost:8000/admin/profile/update/${id}
`,
        {
          name,
          email,
          password,
          contactNumber,
          method: 'PUT'
        }
      )
      .then(result => {
        console.log('result', result.data)
      })
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks

  // const handleChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
  //   setValues({ ...values, [prop]: event.target.value })
  // }
  // const handleClickShowPassword = () => {
  //   setValues({ ...values, showPassword: !values.showPassword })
  // }

  // const handleClickConfirmPassShow = () => {
  //   setConfirmPassValues({ ...confirmPassValues, showPassword: !confirmPassValues.showPassword })
  // }
  // const handleConfirmPassChange = (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
  //   setConfirmPassValues({ ...confirmPassValues, [prop]: event.target.value })
  // }

  return (
    <Card sx={{ width: '60%' }}>
      <CardHeader title='Edit User' />
      <CardContent>
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='Name'
                placeholder='Enter Name'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type='email'
                label='email'
                placeholder='Enter Email'
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor='form-layouts-basic-password'>Password</InputLabel>
                <OutlinedInput
                  label='password'
                  value={password}
                  id='form-layouts-basic-password'
                  onChange={e => setPassword(e.target.value)}
                  aria-describedby='form-layouts-basic-password-helper'
                />
              </FormControl>
            </Grid>
            {/* <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor='form-layouts-confirm-password'>Confirm Password</InputLabel>
                <OutlinedInput
                  label='Confirm Password'
                  value={confirmPassValues.password}
                  id='form-layouts-confirm-password'
                  onChange={handleConfirmPassChange('password')}
                  aria-describedby='form-layouts-confirm-password-helper'
                  type={confirmPassValues.showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position='end'>
                      <IconButton
                        edge='end'
                        onClick={handleClickConfirmPassShow}
                        onMouseDown={e => e.preventDefault()}
                        aria-label='toggle password visibility'
                      >
                        <Icon icon={confirmPassValues.showPassword ? 'tabler:eye' : 'tabler:eye-off'} />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Grid> */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label='contactNumber'
                placeholder='Enter contactNumber'
                value={contactNumber}
                onChange={e => setContactNumber(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  gap: 5,
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <Button
                  type='submit'
                  variant='contained'
                  size='large'
                  onClick={(id: any) => add(id)}
                  href='/user'
                  component={Link}
                >
                  edit User
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </CardContent>
    </Card>
  )
}

export default addUser
