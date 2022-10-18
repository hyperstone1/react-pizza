import { configureStore } from '@reduxjs/toolkit';
import filter from './slices/filter/filterSlice';
import cart from './slices/cart/cartSlice';
import pizza from './slices/pizza/pizzaSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizza,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
