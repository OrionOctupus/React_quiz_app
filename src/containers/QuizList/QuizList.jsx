import React from 'react';
import s from './QuizList.module.css';
import { NavLink } from 'react-router-dom';
import axios from '../../axios/axios-quiz';
import Loader from '../../components/UI/Loader/Loader';


export default class QuizList extends React.Component {

  state = {
    quizes: [],
    loading: true,
  }

  renderQuizes() {
    // вдальнейшем этот массив замениться данными с сервера
    // время ответа от сервера настало

    return this.state.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink
            to={'/quiz/' + quiz.id}
          >
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  }

  async componentDidMount() {

    try {
      const response = await axios.get('/quizes.json');

      const quizes = [];
      console.log('Ответ от сервера - ', response.data);
      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`
        })
      })

      this.setState({
        quizes: quizes,
        loading: false,
      })
    } catch (e) {
      console.error(e);
    }
  }

  // componentDidMount() {
  //   axios.get('https://react-quiz-15ef6.firebaseio.com/quizes.json')
  //     .then(response => {
  //       console.log(response);
  //     })
  // } 

  render() {
    return (

      <div className={s.QuizList}>
        <div>
          <h1>Список тестов</h1>
          {
            this.state.loading
              ?
              <Loader />
              :
              <ul>
                {this.renderQuizes()}
              </ul>
          }
        </div>
      </div>
    )
  }
}