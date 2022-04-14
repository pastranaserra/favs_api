exports.list = (req, res) => {
  res.send("These are the user's lists");
};

exports.create = (req, res) => {
  res.send('Create a user list here');
};

exports.read = (req, res) => {
  res.send('Reading user list...');
};

exports.modify = (req, res) => {
  res.send('Modify the list here');
};

exports.delete = (req, res) => {
  res.send('Deleting list');
};
