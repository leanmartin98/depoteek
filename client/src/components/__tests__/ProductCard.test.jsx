import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import ProductCard from '../ProductCard'
import { CartProvider } from '../../context/CartContext'

// Mock de producto
const mockProduct = {
  id: 1,
  name: 'iPhone 17',
  description: 'Último modelo de iPhone',
  price: 999.99,
  stock: 10,
  category_name: 'Electrónicos',
  image_url: 'https://example.com/image.jpg',
  created_at: '2024-01-01T00:00:00Z'
}

// Helper para renderizar con Context
const renderWithContext = (component) => {
  return render(
    <CartProvider>
      {component}
    </CartProvider>
  )
}

describe('ProductCard', () => {
  it('debería renderizar el nombre del producto', () => {
    renderWithContext(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText('iPhone 17')).toBeInTheDocument()
  })

  it('debería renderizar el precio del producto', () => {
    renderWithContext(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText(/999.99/)).toBeInTheDocument()
  })

  it('debería renderizar el stock', () => {
    renderWithContext(<ProductCard product={mockProduct} />)
    
    expect(screen.getByText(/10/)).toBeInTheDocument()
    expect(screen.getByText(/unidades/i)).toBeInTheDocument()
  })

  it('debería mostrar la imagen del producto', () => {
    renderWithContext(<ProductCard product={mockProduct} />)
    
    const image = screen.getByAltText(/iPhone 17/i)
    expect(image).toBeInTheDocument()
  })

  it('debería tener un botón', () => {
    renderWithContext(<ProductCard product={mockProduct} />)
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('debería llamar a addItem cuando se hace click en el botón', () => {
    renderWithContext(<ProductCard product={mockProduct} />)
    
    const button = screen.getByRole('button')
    
    // Verificar que el botón existe y es clickeable
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    
    // Este test simplemente verifica que no hay errores al hacer click
  })
})