import React from "react";
import { render, screen, fireEvent } from `@testing-library/react`;
import AppFunctional from "./AppFunctional";

// Write your tests here
test('sanity', () => {
  expect(true).toBe(true)
})


beforeEach(() => {
  render(<AppFunctional/>);
})

test('Renders movement message correctly', () => {
  const movement = screen.queryByText('You moved 0 times')
  expect(movement).toBeInTheDocument()
})

test('Renders up button correctly', () => {
  const upButton = screen.queryByText('UP')
  expect(upButton).toBeInTheDocument()
})

test('Renders down button correctly', () => {
  const downButton = screen.queryByText('DOWN')
  expect(downButton).toBeInTheDocument()
})

test('Renders reset button correctly', () => {
  const resetButton = screen.queryByText('reset')
  expect(resetButton).toBeInTheDocument()
})

test('Value updates correctly in email address field', () => {
  const emailValue = screen.getByPlaceholderText('type email')
  fireEvent.change(emailValue, {target: {value: 'bloom@tech.com'}})
  expect(emailValue.value).toBe('bloom@tech.com')
})