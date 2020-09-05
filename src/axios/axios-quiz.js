import axios from 'axios';

export default axios.create({
  baseURL: 'https://react-quiz-15ef6.firebaseio.com/'
})