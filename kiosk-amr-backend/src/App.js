import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('');
  const [updating, setUpdating] = useState(false); // ערך בוליאני למעקב אחרי עדכונים

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/orders');
        setOrders(response.data);
        setUpdating(false); // מסמן שהגענו לסיום הפעולה ולא צריך לעדכן שוב
      } catch (error) {
        console.error(error);
      }
    };

    if (!updating) {
      fetchOrders();
      setUpdating(true); // מסמן שהתחלנו לבצע פעולה של עדכון
    }

    const interval = setInterval(fetchOrders, 10000); // פעולה מתבצעת כל 10 שניות

    return () => clearInterval(interval);
  }, [updating]);

 

  const handlePayOrder = async (orderId) => {
    try {
      await axios.put(`http://localhost:3001/api/orders/${orderId}/pay`);
      const updatedOrders = orders.map((order) => {
        if (order._id === orderId) {
          return { ...order, status: true };
        }
        return order;
      });
      setOrders(updatedOrders);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReadyOrder = async (orderId) => {
    try {
      await axios.put(`http://localhost:3001/api/orders/${orderId}/ready`);
      const updatedOrders = orders.map((order) => {
        if (order._id === orderId) {
          return { ...order, cheked: true, currentTime: Date.now() }; // עדכון currentTime לזמן הנוכחי
        }
        return order;
      });
      setOrders(updatedOrders);
    } catch (error) {
      console.error(error);
    }
  };
  

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === 'all') {
      return order.status === false;
    } else if (filter === 'paid') {
      return order.status === true && order.cheked === false;
    } else if (filter === 'ready') {
      return order.cheked === true;
    }
    return false;
  });

  return (
    <div>
      <h1
       style={{ display: filter === '' ? 'none' : 'flex' }}
      >רשימת הזמנות</h1>
      <div>
        <div
          className="filters"
          style={{ display: filter === '' ? 'flex' : 'none' }}
        >
<div className='imgdivs'>
<img src='img/600X600_01-N156-Front.png' alt='kiosk' />
<button className='button' value="all" onClick={handleFilterChange}>  
          קופה
         </button>
</div>
      
<div className='imgdivs'>
<img src='img/253080-black-removebg-preview.png' alt='kiosk' ></img>
          <button className='button' value="paid" onClick={handleFilterChange}>
            ניהול מטבח
          </button>
          </div>
          <div className='imgdivs'>
          <img src='img/GUEST_3372c945-fa13-42e3-b4ec-7006ec7d21df-removebg-preview.png' alt='kiosk' ></img>

          <button className='button' value="ready" onClick={handleFilterChange}>
            טלויזיה ללקוחות
          </button>
          </div>

        </div>
        {filteredOrders.length === 0 ? (
          <p 
          style={{ display: filter === '' ? 'none' : 'block' }}
          >אין הזמנות לתצוגה</p>
        ) : (
          <ul>
            {filteredOrders.map((order) => (
              <li key={order._id}>
                 {!order.status && (
                  <button className='buttonn' onClick={() => handlePayOrder(order._id)}>
                    שולם
                  </button>
                )}
                {!order.cheked && (
                  <button
                  className='buttonn'
                    style={{
                      display:
                        !order.cheked && filter === 'all' ? 'none' : 'block',
                    }}
                    onClick={() => handleReadyOrder(order._id)}
                  >
                    מוכן
                  </button>
                )}
                <p style={{ display: filter === 'ready' ? 'none' : 'block' }}>שם הלקוח: <br/> {order.name}</p>
                <p style={{ display: filter === 'ready' ? 'none' : 'block' }}>פרטי ההזמנה: <br/> {order.order.join(', ')}</p>
                <p style={{ display: filter === 'all' || filter === 'ready' ? 'none' : 'block' }} >הערות: <br/> {order.comments}</p>
                <p style={{ display: filter === 'ready' ? 'none' : 'block' }}>מחיר: <br/> {order.totalprice}₪</p>
                <p>מספר ההזמנה: <br/> {order.ordernumber}</p>
               
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
