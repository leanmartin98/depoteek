/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer } from 'react';

// Estado inicial del carrito
const initialState = {
    items: [],
    total: 0
};

// Función para calcular el total
const calculateTotal = (items) => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
}

// Acciones del carrito
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItem = state.items.find(item => item.id === action.payload.id);

            if (existingItem) {
                // si ya existe, aumnetar cantidad
                const updateItems = state.items.map(item => item.id === action.payload.id ? {...item, quantity: item.quantity + 1} : item);

                return {
                    ...state,
                    items: updateItems,
                    total: calculateTotal(updateItems)
                };
            } else {
                // Si no existe, agregar nuevo item
                const newItems = [...state.items, {...action.payload, quantity: 1 }];
                return {
                    ...state,
                    items: newItems,
                    total: calculateTotal(newItems)
                };
            }
        }

        case 'REMOVE_ITEM': {
            const updateItems = state.items.filter(item => item.id !== action.payload);
            return {
                ...state,
                items: updateItems,
                total: calculateTotal(updateItems)
            }
        }

        case 'UPDATE_QUANTITY': {
            const updateItems = state.items.map(item => item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item );

            return {
                ...state,
                items: updateItems,
                total: calculateTotal(updateItems)
            };
        }

        case 'CLEAR_CART': {
            return initialState;
        }

        default:
            return state
    }
};

// Crear contexto
const CartContext = createContext();

// Provider del carrito
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    const addItem = (product) => {
        dispatch({ type: 'ADD_ITEM', payload: product });
    };

    const removeItem = (productId) => {
        dispatch({ type: 'REMOVE_ITEM', payload: productId })
    }

    const updateQuantity = (productId, quantity) => {
        if (quantity < 0) {
            removeItem(productId);
        } else {
            dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity} });
        }
    }

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' })
    }

    const getItemCount = () => {
        return state.items.reduce((count, item) => count + item.quantity, 0);
    }

    return (
        <CartContext.Provider value={{
            items: state.items,
            total: state.total,
            addItem,
            removeItem,
            updateQuantity,
            clearCart,
            getItemCount
        }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook personalizado para usar el carrito
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart debe ser usado dentro de CartProvider');
    }
    return context;
}