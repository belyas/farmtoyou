export default async function payment(r, re) {
  return re.status(201).json({ done: true });
}
