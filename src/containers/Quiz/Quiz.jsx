import React from 'react';
import s from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'


class Quiz extends React.Component {

  state = {
    quiz: [
      {
        answers: [
          { text: 'Вопрос 1' },
          { text: 'Вопрос 2' },
          { text: 'Вопрос 3' },
          { text: 'Вопрос 4' },
        ]
      }
    ]
  }
  render() {
    return (
      <div className={s.Quiz}>
        <div className={s.QuizWrapper}>
          <h1>Выберите правильный ответ</h1>
          <ActiveQuiz
            answers={this.state.quiz[0].answers}
          />
        </div>
      </div>
    )
  }
}


export default Quiz;