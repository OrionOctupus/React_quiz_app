import React from 'react';
import s from './FinishedQuiz.module.css';

const FinishedQuiz = (props) => {
  console.log('obh', props.results);

  //альтернативный способ
  // let successCount = Object.keys(props.results).reduce((total, key) => {
  //   if (props.results[key] === 'success') {
  //     total++
  //   }
  //   return total;
  // }, 0)

  let successCount = 0;
  for (let key in props.results) {
    if (props.results[key] === 'success') {
      successCount++;
    }
  }

  return (
    <div className={s.FinishedQuiz}>
      <h1>Вы закончили тест</h1>
      <ul>
        {props.quiz.map((quizItem, index) => {
          return (
            <li key={index} >
              <strong>{index + 1}.</strong> &nbsp;
              {quizItem.question}
              <i className={props.results[index + 1] === 'success'
                ? 'fa fa-check ' + s.success
                : 'fa fa-times ' + s.error}
              />
            </li>
          )
        })}
      </ul>

      {/* альтернативный способ  */}
      {/* <ul>
        {props.quiz.map((quizItem, index) => {
          const cls = [
            'fa',
            props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
            s[props.results[quizItem.id]] // передаем как параметр то что лежит в объекте под id ошибка или успех, т.к. у нас есть газвание класов, мы передаем это сразу
          ]
          return (
            <li key={index} >
              <strong>{index + 1}.</strong> &nbsp;
              {quizItem.question}
              <i className={cls.join(' ')} />
            </li>
          )
        })}
      </ul> */}

      <span>правильных ответов: <strong> {successCount} из {props.quiz.length}</strong></span>
      <div>
        <button onClick={props.retryHandler}>Повторить</button>
      </div>
    </div>
  )
}

export default FinishedQuiz;



