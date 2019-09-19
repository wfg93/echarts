import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import {baseURL} from '@/config/';
// create an axios instance
const service = axios.create({
    baseURL, // api的base_url
    timeout: 5000 // 请求超时时间
})
export default service