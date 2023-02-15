export default function dummy(req, res) {
  if (req?.method === 'PSOT') {
    res.status(200).json({ status: 'success' });
  } else {
    res.status(400).json({ status: 'error' });
  }
}
