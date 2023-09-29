import express from 'express';
import authenticateToken from '../middleware/auth.js';
import Order from '../database/models/order.js';
import moment from 'moment/moment.js';

const router = express.Router();

router.get('/', authenticateToken, async (_req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:orderId', authenticateToken, async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/auto', authenticateToken, async (_req, res) => {
  try {
    const itemTypes = ['Cake', 'Cookies', 'Muffins'];
    const orderStates = ['Created', 'Shipped', 'Delivered', 'Canceled'];

    const generateRandomDate = () => {
      const today = moment();
      const pastMonths = Math.floor(Math.random() * 5);
      today.subtract(pastMonths, 'months');
      const maxDays = today.daysInMonth();
      today.date(Math.floor(Math.random() * maxDays) + 1);
      return today.toDate();
    };

    for (let i = 0; i < 1000; i++) {
      const order = new Order({
        itemType: itemTypes[Math.floor(Math.random() * itemTypes.length)],
        orderState: orderStates[Math.floor(Math.random() * orderStates.length)],
        lastUpdateTime: generateRandomDate(),
        branch: `Branch ${Math.floor(Math.random() * 20) + 1}`,
        customer: `Customer${i + 1}`,
      });

      await order.save();
    }

    res.send({ message: 'Sample orders created successfully.' });
  } catch (err) {
    console.error('Error creating sample orders:', err);
  }
});

router.post('/', authenticateToken, async (req, res) => {
  const order = new Order({
    itemType: req.body.itemType,
    orderState: req.body.orderState,
    lastUpdateTime: req.body.lastUpdateTime,
    branch: req.body.branch,
    customer: req.body.customer
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/:orderId', authenticateToken, async (req, res) => {
  const orderId = req.params.orderId;
  const updatedOrder = req.body;

  try {
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (updatedOrder.itemType) {
      order.itemType = updatedOrder.itemType;

      switch (updatedOrder.itemType) {
        case 'Cake':
          order.price = 500;
          break;
        case 'Cookies':
          order.price = 50;
          break;
        case 'Muffins':
          order.price = 100;
          break;
        default:
          order.price = 0;
          break;
      }
    }

    if (updatedOrder.orderState) order.orderState = updatedOrder.orderState;
    if (updatedOrder.branch) order.branch = updatedOrder.branch;
    if (updatedOrder.customer) order.customer = updatedOrder.customer;

    const updatedOrderResult = await order.save();

    return res.status(200).json(updatedOrderResult);
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});


export default router;
