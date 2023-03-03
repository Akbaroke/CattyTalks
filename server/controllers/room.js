import dotenv from 'dotenv';
dotenv.config();

export const createRoom = async (req, res) => {
  const { userId } = req.params;
  const { name, code } = req.body;
  try {
    if (name === undefined) throw error;
    if (name.length < 4) throw error;
    if (name.length > 20) throw error;
    if (code.length !== 6) throw error;

    res.json({ id: userId });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: 'create room failed, please try again later.' });
  }
};
