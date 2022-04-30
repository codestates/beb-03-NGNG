// Material Dashboard 2 React layouts
import Home from "./pages/Home/index.js";
import MyTalk from "./pages/MyTalk/index.js";
import TagSelected from "./pages/TagSelected/index.js";
import MyWallet from "./pages/MyWallet/index.js";

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
    name: "MyWallet",
    key: "mywallet",
    icon: <Icon fontSize="small">mywallet</Icon>,
    route: "/mywallet",
    component: <MyWallet />,
  },
  {
    type: "collapse",
    name: "TagSelected",
    key: "tagSelected",
    icon: <Icon fontSize="small">tagselected</Icon>,
    route: "/tagselected",
    component: <TagSelected />,
  },
];

export default routes;