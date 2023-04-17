/**
 * React does not recoomend reusing of CSS classes. So Sass might be 
 * useless in this case. But I will use it anyway to stay in line with the tutorial.
 */
import './CategoryContainer.scss';

export interface Category {
    id: number;
    title: string;
    imageUrl: string;
  }

export interface CategoryContainerProps {
    category: Category;
}

const CategoryContainer = (props: CategoryContainerProps) => {
    const { title, imageUrl } = props.category;
    return (
      <div className="category-container">
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