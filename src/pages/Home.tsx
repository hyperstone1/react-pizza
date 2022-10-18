import React, { useEffect, useRef } from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filter/filterSlice';
// import { setItems } from '../redux/slices/pizza/pizzaSlice';
import { Categories } from '../components/Categories/Categories';
import { list, Sort } from '../components/Sort/Sort';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { Skeleton } from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { selectPizzaData } from '../redux/slices/pizza/pizzaSlice';
import { selectFitler } from '../redux/slices/filter/filterSlice';
import { fetchPizzas } from '../redux/slices/pizza/asyncActions';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFitler);
  const { items, status } = useSelector(selectPizzaData);
  const sortType = sort.sortProperty;
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  console.log(sort.sortProperty);

  const getPizzas = async () => {
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    //   await axios
    //     .get(
    //       `https://62bedd9f0bc9b12561613263.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    //     )
    //     .then((res) => {
    //       setItems(res.data);
    //       setIsLoading(false);
    //     });
    dispatch(
      fetchPizzas({
        sortBy,
        order,
        category,
        search,
        currentPage: String(currentPage),
      }),
    );
    window.scrollTo(0, 0);
  };

  // const [sortType, setSortType] = useState({
  //   name: 'популярности',
  //   sortProperty: 'rating',
  // });

  //Если первого рендера не было,то не нужно вшивать параметры в адресную строку,
  //по умолчанию isMounted = false, то есть первого рендера не было
  useEffect(() => {
    if (isMounted.current) {
      const params = {
        sortProperty: sort.sortProperty,
        categoryId: categoryId > 0 ? categoryId : null,
        currentPage,
      };
      const queryString = qs.stringify(params, { skipNulls: true });
      navigate(`/?${queryString}`);
    }
    isMounted.current = true; // Первый рендер произошел, т.е. со второго рендера effect отрабаывает
  }, [categoryId, sortType, searchValue, currentPage]);

  //Если был первый рендер,то проверяем URL параметры и сохраняем их в redux
  useEffect(() => {
    // if (window.location.search) {
    //   const params = qs.parse(window.location.search.substring(1));
    //   const sort = list.find((obj) => obj.sortProperty === params.sortBy);
    //   dispatch(
    //     setFilters({
    //       searchValue: params.search,
    //       categoryId: Number(params.category),
    //       currentPage: Number(params.currentPage),
    //       sort: sort || list[0],
    //     }),
    //   );
    //   isSearch.current = true;
    // }
    getPizzas()
  }, []);

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };

  // Если был первый рендер, то запрашиавет пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    // Если параметры приходят из URL, то проиходит получение информации о пиццах
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
    // fetch(
    //   `https://62bedd9f0bc9b12561613263.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    // ) // Вариант поиска с получением отфильтрованного массива с бэкенда
    //   .then((res) => res.json())
    //   .then((arr) => {
    //     setItems(arr);
    //     setIsLoading(false);
    //   });
  }, [categoryId, sortType, searchValue, currentPage]);

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };
  // const pizzas = items
  //   .filter((obj) => {
  //     if (obj.name.toLowerCase().includes(searchValue.toLowerCase())) {
  //       return true;
  //     }
  //     return false;
  //   })
  //   .map((obj) => <PizzaBlock key={obj.id} {...obj} />); // Вариант с поиском по статичному массиву

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);

  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="cart cart--empty">
          <h2>
            Произошла ошибка<i>😕</i>
          </h2>
          <p>
            К сожаленю не удалось получить список пицц.
            <br />
            Попробуйте повторить попытку позже.
          </p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
export default Home;
