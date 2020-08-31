import React from 'react';
import s from './Drawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import { NavLink } from 'react-router-dom';

const links = [
  { to: '/', lable: 'Список', exact: true },
  { to: '/auth', lable: 'Авторизация', exact: false },
  { to: '/quiz-creator', lable: 'Создать тест', exact: false },

];

class Drawer extends React.Component {
  //спортное решение вызывать уже имеющуюся функцию, через другую фу-ю,
  // а не переиспользовать её

  clickHandler = () => {
    this.props.onClose();
  }

  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName={s.active}
            onClick={this.clickHandler}
          >
            {link.lable}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    const cls = [s.Drawer];

    if (!this.props.isOpen) {
      cls.push(s.close)
    }

    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks()}
          </ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </>
    )
  }
}

export default Drawer;
