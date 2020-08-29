import React from 'react';
import s from './Layout.module.css';

class Layout extends React.Component {
  // constructor(props){
  //   super(props);

  // }
  render() {
    return (
      <div className={s.Layout}>
        <main>
          {this.props.children}
        </main>
      </div>
    )
  }
}
export default Layout;