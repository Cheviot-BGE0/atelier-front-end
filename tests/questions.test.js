import React from 'react';
import renderer from 'react-test-renderer';
import QuestionsAnswers from '../src/components/questions/QuestionsAnswers.jsx';


// Parent componentnt

test('Renders questions and answers with an h3 header', () => {
  const questionsAnswersComp = renderer.create(<QuestionsAnswers />);
  const questionTree = questionsAnswersComp.toJSON()
  expect(questionTree).toMatchSnapshot()
})

test.todo('Should have a search bar');
test.todo('Should have questions list component');
test.todo('Should have a link to load more questions')
test.todo('should have an add questions button')

//search bar
test.todo('Should have an input with placeholder text');
test.todo('Should filter questions list')
test.todo('Should filter results after three characters')
test.todo('filterQuestionsList should filter by the input search term')

//questionsListComp
test.todo('should have an add answer button')
