import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';

// Contexts
import ProductContext from "./contexts/ProductContext";
import CartContext from "./contexts/CartContext";

function App() {
	const startingCartData = JSON.parse(localStorage.getItem("cart"));

	const [products] = useState(data);
	const [cart, setCart] = useState(startingCartData);

	const addItem = item => {
		const idsInCart = cart.map(item => item.id);
		if (!idsInCart.includes(item.id)) {
			setCart([...cart, item]);
			localStorage.setItem("cart", JSON.stringify([...cart, item]));
		}
	};

	const removeItem = item => {
		const filteredCart = cart.filter(cartItem => cartItem.id !== item.id);
		setCart(filteredCart);
		localStorage.setItem("cart", JSON.stringify(filteredCart));
	}

	return (
		<ProductContext.Provider value={{ products, addItem }}>
			<CartContext.Provider value={{ cart, removeItem }} >
				<div className="App">
					<Navigation />
					{/* Routes */}
					<Route
						exact
						path="/"
						component={Products}
					/>

					<Route
						path="/cart"
						component={ShoppingCart}
					/>
				</div>
			</CartContext.Provider>
		</ProductContext.Provider>
	);
}

export default App;
