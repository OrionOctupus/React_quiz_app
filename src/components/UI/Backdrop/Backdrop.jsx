import React from 'react';
import s from './Backdrop.module.css';

export default function Backdrop(props) {
  return (
    <div className={s.Backdrop} onClick={props.onClick} />
  )
}
