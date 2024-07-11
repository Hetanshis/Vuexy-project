import { Button, Card, Grid, IconButton, Tooltip } from '@mui/material'
import Box from '@mui/material/Box'
import Link from 'next/link'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Icon from 'src/@core/components/icon'
import { DataGrid } from '@mui/x-data-grid'
import QuickSearchToolbar from './quickSearchToolbar'
import OptionsMenu from 'src/@core/components/option-menu'
import axios from 'axios'

const deleteUser = async (id: number) => {
  const confirmed = window.confirm(`Are you sure you want to delete row ${id}?`)
  if (confirmed) {
    await axios.delete(`http://localhost:8000/admin/profile/delete/${id}`).then(result => {
      console.log('result', result.data)
    })
  }
}
const columns = [
  {
    flex: 0.25,
    minWidth: 200,
    field: '_id',
    headerName: 'ID'
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'name',
    headerName: 'Name'
  },
  {
    flex: 0.25,
    minWidth: 230,
    field: 'email',
    headerName: 'Email'
  },

  {
    flex: 0.15,
    minWidth: 120,
    field: 'contactNumber',
    headerName: 'ContactNumber'
  },
  {
    flex: 0.1,
    field: 'is_verified',
    minWidth: 80,
    headerName: 'is_verified'
  },
  {
    flex: 0.1,
    minWidth: 130,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }: any) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Tooltip title='Delete Invoice'>
          <IconButton size='small' sx={{ color: 'text.secondary' }} onClick={() => deleteUser(row.id)} href='/user'>
            <Icon icon='tabler:trash' />
          </IconButton>
        </Tooltip>
        <Tooltip title='View'>
          <IconButton size='small' component={Link} sx={{ color: 'text.secondary' }} href={`/user/view/${row.id}`}>
            <Icon icon='tabler:eye' />
          </IconButton>
        </Tooltip>
        <OptionsMenu
          iconButtonProps={{ size: 'small' }}
          menuProps={{ sx: { '& .MuiMenuItem-root svg': { mr: 2 } } }}
          options={[
            {
              text: 'Edit',
              href: `/user/editUser/${row.id}`,
              icon: <Icon icon='tabler:pencil' />
            }
          ]}
        />
      </Box>
    )
  }
]

export type DataGridRowType = {
  id: number
  age: string
  post: string
  city: string
  email: string
  salary: number
  status: number
  avatar: string
  full_name: string
  start_date: string
  experience: string
}

const Data = () => {
  const [tableData, setTableData] = useState([])
  const [paginationModel, setPaginationModel] = useState({
    page: 1,
    pageSize: 10,
    isLoading: false,
    total: 0
  })
  const [rowCountState, setRowCountState] = useState(paginationModel.total)
  const [searchInput, setSearchInput] = useState('')

  console.log(tableData.filter((user: any) => user.name.toLowerCase().includes(searchInput)))

  useEffect(() => {
    const fetchData = async () => {
      console.log('ON')
      setPaginationModel(old => ({ ...old, isLoading: true }))
      const response = await fetch(
        `http://localhost:8000/admin/profile?page=${paginationModel.page}&limit=${paginationModel.pageSize}`
      )
      const json: any = await response.json()
      console.log(json.total, '>>>>>>>>>>>>>>>>>>>>>>>>>>>')
      if (json.admin) {
        setTableData(
          json.admin
            .filter((user: any) => user.name.toLowerCase().includes(searchInput))
            .map((row: any) => ({
              ...row,
              id: row._id
            }))
        )
      }
      setPaginationModel(old => ({
        ...old,
        isLoading: false,
        total: json.total,
        data: json.data
      }))

      setRowCountState(paginationModel.total !== undefined ? paginationModel.total : rowCountState)
      console.log(json.total, '+++++++++++++++++++++++++++++++')
    }
    fetchData()
  }, [
    paginationModel.page,
    paginationModel.pageSize,
    paginationModel.total,
    setRowCountState,
    searchInput,
    rowCountState
  ])

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <Box
            sx={{
              py: 4,
              px: 6,
              rowGap: 2,
              columnGap: 4,
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
              <Button
                component={Link}
                variant='contained'
                sx={{ '& svg': { mr: 2 } }}
                href='/user/addUser'
                startIcon={<Icon icon='tabler:plus' fontSize='1.75rem' />}
              >
                Add New User
              </Button>
            </Box>
          </Box>
          <Grid item xs={12}>
            <Box sx={{ height: 500 }}>
              <DataGrid
                columns={columns}
                rowCount={rowCountState}
                loading={paginationModel.isLoading}
                pageSizeOptions={[10, 30, 50]}
                paginationModel={paginationModel}
                paginationMode='server'
                onPaginationModelChange={setPaginationModel}
                slots={{ toolbar: QuickSearchToolbar }}
                rows={tableData}
                slotProps={{
                  baseButton: {
                    variant: 'outlined'
                  },
                  toolbar: {
                    value: searchInput,
                    clearSearch: () => setSearchInput(''),
                    onChange: (event: ChangeEvent<HTMLInputElement>) => setSearchInput(event.target.value)
                  }
                }}
              />
            </Box>
          </Grid>
        </Card>
      </Grid>
      {/* <Grid item xs={12}>
        <Card>
          <Box sx={{ height: 500 }}>
            <DataGrid columns={columns} rows={rows.slice(0, 10)} />
          </Box>
        </Card>
      </Grid> */}
    </Grid>
  )
}
export default Data

// // import * as React from 'react'
// // import { DataGrid } from '@mui/x-data-grid'
// // import { useDemoData } from '@mui/x-data-grid-generator'

// // function loadServerRows(page: any, data: any) {
// //   return new Promise(resolve => {
// //     setTimeout(() => {
// //       resolve(data.rows.slice(page * 5, (page + 1) * 5))
// //     }, Math.random() * 500 + 100) // simulate network latency
// //   })
// // }

// // export default function ServerPaginationGrid() {
// //   const { data } = useDemoData({
// //     dataSet: 'Commodity',
// //     rowLength: 100,
// //     maxColumns: 6
// //   })

// //   const [page, setPage] = React.useState(0)
// //   const [rows, setRows] = React.useState([])
// //   const [loading, setLoading] = React.useState(false)

// //   React.useEffect(() => {
// //     let active = true

// //     ;(async () => {
// //       setLoading(true)
// //       const newRows: any = await loadServerRows(page, data)

// //       if (!active) {
// //         return
// //       }

// //       setRows(newRows)
// //       setLoading(false)
// //     })()

// //     return () => {
// //       active = false
// //     }
// //   }, [page, data])

// //   return (
// //     <div style={{ height: 400, width: '100%' }}>
// //       <DataGrid
// //         rows={rows}
// //         columns={data.columns}
// //         pagination
// //         pageSize={5}
// //         paginationMode='server'
// //         onPageChange={(newPage: any) => setPage(newPage)}
// //         loading={loading}
// //       />
// //     </div>
// //   )
// // }

// import Box from '@mui/material/Box'
// import { useState, useEffect } from 'react'
// import { DataGrid } from '@material-ui/data-grid'

// const dummyColorsDB = [
//   { id: 1, color: 'red' },
//   { id: 2, color: 'green' },
//   { id: 3, color: 'blue' },
//   { id: 4, color: 'violet' },
//   { id: 5, color: 'orange' },
//   { id: 6, color: 'burgundy' },
//   { id: 7, color: 'pink' },
//   { id: 8, color: 'yellow' },
//   { id: 9, color: 'magenta' },
//   { id: 10, color: 'random color' },
//   { id: 11, color: 'another random color' },
//   { id: 12, color: 'last one' }
// ]

// export default function App() {
//   const [data, setData] = useState({
//     loading: true,
//     rows: [],
//     totalRows: 0,
//     rowsPerPageOptions: [5, 10, 15],
//     pageSize: 5,
//     page: 1
//   })

//   const updateData = (k: any, v: any) => setData(prev => ({ ...prev, [k]: v }))

//   useEffect(() => {
//     updateData('loading', true)

//     setTimeout(() => {
//       const rows = dummyColorsDB.slice((data.page - 1) * data.pageSize, (data.page - 1) * data.pageSize + data.pageSize)

//       console.log(rows)

//       updateData('rows', rows)
//       updateData('totalRows', dummyColorsDB.length)
//       updateData('loading', false)
//     }, 500)
//   }, [data.page, data.pageSize])

//   return (
//     <Box p={5}>
//       <DataGrid
//         density='compact'
//         autoHeight
//         rowHeight={50}
//         pagination
//         paginationMode='server'
//         loading={data.loading}
//         rowCount={data.totalRows}
//         rowsPerPageOptions={data.rowsPerPageOptions}
//         page={data.page - 1}
//         pageSize={data.pageSize}
//         rows={data.rows}
//         columns={[{ field: 'color', headerName: 'Color', flex: 1 }]}
//         onPageChange={(data: any) => {
//           updateData('page', data.page + 1)
//         }}
//         onPageSizeChange={(data: any) => {
//           updateData('page', 1)
//           updateData('pageSize', data.pageSize)
//         }}
//       />
//     </Box>
//   )
// }
