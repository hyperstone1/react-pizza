import React from 'react';

type Categories = {
  value: number;
  categories: string[];
  onChangeCategory: (id: number) => void;
};

export const Categories: React.FC<Categories> = React.memo(
  ({ categories, value, onChangeCategory }) => {
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
  },
);
