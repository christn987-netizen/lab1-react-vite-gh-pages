import { render, screen, fireEvent } from '@testing-library/react'
import Counter from './Counter'
import { describe, test, expect, beforeEach, vi } from 'vitest'

globalThis.fetch = vi.fn()

describe('Counter', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders button with initial count', () => {
    render(<Counter />)
    expect(screen.getByRole('button')).toHaveTextContent(/count is 0/i)
  })

  test('increments count when button is clicked', () => {
    render(<Counter />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(button).toHaveTextContent(/count is 1/i)
  })
})