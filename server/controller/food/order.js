const { Address_book, Order } = require('../../models');

module.exports = {
  // update user's db with selected menu
  add: async (req, res) => {

    try {
      const user_id = req.params.id;
      const { address_book_id, address, postal_code, contact } = req.body;

      // after clicking 'paynow' button,
      // build new values on the addressbook db
      // `.build()` is different with `create()`. It will hold its changes until it meets "instance.save()". if no saves, no changes will remain.
      const newAddress = await Address_book.build({
        address: address,
        postal_code: postal_code,
        contact: contact,
        user_id: user_id
      });
      console.log('req.address book id::::::::', address_book_id);
      console.log('new address::::::::', newAddress.toJSON());

      // after validation of key existence, use `.save()` for employing it.
      if (!address_book_id) {
        const savedNewAddress = await newAddress.save();
        console.log('[after saving] new address::::::::', newAddress.toJSON());
      }

      // if finished payment process,
      // update Order table coresponding its order status
      const updatedOrderRaws = await Order.update({
        address_book_id: address_book_id || newAddress.id,
        is_cart: false,
        purchased_at: new Date()
      }, {
        where: {
          user_id: user_id,
          is_cart: true
        }
      });
      console.log('updated order raws::::::::', updatedOrderRaws);
      
      res.send({ status: 200, message: 'Successfully made your order. Delivery in process' });
      // [doing] test code for using set menthod for updating
      // const updateAddressBookId = await newAddress.setOrders({
      //   address_book_id: newAddress.id,
      //   where: {
      //     user_id: user_id
      //   }, 
      // });
    } 
    catch (err) {
      // response err to the client
      res.status(err.status || 500).json({
        message: err.message || 'Server does not response.',
        stack: err.stack
      });  
    }
    
  },
  
  showAddress: async (req, res) => {
    
    try {
      const user_id = req.params.id;

      // checking existing user's menu from the cart
      const listAddress = await Address_book.findAll({
        attributes: [ 'id', 'address', 'postal_code', 'contact' ],
        include: {
          model: Order,
          attributes: [],
          where: {
            user_id: user_id,
            is_cart: false
          },
        },
        order: [ [Address_book.associations.Orders, 'purchased_at', 'DESC'] ],
        raw: true,
        nest: true
      });

      // show only 5 recent address orderd by purchased_at date.
      const recentAddress = listAddress.slice(0,5);
      console.log('recent address::::::::', recentAddress);
 
      res.status(200).send({ recent_address: recentAddress });
    } 
    catch (err) {
      // response err to the client
      res.status(err.status || 500).json({
        message: err.message || 'Server does not response.',
        stack: err.stack
      });
    }
    
  }
};
