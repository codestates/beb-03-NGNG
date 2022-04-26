import axios from 'axios';
import { useSelector } from 'react-redux';

const accessToken = useSelector((state) => state.user.accessToken);

axios.defaults.baseURL = 'http://localhost:1010/'
axios.defaults.headers.common = {'Authorization': `bearer ${accessToken}`}

export default axios;