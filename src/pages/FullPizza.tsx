import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { addItem } from '../redux/slices/cart/cartSlice';
import { useAppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import Skeleton from './FullPizza/Skeleton';
import { selectPizzaData } from '../redux/slices/pizza/pizzaSlice';

const typeNames = ['тонкое', 'традиционное'];

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    id: string;
    imageUrl: string;
    name: string;
    price: number;
    types: number[];
    sizes: number[];
    rating: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);
  const { items, status } = useSelector(selectPizzaData);

  const onClickAdd = () => {
    if (pizza) {
      const item = {
        id: pizza.id,
        name: pizza.name,
        price: pizza.price,
        imageUrl: pizza.imageUrl,
        type: typeNames[activeType],
        size: pizza.sizes[activeSize],
        count: 0,
      };
      dispatch(addItem(item));
    }
  };

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://62bedd9f0bc9b12561613263.mockapi.io/items/' + id);
        setPizza(data);
        console.log(pizza);
      } catch (error) {
        alert('Ошибка при получении пиццы!');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return (
      <div className="container">
        <div className="pizza-cart">
          <Skeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="pizza-cart">
        <img src={pizza.imageUrl} />
        <h2>{pizza.name}</h2>
        <h3>
          Описание: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium, tempora
          harum? Eum ratione incidunt tempora ullam eveniet?
        </h3>
        <div className="pizza-block__selector">
          <ul>
            {pizza.types.map((type) => (
              <li
                key={type}
                onClick={() => setActiveType(type)}
                className={activeType === type ? 'active' : ''}
              >
                {typeNames[type]}
              </li>
            ))}
          </ul>
          <ul>
            {pizza.sizes.map((size, id) => (
              <li
                key={id}
                onClick={() => setActiveSize(id)}
                className={activeSize === id ? 'active' : ''}
              >
                {size} см.
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <h4>Цена: {pizza.price} ₽</h4>

          <button onClick={onClickAdd} className="button button--outline button--add">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              ></path>
            </svg>
            <span>Добавить</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
