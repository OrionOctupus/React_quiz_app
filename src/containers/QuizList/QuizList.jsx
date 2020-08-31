import React from 'react';
import s from './QuizList.module.css';
import { NavLink } from 'react-router-dom';

export default class QuizList extends React.Component {

  renderQuizes() {
    // вдальнейшем этот массив замениться данными с сервера
    return [1, 2, 3, 4].map((quiz, index) => {
      return (
        <li key={index}>
          <NavLink
            to={'/quiz/' + quiz}
          >
            Тест № {quiz}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    return (
      <div className={s.QuizList}>
        <div>
          <h1>Список тестов</h1>

          <ul>
            {this.renderQuizes()}
          </ul>
        </div>
      </div>
    )
  }
}