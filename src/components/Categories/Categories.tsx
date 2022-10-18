import React from 'react';

type Categories = {
  value: number;
  onChangeCategory: any;
};

export const Categories: React.FC<Categories> = ({ value, onChangeCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, id) => (
          <li
            key={id}
            onClick={() => onChangeCategory(id)}
            className={value === id ? 'active' : ''}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};
