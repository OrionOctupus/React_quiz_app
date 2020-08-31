import React from 'react';
import s from './Input.module.css';

const Input = (props) => {
  //определяем какого типа инпут
  const inputType = props.type || 'text';
  // опредлеляем классы стилей
  const cls = [s.Input];
  const htmlFor = `${inputType}-${Math.random()}`;

  // isInvalid(props) - т.к. мы используем не все параметры, сделаем деструктуризацию
  function isInvalid({ valid, touched, shouldValidate }) {
    return !valid && shouldValidate && touched
  }

  if (isInvalid(props)) {
    cls.push(s.invalid)
  }


  return (
    <div className={cls.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />
      {
        isInvalid(props)
          ? <span>{props.errorMessage || 'Введите верное значение'}</span>
          : null
      }
    </div>
  )
}

export default Input;