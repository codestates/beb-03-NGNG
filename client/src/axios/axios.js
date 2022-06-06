import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// const Test = () => {
//   const accessToken = useSelector((state) => state.user.accessToken);
//   const navigate = useNavigate();
//   navigate(`/logout`);
// };
// axios.defaults.baseURL = "http://localhost:1010/";
// axios.defaults.headers.common = { Authorization: `bearer ${accessToken}` };

// axios.interceptors.request.use(
//   function (config) {
//     const accessToken = useSelector((state) => state.user.accessToken);
//     config.headers.Authorization = `bearer ${accessToken}`;
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// axios.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );

// export default axios;
