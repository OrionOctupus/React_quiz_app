import React from 'react';
import s from './ActiveQuiz.module.css';
import AnswersList from './AnswersList/AnswersList';

export default function ActiveQuiz(props) {
  return (
    <div className={s.ActiveQuiz}>
      <p className={s.Question}>
        <span>
          <strong>1. </strong>
          Че кого?
        </span>
        <small>1 из 15</small>
      </p>
      <AnswersList
        answers={props.answers}
      />
    </div>
  )
}

