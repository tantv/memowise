/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import ReactMarkdown from 'react-markdown';
import { GREAT, OKAY, BAD } from '../constants/play';
import { handleError } from '../services/ErrorService';

class StudyDeck extends React.Component {
  constructor(props) {
    super(props);
    this.loadCard = this.loadCard.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
  }

  componentWillMount() {
    this.loadCard();
  }

  loadCard() {
    this.props.fetchCard(this.props.deck._id)
      .then(({ data }) => this.props.startPlay(data._id, data.deckId))
      .catch(handleError);
  }

  handlePlay(play, rank) {
    this.props.savePlay(play, rank)
      .then(() => this.loadCard());
  }

  showCardFront() {
    const { card: { question } } = this.props;
    return (
      <div className="flashcard flashcard-front">
        <div className="flashcard-close">
          <i
            className="material-icons"
            onClick={() => browserHistory.push('/dashboard')}
          > close </i>
        </div>
        <div className="flashcard-title">
          <ReactMarkdown source={(question && question.text) || ''} />
        </div>
        <div className="flashcard-buttons">
          <button
            onClick={this.props.flipCard}
            className="btn btn-large blue"
          > Flip Card </button>
        </div>
      </div>
    );
  }

  showCardBack() {
    const { card: { answer }, play } = this.props;
    return (
      <div className="flashcard flashcard-back">
        <div className="flashcard-close">
          <i
            className="material-icons"
            onClick={() => browserHistory.push('/dashboard')}
          > close </i>
        </div>
        <div className="flashcard-title">
          <ReactMarkdown source={(answer && answer.text) || ''} />
        </div>
        {
          (answer && answer.explanation)
          ? <ReactMarkdown source={answer.explanation} />
          : null
        }
        <div className="flashcard-buttons">
          <p>How well did you do?</p>
          <div>
            <button
              onClick={() => this.handlePlay(play, BAD)}
              className="btn btn-large blue"
            >
              <i className="material-icons">thumb_down</i>
            </button>
            <button
              onClick={() => this.handlePlay(play, OKAY)}
              className="btn btn-large blue"
            >
              <i className="material-icons">help</i>
            </button>
            <button
              onClick={() => this.handlePlay(play, GREAT)}
              className="btn btn-large blue"
            >
              <i className="material-icons">thumb_up</i>
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { play: { side }, deck } = this.props;
    return (
      <div className="container">
        <h2 className="center grey-text text-darken-4">{deck.name}</h2>
        <div className="medium center">
          {!side ? this.showCardFront() : this.showCardBack()}
        </div>
      </div>
    );
  }
}

StudyDeck.propTypes = {
  deck: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  card: PropTypes.shape({
    question: PropTypes.shape({
      text: PropTypes.string,
    }),
    answer: PropTypes.shape({
      text: PropTypes.string,
      explanation: PropTypes.string,
    }),
  }),
  play: PropTypes.shape({
    side: PropTypes.number,
  }),
  fetchCard: PropTypes.func.isRequired,
  flipCard: PropTypes.func.isRequired,
  startPlay: PropTypes.func.isRequired,
  savePlay: PropTypes.func.isRequired,
};

StudyDeck.defaultProps = {
  card: {},
  play: {},
};

export default StudyDeck;
