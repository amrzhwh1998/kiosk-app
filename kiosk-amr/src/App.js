import React, {  useState } from 'react';
import './App.css';
import axios from 'axios';

const categoriesData = [
  {
    category: 'מנות משבחתית',
    products: ['קנטאקי', 'על האש', 'בורגרים'],
    image: "/imgs/category1.png",
  },
  {
    category: 'מנה לילד',
    products: ['פיצה קטן', 'בורגר קטן', 'לפה קטן'],
    image: '/imgs/category2.png',
  },
  {
    category: 'מנה אישית',
    products: ['פיצה אישי', 'בורגר אישי', 'לפה אישי'],
    image: '/imgs/category3.png',
  },
  {
    category: 'סלט',
    products: ['סלט יבני', 'סלט ירקות'],
    image: '/imgs/category4.png',
  },
  {
    category: 'עוגות',
    products: ['עוגה חמה', 'עוגה שוקולד'],
    image: '/imgs/category5.png',
  },
  {
    category: 'שתיה',
    products: ['קולה', 'ביבסי', 'XL'],
    image: '/imgs/category6.png',
  },
  {
    category: 'מנות השבוע',
    products: ['בסתה', 'מטבוחה'],
    image: '/imgs/category7.png',
  },
  {
    category: 'בורגר',
    products: ['בורגר 200ג', 'בורגר 300ג', 'בורגר 400ג'],
    image: '/imgs/category8.png',
  },
  {
    category: 'פיצה',
    products: ['פיצה אישי', 'פיצה מידיום', 'פיצה ענק'],
    image: '/imgs/category9.png',
  },
];

const productsData = {
  'מנות משבחתית': [
    { name: 'קנטאקי', image: '/imgs/product11.jpg' , price: '100' },
    { name: 'על האש', image: '/imgs/product12.jpg' ,  price: '110'},
    { name: 'בורגרים', image: '/imgs/product13.jpg' ,  price: '90'},
  ],
  'מנה לילד': [
    { name: 'פיצה קטן', image: '/imgs/product21.jpg' ,  price: '70'},
    { name: 'בורגר קטן', image: '/imgs/product22.jpg' ,  price: '30'},
    { name: 'לפה קטן', image: '/imgs/product23.jpg' ,  price: '30'},
  ],
  'מנה אישית': [
    { name: 'פיצה אישי', image: '/imgs/product31.jpg' ,  price: '40'},
    { name: 'בורגר אישי', image: '/imgs/product32.jpg' ,  price: '40'},
    { name: 'לפה אישי', image: '/imgs/product33.jpg' ,  price: '40'},
  ],
  סלט: [
    { name: 'סלט יבני', image: '/imgs/product41.jpg' ,  price: '30'},
    { name: 'סלט ירקות', image: '/imgs/product42.jpg' ,  price: '20'},
  ],
  עוגות: [
    { name: 'עוגה חמה', image: '/imgs/product51.jpg' ,  price: '30'},
    { name: 'עוגה שוקולד', image: '/imgs/product52.jpg' ,  price: '30'},
  ],
  שתיה: [
    { name: 'קולה', image: '/imgs/product61.jpg' ,  price: '10'},
    { name: 'ביבסי', image: '/imgs/product62.jpg' ,  price: '10'},
    { name: 'XL', image: '/imgs/product63.jpg' ,  price: '10'},
  ],
  'מנות השבוע': [
    { name: 'בסתה', image: '/imgs/product71.jpg' ,  price: '50'},
    { name: 'מטבוחה', image: '/imgs/product72.jpg' ,  price: '50'},
  ],
  בורגר: [
    { name: 'בורגר 200ג', image: '/imgs/product81.jpg' ,  price: '50'},
    { name: 'בורגר 300ג', image: '/imgs/product82.jpg' ,  price: '70'},
    { name: 'בורגר 400ג', image: '/imgs/product83.jpg' ,  price: '90'},
  ],
  פיצה: [
    { name: 'פיצה אישי', image: '/imgs/product91.jpg' ,  price: '30'},
    { name: 'פיצה מידיום', image: '/imgs/product92.jpg' ,  price: '50'},
    { name: 'פיצה ענק', image: '/imgs/product93.jpg' ,  price: '70'},
  ],
};


function App() {
  const [selectedCategory, setSelectedCategory] =  useState('מנות משבחתית');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [openPopup, setOpenPopup] = useState(false);
  const [opencartPopup, setOpencartPopup] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState('');
  const [comments, setComments] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [showThankYouPopup, setShowThankYouPopup] = useState(false);
  const [oorderNumber, setOrderNumber] = useState('');
  
  function ThankYouPopup({ oorderNumber }) {
    return (
      <div className="popup">
        <div className="popup-content">
          <span className="close" onClick={() => setOpencartPopup(false)}>
            &times;
          </span>
          <h2>תודה על ההזמנה!</h2>
          <p>ההזמנה נקלטה בהצלחה.</p>
          <p>מספר הזמנה: {oorderNumber}</p>
        </div>
      </div>
    );
  }

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedProduct('');
    setShowThankYouPopup(false);

  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setOpenPopup(true);
    setShowThankYouPopup(false);

  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleopencart = () => {
    setShowThankYouPopup(false);
     setOpencartPopup(true); 
    };


  const handleAddToCart = () => {
    const selectedItem = productsData[selectedCategory].find((p) => p.name === selectedProduct);
    setCartItems([...cartItems, selectedItem]);
    setOpenPopup(false);
    setOpencartPopup(true);
    setTotalPrice(totalPrice + parseInt(selectedItem.price));

  };

  const handleRemoveFromCart = (itemName) => {
    const selectedItem = cartItems.find((item) => item.name === itemName);
    const updatedCartItems = cartItems.filter((item) => item.name !== itemName);
    setCartItems(updatedCartItems);
    setTotalPrice(totalPrice - parseInt(selectedItem.price));
  };
const handleSubmit = async (e) => {
  const currentTime = new Date().toLocaleString();

  let randomNumber = '';
  while (randomNumber.length < 4) {
    const digit = Math.floor(Math.random() * 10).toString();
    if (!randomNumber.includes(digit)) {
      randomNumber += digit;
    }
  }

  e.preventDefault();

  try {
    const response = await axios.post('http://localhost:3001/api/orders', {
      order: cartItems.map((item) => item.name),
      name,
      comments,
      totalprice: totalPrice,
      status: "false",
      cheked: "false",
      currentTime: currentTime,
      ordernumber: randomNumber,
    });
    console.log(response.data);

// Update the state with the received order number
setOrderNumber(randomNumber);

// Show the thank you popup
    setName('');
    setComments('');
    setCartItems([]); // After sending the order, reset the cart
    setTotalPrice(0);
    setShowThankYouPopup(true);

  } catch (error) {
    console.error(error);
    // Handle the error if needed
  }
};




  return (
    <div className="app" >
      
      <div className="categories">
        <h2>קטגוריות</h2>
        {categoriesData.map((category) => (
          <div
            key={category.category}
            className={`category ${category.category === selectedCategory ? 'selected' : ''}`}
            onClick={() => handleCategoryClick(category.category)}
          >
            <img src={category.image} alt={category.category} />
           
          </div>
        ))}
      </div>

      {selectedCategory && (
          <>
      <div className="products">
        <div className='headpro'>
        <h3>מוצרים ↔️ </h3>


            <h3>&nbsp;{selectedCategory}&nbsp;</h3>
            </div>
            <div className="product-list">
              {productsData[selectedCategory].map((product) => (
                <div
                  key={product.name}
                  className={`product ${product.name === selectedProduct ? 'selected' : ''}`}
                  onClick={() => handleProductClick(product.name)}
                >
                  <img className='productimg' src={product.image} alt={product.name} />
             
                </div>
              ))}
            </div>
         
      </div>
      </>
        )}
      {selectedProduct && openPopup  &&(
        
        <div className="popup">
          <div className="popup-content">
            <span className="close" onClick={handleClosePopup}>
              &times;
            </span>
            
            <div className="product-image">
              <img src={productsData[selectedCategory].find((p) => p.name === selectedProduct).image} alt={selectedProduct} />
            </div>
            <div className="product-info">
              <h3>קטגוריה: {selectedCategory}</h3>
              <h3>מחיר: {productsData[selectedCategory].find((p) => p.name === selectedProduct).price}</h3>
              <button className='addto' onClick={handleAddToCart}>הוסף לסל קניות</button>
            </div>
          </div>
        </div>
      )}

<div className="cart">
  
  <button className="cartbtn" onClick={handleopencart}>🛒</button>
  {opencartPopup && (
    
    <div className="popup">

      <div className="popup-content">
        <span className="close" onClick={() => setOpencartPopup(false)}>
          &times;
        </span>
        <h2>סל קניות</h2>
        {cartItems.length > 0 ? (
          <form onSubmit={handleSubmit}>
            <table>
              <thead>
                <tr>
                  <th>שם המוצר</th>
                  <th>מחיר</th>
                  <th>ביטול</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.price}₪</td>
                    <td>
                      <button className='del' onClick={() => handleRemoveFromCart(item.name)}>ביטול</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3>סך הכל לתשלום: {totalPrice}₪</h3>

            <h3>פרטים להזמנה</h3>
            <input
              type="text"
              className='inputs'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="הזן שם מלא"
            />
            <input
              type="text"
              className='inputs'
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="הערות"
            />
            <button className='sub' type="submit">שלח הזמנה</button>
          </form>
        ) : (
          <p>סל הקניות ריק.</p>
        )}

      </div>
      <div>
      {showThankYouPopup && ( <ThankYouPopup oorderNumber={oorderNumber} /> )}

      </div>
    </div>
    
  )}
  
</div>


    </div>
  );
}

export default App;
