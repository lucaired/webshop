import React from "react";
import ProductCard from "./Shop/ProductCard";
import { Product } from "../Contexts/CategoryContext";

interface SpecialOfferProps {
    products: Product[];
}

const SpecialOffer: React.FC<SpecialOfferProps> = ({products}) => {

    return (
        <div style={{
            height: "100%",
            margin: "0 7.5px 15px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <h1 
                style={{ 
                    color: '#4a4a4a',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    boxShadow: '0 0 10px 0 rgba(0, 0, 0, 0.2)',
                    padding: '10px 15px',
                    borderRadius: '5px',
                    backgroundColor: '#fff',
                    border: '1px solid #e6e6e6',    
                }}
                className="title"
            >
                SPECIAL OFFERS
            </h1>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "15px",
                }}
            >
                {products.map((product, index) => <ProductCard key={index} product={product} />)}
            </div>
        </div>
    );
}

export default SpecialOffer;