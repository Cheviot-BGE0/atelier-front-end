import React from 'react';
import Answer from './Answer.jsx';

const AnswersList = (props) => {

  const { answers,
    loadMoreAnswers,
    voteHelpfulAnswer,
    questionId,
    toggleAnswerView
  } = props;
  const arrayOfVisibleAnswers = answers.filter((answer) =>
    answer.isVisible ? answer : null
  );

  return (
    <div className="answer-item">
      <div className="answer-label">
        {
          (answers.length > 0) && (<strong>A:</strong>)
        }
        <div>
          {arrayOfVisibleAnswers.map((answer) => {
            return (
              <Answer
                key={answer.answer_id}
                answer={answer}
                voteHelpfulAnswer={voteHelpfulAnswer}
                toggleAnswerView={toggleAnswerView}
              />
            );
          })}
        </div>
      </div>
      <br></br>
      {
        (answers.length > 2) && (
          <a
            id={`see-answers-${questionId}`}
            className='see-more-answers'
            onClick={() => {
              loadMoreAnswers(questionId);
            }}
          >
            More Answers
          </a>
        )
      }
    </div>
  );
};

export default AnswersList;
