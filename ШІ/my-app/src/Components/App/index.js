import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import './App.css';
import {Container} from "@material-ui/core";
import SwipeableStepper from "../SwipeableStepper";
import Question from "../Question";
import curry from "../../utils/curry";
import Header from "../Header";
import BarChart from "../BarChart";
import Button from "@material-ui/core/Button";
import ResultPage from "../ResultPage";

const SomeContext = React.createContext({kek: 'lol'});

export default class Index extends React.Component {
  static contextType = SomeContext;

  constructor(props) {
    super(props);


    this.state = {
      generalScore: 0,
      answers: [],
      lockedQuestions: [],
    };

    this.questions = [
      {
        text: 'Переживаєте за успіх в роботі?',
        variants: [
          {
            text: 'Сильно',
            value: 1,
          },
          {
            text: 'Не дуже',
            value: 3,
          },
          {
            text: 'Не переживаю',
            value: 2,
          },
        ],
      },
      {
        text: 'Прагнете швидко досягти результату?',
        variants: [
          {
            text: 'Поступово',
            value: 2,
          },
          {
            text: 'Якомога швидше',
            value: 3,
          },
          {
            text: 'Дуже',
            value: 1,
          },
        ],
      },
      {
        text: 'Легко попадаєте в тупик при проблемах в роботі?',
        variants: [
          {
            text: 'Неодмінно',
            value: 1,
          },
          {
            text: 'Зрідка',
            value: 2,
          },
          {
            text: 'Поступово',
            value: 3,
          },
        ],
      },
      {
        text: 'Чи потрібен чіткий алгоритм для вирішення задач?',
        variants: [
          {
            text: 'Так',
            value: 1,
          },
          {
            text: 'В окремих випадках',
            value: 2,
          },
          {
            text: 'Не потрібен',
            value: 3,
          },
        ],
      },
      {
        text: 'Чи можете вирішити проблеми, з якими раніше не стикались?',
        variants: [
          {
            text: 'Так',
            value: 3,
          },
          {
            text: 'В окремих випадках',
            value: 2,
          },
          {
            text: 'Ні',
            value: 1,
          },
        ],
      },
      {
        text: 'Чи обираєте нові методи своєї роботи?',
        variants: [
          {
            text: 'Так',
            value: 3,
          },
          {
            text: 'Вибірково',
            value: 2,
          },
          {
            text: 'Вистачає досвіду',
            value: 1,
          },
        ],
      },
    ];
  }

  onAnswer = (index, event) => {
    let answers = [...this.state.answers];
    let {generalScore} = this.state;

    generalScore += +event.target.value / (this.questions.length * 3) * 100;
    console.log(generalScore);
    answers[index] = +event.target.value;

    this.setState({answers, generalScore});
  };

  onStepperNext = index => {
    let lockedQuestions = [...this.state.lockedQuestions];
    lockedQuestions[index] = true;
    this.setState({lockedQuestions});
  };

  render() {
    return (
      <Router>
        <Header/>

        <Switch>
          <Route exact path="/">
            <div className="home-bg">
              <div className="home-title-container">
                <h1>Artificial intelligence</h1>
                <Link className="start-btn"  to="/test">
                  <Button variant="contained" color="primary">
                    Get started
                  </Button>
                </Link>
              </div>
            </div>
          </Route>

          <Route path="/test">
            <Container className="page-content">
              <h1>Оцінювання навичок програміста</h1>
              <SwipeableStepper
                finishLink="/chart"
                steps={this.questions.length}
                allowedSteps={this.state.answers.length}
                initialStep={this.state.answers.length}
                onNext={this.onStepperNext}
              >
                {this.questions.map((item, index) => (
                  <Question
                    key={item.text}
                    index={index}
                    disabled={this.state.lockedQuestions[index]}
                    onAnswer={curry(this.onAnswer)(index)}
                    answer={this.state.answers[index]}
                    {...item}
                  />
                ))}
              </SwipeableStepper>
            </Container>
          </Route>

          <Route path="/chart">
            <Container className="page-content">
              <BarChart {...this.state} questions={this.questions}/>
            </Container>
          </Route>

          <Route path="/result">
            <Container className="page-content">
              <ResultPage generalScore={this.state.generalScore} />
            </Container>
          </Route>
        </Switch>
      </Router>
    );
  }
}
