import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import "./App.css";

const columns = [
  {
    flex: 0.25,
    minWidth: 200,
    field: "_id",
    headerName: "ID",
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: "name",
    headerName: "Name",
  },
  {
    flex: 0.25,
    minWidth: 230,
    field: "email",
    headerName: "Email",
  },

  {
    flex: 0.15,
    minWidth: 120,
    field: "contactNumber",
    headerName: "ContactNumber",
  },
  {
    flex: 0.1,
    field: "is_verified",
    minWidth: 80,
    headerName: "is_verified",
  },
];

function App() {
  const [tableData, setTableData] = useState([]);
  const [pageState, setPageState] = useState({
    isLoading: false,

    total: 0,
    page: 1,
    pageSize: 10,
  });
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      console.log("ON");
      setPageState((old) => ({ ...old, isLoading: true }));
      const response = await fetch(
        `http://localhost:8000/admin/profile?page=${pageState.page}&limit=${pageState.pageSize}`
      );
      const json = await response.json();
      setPageState((old) => ({
        ...old,
        isLoading: false,

        total: json.total,
      }));
      setTableData(
        json.admin
          .filter((user) => user.name.toLowerCase().includes(search))
          .map((row) => ({
            ...row,
            id: row._id,
          }))
      );
    };
    fetchData();
  }, [pageState.page, pageState.pageSize, search]);

  return (
    <Box>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div">
            Server-side Pagination demo
          </Typography>
        </Toolbar>
      </AppBar>

      <Container style={{ marginTop: 100, marginBottom: 100 }}>
        <input
          type="search"
          placeholder="Search here.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <DataGrid
          autoHeight
          rows={tableData}
          rowCount={pageState.total}
          getRowId={(row) => row._id}
          loading={pageState.isLoading}
          rowsPerPageOptions={[10, 30, 50, 70, 100]}
          pagination
          page={pageState.page - 1}
          pageSize={pageState.pageSize}
          paginationMode="server"
          onPageChange={(newPage) => {
            setPageState((old) => ({ ...old, page: newPage + 1 }));
          }}
          onPageSizeChange={(newPageSize) =>
            setPageState((old) => ({ ...old, pageSize: newPageSize }))
          }
          columns={columns}
        />
      </Container>
    </Box>
  );
}

export default App;
