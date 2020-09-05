import React from 'react';
import s from './QuizCreator.module.css';
import Button from '../../components/UI/Button/Button';
import { createControl, validate, validateForm } from '../../form/formFramework';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import axios from '../../axios/axios-quiz';

// локальные функции полезные только для этого модуля
function createOptionControl(number) {
  return createControl({
    label: `Вариант ответа № ${number}`,
    errorMessage: 'Поле не может быть пустым',
    id: number
  },
    { required: true }
  )
}

function createFormControls() {
  return {
    question: createControl({
      label: 'Введите вопрос',
      errorMessage: 'Поле не может быть пустым'
    }, { required: true }),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4),
  }
}
// сам объект
export default class QuizCreator extends React.Component {

  state = {
    quiz: [],
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls(),
  }

  submitHandler = (e) => {
    e.preventDefault();
  }

  addQuestionHandler = (e) => {
    e.preventDefault();

    const quiz = this.state.quiz.concat();
    const index = quiz.length + 1;

    const { question, option1, option2, option3, option4 } = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: index,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        { text: option1.value, id: option1.id },
        { text: option2.value, id: option2.id },
        { text: option3.value, id: option3.id },
        { text: option4.value, id: option4.id },
      ]
    }

    quiz.push(questionItem);

    this.setState({
      quiz: quiz,
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControls(),
    })
  }

  //метод отправки на сервер готового теста
  createQuizHandler = async (e) => {
    e.preventDefault();
    console.log('до запроса', this.state.quiz);

    try {
      const response = await axios.post('/quizes.json', this.state.quiz)

      //обнуление стейта после отправки данный в бд
      this.setState({
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls(),
      })
      console.log(response)
    } catch (e) {
      console.log(e)
    }

    //способ через библиотеку без es6+
    //передаем в БД то что сформировано в стейте this.state.quiz
    // axios.post('https://react-quiz-15ef6.firebaseio.com/quizes.json', this.state.quiz)
    //   .then(response => {
    //     console.log(response)
    //   })
    //   .catch(error => console.error(error))
  }

  changeHandler = (value, controlName) => {
    //создаем копию стейта
    const formControls = { ...this.state.formControls }
    //создаем переменную с текущим контролом
    const control = { ...formControls[controlName] }

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);

    formControls[controlName] = control;

    this.setState({
      formControls: formControls,
      isFormValid: validateForm(formControls)
    })
  }

  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName]

      return (
        <React.Fragment key={index}>
          <Input

            label={control.label}
            type={control.type}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={e => this.changeHandler(e.target.value, controlName)}
          />
          {index === 0 ? <hr /> : null}
        </React.Fragment>
      )
    })
  }

  selectChangeHandler = (e) => {
    this.setState({
      rightAnswerId: +e.target.value
    })
  }

  render() {
    return (
      <div className={s.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form onSubmit={this.submitHandler}>

            {this.renderControls()}

            <Select
              label="Выберите правильный ответ"
              value={this.state.rightAnswerId}
              onChange={this.selectChangeHandler}
              options={[
                { text: 1, value: 1 },
                { text: 2, value: 2 },
                { text: 3, value: 3 },
                { text: 4, value: 4 },
              ]}
            ></Select>
            <Button
              type='primary'
              onClick={this.addQuestionHandler}
              disabled={!this.state.isFormValid}
            >
              Добавить вопрос
            </Button>

            <Button
              type='success'
              onClick={this.createQuizHandler}
              disabled={this.state.quiz.length === 0}
            >
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    )
  }
}