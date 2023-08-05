const createHttpError = require("http-errors");
const Order = require("../../models/Order");
const paypal = require("../../config/paypal");

const getOrederByUserId = async (userId) => {
  try {
    const findProduct = await Order.find({ userId });
    return findProduct;
  } catch (error) {
    return null;
  }
};

const createOrder = async (obj) => {
  try {
    const orderObj = new Order(obj);
    const save = orderObj.save();
    return save;
  } catch (error) {
    throw new createHttpError.InternalServerError();
  }
};

const createPayment = async (obj) => {
  try {
    const { name, price, currency, quantity, description } = obj;
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `${process.env.SERVER_URL}/api/v1/success`,
        cancel_url: `${process.env.SERVER_URL}/api/v1/cancel`,
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name,
                price,
                currency,
                quantity,
              },
            ],
          },
          amount: {
            currency,
            total,
          },
          description,
        },
      ],
    };

    await paypal.payment.create(create_payment_json, function (error, payment) {
      if (error) {
        throw new createHttpError.InternalServerError(error);
      } else {
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            // res.json({ forwardLink: payment.links[i].href });
            return { forwardLink: payment.links[i].href };
          }
        }
      }
    });
  } catch (error) {
    throw new createHttpError.InternalServerError();
  }
};

const paymentSucces = async (payerId, paymentId, currency, total_price) => {
  try {
    const execute_payment_json = {
      payer_id: payerId,
      transactions: [
        {
          amount: {
            currency: currency,
            total: total_price,
          },
        },
      ],
    };

    paypal.payment.execute(
      paymentId,
      execute_payment_json,
      function (error, payment) {
        if (error) {
          throw new createHttpError.InternalServerError(error);
        } else {
          return payment;
        }
      }
    );
  } catch (error) {
    throw new createHttpError.InternalServerError();
  }
};

module.exports = {
  getOrederByUserId,
  createOrder,
  createPayment,
  paymentSucces,
};
