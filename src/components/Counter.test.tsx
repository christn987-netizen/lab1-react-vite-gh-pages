import { render, screen, fireEvent } from '@testing-library/react';
import { expect, test } from 'vitest';
import Counter from './Counter';

test('Counter increments on click', () => {
  render(<Counter />);
  const button = screen.getByRole('button');
  expect(button).toHaveTextContent('count is 0');

  fireEvent.click(button);

  expect(button).toHaveTextContent('count is 1');
});