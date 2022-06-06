import "./App.css";
import { Navigate, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Container from "@mui/material/Container";
import { CssBaseline, Stack } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import RightBar from "./components/RightBar";
import LeftMenu from "./components/LeftMenu";
import routes from "./routes";

const customTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#dba531",
    },
    secondary: {
      main: "#007849",
    },
    error: {
      main: "#ff7605",
    },
    success: {
      main: "#f7b92a",
    },
    background: {
      default: "#292b33",
      paper: "#3a3a3f",
    },
    info: {
      main: "#00c4b5",
    },
  },
  typography: {
    fontFamily: "Montserrat",
    fontSize: 14,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightLight: 200,
    fontWeightBold: 700,
    h1: {
      fontWeight: 400,
      fontFamily: "Permanent Marker",
      fontSize: "2.9rem",
    },
  },
});

function App() {
  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.route) {
        return (
          <Route
            exact
            path={route.route}
            element={route.component}
            key={route.key}
          />
        );
      }
    });

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Container maxWidth={"xl"}>
        <Header />
        <Stack direction="row">
          <Box
            width={"250px"}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <LeftMenu />
          </Box>
          <Box sx={{ flex: "1" }}>
            <Routes>
              {getRoutes(routes)}
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </Box>
          <Box width={"300px"}>
            <RightBar />
          </Box>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}

export default App;
