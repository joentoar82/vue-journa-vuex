
import axios from 'axios'

const journalApi = axios.create({
    baseURL: 'https://vue-demos-3db8f-default-rtdb.firebaseio.com'
})

export default journalApi