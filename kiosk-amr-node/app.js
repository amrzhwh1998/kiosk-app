const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http').createServer(app);

app.use(cors());

// קישור למסד הנתונים
mongoose.connect('mongodb+srv://zhwhamr11:5YkdDc16Kwu29wFD@amr.haq9v24.mongodb.net/test?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// מודל ההזמנות ב־MongoDB
const Order = mongoose.model('Order', {
  order: Array,
  name: String,
  comments: String,
  status: Boolean,
  cheked: Boolean,
  totalprice: Number,
  currentTime : Date,
  ordernumber: Number,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/orders', async (req, res) => {
  try {
    const { order, name, comments, status, cheked, totalprice ,currentTime ,ordernumber} = req.body;

    const newOrder = new Order({ order, name, comments, status, cheked, totalprice ,currentTime ,ordernumber});
    await newOrder.save();

    // שליחת ההזמנה החדשה ללקוחות רשומים

    res.status(201).json({ message: req.body });
    console.log(req.body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'שגיאה בשמירת ההזמנה' });
  }
});

app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'שגיאה בקבלת רשימת ההזמנות' });
  }
});

app.put('/api/orders/:id/pay', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    order.status = true;
    await order.save();

    // שליחת הזמנה מעודכנת ללקוחות רשומים

    res.json({ message: 'ההזמנה שולמה בהצלחה' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'שגיאה בעדכון מצב התשלום של ההזמנה' });
  }
});
app.put('/api/orders/:id/ready', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    order.cheked = true;
    order.currentTime = Date.now(); // עדכון currentTime לזמן הנוכחי
    await order.save();

    // שליחת הזמנה מעודכנת ללקוחות רשומים

    res.json({ message: 'ההזמנה מוכנה לאיסוף' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'שגיאה בעדכון מצב ההכנה של ההזמנה' });
  }
});

app.delete('/api/orders', async (req, res) => {
  try {
    const { orders } = req.body;
    const deletedOrders = await Order.deleteMany({ _id: { $in: orders } });
    res.json({ message: 'Orders deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting orders' });
  }
});

const deleteExpiredOrders = async () => {
  try {
    const threshold = Date.now() - 120000; // תזמון של דקה (60000 מילישניות)
    const expiredOrders = await Order.deleteMany({ cheked: true, currentTime: { $lt: threshold } });
    console.log(`${expiredOrders.deletedCount} הזמנות נמחקו`);
  } catch (error) {
    console.error(error);
  }
};

const startServer = async () => {
  try {
    // קוד הפתיחה של השרת כאן

    await deleteExpiredOrders(); // בדיקת הזמנות פג תוקף בהתחלת ריצת התוכנה

    setInterval(deleteExpiredOrders, 90000); // בדיקת הזמנות פג תוקף בכל דקה (60000 מילישניות)
  } catch (error) {
    console.error(error);
  }
};

startServer();


const port = 3001;
http.listen(port, () => {
  console.log(`השרת פועל בפורט ${port}`);
});
