// Material Dashboard 2 React layouts
import Home from "./pages/Home/index.js";
import MyTalk from "./pages/MyTalk/index.js";
import Transactions from "./pages/Transactions/index.js";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Home",
    key: "home",
    icon: <Icon fontSize="small">home</Icon>,
    route: "/home",
    component: <Home />,
  },
  {
    type: "collapse",
    name: "MyTalk",
    key: "mytalk",
    icon: <Icon fontSize="small">my_talk</Icon>,
    route: "/mytalk",
    component: <MyTalk />,
  },
  {
    type: "collapse",
    name: "Transactions",
    key: "transactions",
    icon: <Icon fontSize="small">transactions</Icon>,
    route: "/transactions",
    component: <Transactions />,
  },
];

export default routes;