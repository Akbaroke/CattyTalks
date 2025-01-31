import { models } from "../config/database.js";
const { User } = models;

export default async function cekUserId(req, res, next) {
  const { userId } = req.params;
  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) {
      const error = new Error("ID Pengguna Tidak Valid");
      error.statusCode = 404;
      throw error;
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(error.statusCode || 500).json({ msg: error.message });
    next(error); // Lanjutkan error ke middleware berikutnya
  }
}
