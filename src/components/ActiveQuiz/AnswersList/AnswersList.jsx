import React from 'react';
import s from './AnswersList.module.css';
import AnswerItem from './AnswerItem/AnswerItem';

const AnswersList = props => (
  <ul className={s.AnswersList}>
    {props.answers.map((answer, index) => {
      return (
        <AnswerItem
          key={index + Date.now()}
          answer={answer}
        />
      )
    })}
  </ul>
)

export default AnswersList;