import { timeFormat, MobileBar } from './src/components/musicplayer'
import React from 'react';
import renderer from 'react-test-renderer';
import axios from 'axios'

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

const API = 'https://jsonplaceholder.typicode.com/posts/1'

const getData = function() {
  return axios.get(API).then(resp => resp.data)
}

jest.mock('axios');

test('should fetch post', () => {
  const users = {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  }
  const resp = { data: users }
  axios.get.mockResolvedValue(resp);

  return getData().then(data => expect(data).toEqual(users));
})
