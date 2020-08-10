import { timeFormat, MobileBar } from './src/components/musicplayer'
import React from 'react';
import renderer from 'react-test-renderer';

test("test currentTime format", () => {
  expect(timeFormat(25)).toBe('0:25')
  expect(timeFormat(600)).toBe('10:00')
  expect(timeFormat(0)).toBe('0:00')
  expect(timeFormat(null)).toBe('0:00')
  expect(timeFormat(87)).toBe('1:27')
  expect(timeFormat('')).toBe('0:00')
  expect(timeFormat(false)).toBe('0:00')
  expect(timeFormat(true)).toBe('0:00')
})

it('renders correctly', () => {
  let testData = {
    function: {
      clickMobilebar: 'click'
    }
  }
  const tree = renderer
    .create(<MobileBar data={testData}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

