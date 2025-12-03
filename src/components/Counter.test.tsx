import { render, screen, fireEvent } from '@testing-library/react'
import UserTable from './UserTable'
import { describe, test, expect, beforeEach, vi } from 'vitest'

globalThis.fetch = vi.fn()

const mockUsers = [
  {
    id: 1,
    name: 'Иван Иванов',
    email: 'ivan@example.com',
    phone: '+7 (999) 123-45-67',
    website: 'example.com',
  },
  {
    id: 2,
    name: 'Петр Петров',
    email: 'petr@test.com',
    phone: '+7 (999) 000-00-00',
    website: 'test.com',
  },
]

describe('UserTable', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders button and search input initially', () => {
    render(<UserTable />)
    expect(screen.getByText(/загрузить пользователей/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/поиск по email/i)).toBeInTheDocument()
  })

  test('loads users and displays them when button is clicked', async () => {
    (globalThis.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockUsers,
    })

    render(<UserTable />)
    fireEvent.click(screen.getByText(/загрузить пользователей/i))

    expect(await screen.findByText(/иван иванов/i)).toBeInTheDocument()
    expect(screen.getByText(/ivan@example.com/i)).toBeInTheDocument()
  })

  // Тест для Варианта 6
  test('filters users by email', async () => {
    (globalThis.fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockUsers,
    })

    render(<UserTable />)

    fireEvent.click(screen.getByText(/загрузить пользователей/i))
    await screen.findByText(/иван иванов/i)
    const input = screen.getByPlaceholderText(/поиск по email/i)
    fireEvent.change(input, { target: { value: 'test' } })
    expect(screen.queryByText(/иван иванов/i)).not.toBeInTheDocument()
    expect(screen.getByText(/петр петров/i)).toBeInTheDocument()
  })
})
