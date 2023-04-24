const CartDropDown = () => {
    return (
        <div
            style={{
                width: '240px',
                height: '340px',
                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                padding: '20px',
                border: '1px solid black',
                backgroundColor: 'white',
                top: '90px',
                right: '40px',
                zIndex: 5
            }}
        >
            <div
            >
                <p>Product 1</p>
                <p>Product 2</p>
                <p>Product 3</p>
            </div>
            <button
                style={{
                    marginTop: 'auto',
                }}
            >
                GO TO CHECKOUT
            </button>
        </div>
    )
}

export default CartDropDown;