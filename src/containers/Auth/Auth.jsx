import React from 'react';
import s from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import is from 'is_js';
import axios from 'axios';

// function validateEmail(email) {
//   const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//   return re.test(String(email).toLowerCase());
// }

export default class Auth extends React.Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false, // состояние валидации данного контрола ()
        touched: false, // был ли пользователем затронуто данное поле, выводится errorMessage
        // нижи правила по которым валидируется данный контрол
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  }
  //обработка входа 
  loginHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }
    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]', authData)

      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }


  // обработка формы регистрации 
  registerHandler = async () => {
    const authData = {
      email: this.state.formControls.email.value,
      password: this.state.formControls.password.value,
      returnSecureToken: true
    }
    try {
      const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]', authData)

      console.log(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  //отменяет стандартное действие отправки формы
  submitHandler = (e) => {
    e.preventDefault();
  }

  validateControl(value, validation) {
    if (!validation) {
      return true
    }

    let isValid = true

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = is.email(value) && isValid
    }

    //вариант с регулярками
    // if (validation.email) {
    //   isValid = validateEmail(value) && isValid
    // }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }

    return isValid;
  }

  onChangeHandler = (e, controlName) => {
    console.log(`${controlName}:  `, e.target.value)

    const formControls = { ...this.state.formControls }
    const control = { ...formControls[controlName] }
    control.value = e.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true

    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid
    })

    this.setState({
      formControls: formControls,
      isFormValid: isFormValid
    })
  }

  renderInputs() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]
      return (
        <Input
          key={controlName + index}
          type={control.type}
          label={control.label}
          valid={control.valid}
          value={control.value}
          touched={control.touched}
          shouldValidate={!!control.validation}
          errorMessage={control.errorMessage}
          onChange={e => this.onChangeHandler(e, controlName)}
        />
      )
    })
  }


  render() {
    return (
      <div className={s.Auth}>
        <div>
          <h1>Авторизация</h1>
          <form onSubmit={this.submitHandler} className={s.AuthForm}>
            {this.renderInputs()}

            <Button
              type={'success'}
              onClick={this.loginHandler}
              disabled={!this.state.isFormValid}
            >
              Войти
            </Button>
            <Button
              type={'primary'}
              onClick={this.registerHandler}
              disabled={!this.state.isFormValid}
            >
              Зарегистрироваться
            </Button>
          </form>
        </div>
      </div>
    )
  }
}