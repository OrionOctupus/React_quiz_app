import React from 'react';
import s from './Button.module.css';

function Button(props) {
  const cls = [
    s.Button,
    // определяем тип и соответственно цвет кнопки
    s[props.type]
  ]

  return (
    <button
      onClick={props.onClick}
      className={cls.join(' ')}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  )
}

export default Button;