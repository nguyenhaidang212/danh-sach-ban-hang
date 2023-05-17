export default function checkID() {
  const order = getOrder();
  if (arrId?.includes(order.orderNumber)) {
    order.orderNumber = Math.floor(Math.random() * 1000000);
    setOrder(order);
    checkID();
  } else {
    return true;
  }
}
