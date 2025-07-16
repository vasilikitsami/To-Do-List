export const getUsers = (req, res) => {
  const sampleUsers = [
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
  ];
  return res.status(200).json(sampleUsers);
};
