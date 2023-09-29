import mongoose from 'mongoose';

const itemPrices = {
  Cake: 500,
  Cookies: 50,
  Muffins: 100
};

const orderSchema = new mongoose.Schema({
  itemType: {
    type: String,
    required: true,
    enum: ['Cake', 'Cookies', 'Muffins']
  },
  orderState: {
    type: String,
    required: true,
    enum: ['Created', 'Shipped', 'Delivered', 'Canceled']
  },
  lastUpdateTime: {
    type: Date,
    default: Date.now
  },
  branch: {
    type: Number,
    required: true
  },
  customer: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    default: function () {
      return itemPrices[this.itemType] || 0;
    }
  }
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
