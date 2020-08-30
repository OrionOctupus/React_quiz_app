import React from 'react';
import s from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';


class Quiz extends React.Component {

  state = {
    results: {}, // {[id]: 'success' or 'error'}
    isFinished: false,
    activeQuestion: 0,
    answerState: null, //{[id]: 'success' or 'error'}
    quiz: [
      {
        question: 'Какого типа данных нет в Java Script?',
        rightAnswerId: 3,
        id: 1,
        answers: [
          { text: 'Boolean', id: 1 },
          { text: 'Object', id: 2 },
          { text: 'Array', id: 3 },
          { text: 'Undefined', id: 4 },
        ]
      },
      {
        question: 'Какой метод удаляет элемент из начала массива ?',
        rightAnswerId: 2,
        id: 2,
        answers: [
          { text: 'push()', id: 1 },
          { text: 'unshift()', id: 2 },
          { text: 'pop()', id: 3 },
          { text: 'shift()', id: 4 },
        ]
      }
    ]
  }

  onAnswerClickHandler = (answerId) => {
    // условие проверки, что бы избежать реакции на двойной клик
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') {
        return
      }
    }

    console.log('Answer Id: ', answerId);

    const question = this.state.quiz[this.state.activeQuestion]; //текущий вопрос
    const results = this.state.results;

    if (answerId === question.rightAnswerId) { // правильно ответили на вопрос
      if (!results[question.id]) { // проверка был ли уже ответ на этот вопрос
        results[question.id] = 'success';
      }
      this.setState({
        answerState: { [answerId]: 'success' },
        results: results
      })
      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }

        window.clearTimeout(timeout);
      }, 800)
    } else {   // ответили неправильно на вопрос 
      results[question.id] = 'error';
      this.setState({
        answerState: { [answerId]: 'error' },
        results: results,
      })
    }

  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  // метод обнуления состояния
  retryHandler = () => {
    this.setState({
      results: {},
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
    })
  }

  render() {
    console.log(this.state.results)
    return (
      <div className={s.Quiz}>
        <div className={s.QuizWrapper}>
          <h1>Выберите правильный ответ</h1>
          {this.state.isFinished
            ? <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              retryHandler={this.retryHandler}
            />
            : <ActiveQuiz
              answers={this.state.quiz[this.state.activeQuestion].answers}
              question={this.state.quiz[this.state.activeQuestion].question}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              state={this.state.answerState}
            />
          }
        </div>
      </div>
    )
  }
}


export default Quiz;