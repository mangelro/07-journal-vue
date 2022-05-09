import axios from 'axios'

const journalApi = axios.create({
	baseURL:'https://vue-demos-ece68-default-rtdb.europe-west1.firebasedatabase.app'
})

//process.env.NODE_ENV === 'production'
//process.env.NODE_ENV === 'development'
//process.env.NODE_ENV === 'test'
//console.log(process.env.NODE_ENV)

export default journalApi