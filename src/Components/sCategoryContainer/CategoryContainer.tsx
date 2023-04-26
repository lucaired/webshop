/**
 * React does not recoomend reusing of CSS classes. So Sass might be 
 * useless in this case. But I will use it anyway to stay in line with the tutorial.
 */
import { useNavigate } from 'react-router-dom';
import './CategoryContainer.scss';
import React from 'react';

export interface CategoryInfo {
    id: number;
    title: string;
    imageUrl: string;
  }

export interface CategoryContainerProps {
    category: CategoryInfo;
}

const CategoryContainer = (props: CategoryContainerProps) => {
    const { title, imageUrl } = props.category;
    const navigage = useNavigate();

    return (
      <div className="category-container"
        onClick={() => navigage(`/shop/${title}`)}
      >
        <div 
          className="background-image"
          style={{backgroundImage: `url(${imageUrl})`}}
        />
        <div className="category-body-container">
          <h2>{title}</h2>
          <p>Shop now</p>
        </div>
      </div>
    );
  }

export default CategoryContainer;