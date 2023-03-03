import User from '../models/User.js';

export default async function cekUserId(req, res, next) {
  const { userId } = req.params;
  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      const error = new Error('Invalid User Id');
      error.statusCode = 404;
      throw error;
    }

    next();
  } catch (error) {
    console.log(error);
    next(error);
    res.status(error.statusCode).json({ msg: error.message });
  }
}
