import { faker } from '@faker-js/faker';

export default function createRandomProduct() {
  const title = faker.commerce.productName();
  const farmer_id = faker.datatype.number({ min: 1, max: 10, precision: 1 });
  const items = faker.commerce.productDescription();
  const price = faker.commerce.price();
  const delivery_date = faker.date.weekday();
  const subscription_frequency = faker.datatype.number({ min: 1, max: 3, precision: 1 });
  const subscription_start = faker.date.between('2024-03-15', '2024-10-15');
  const subscription_end = faker.date.between('2024-10-15', '2025-10-15');
  const photo = faker.commerce.product();
  const organic = faker.datatype.boolean();
  const category = faker.commerce.department();

  return {
    title,
    farmer_id,
    items,
    price,
    delivery_date,
    subscription_frequency,
    subscription_start,
    subscription_end,
    photo,
    organic,
    category,
  };
}
