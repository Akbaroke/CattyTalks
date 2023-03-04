import Room from '../models/Room.js';

const generateCodeRoom = async () => {
  const generateSixNumber = () => {
    return Math.floor(Math.random() * 900000) + 100000;
  };

  const checkCode = async (code) => {
    const data = await Room.findOne({
      where: {
        code: code,
      },
    });
    return data;
  };

  let code = generateSixNumber();
  const data = await checkCode(code);
  if (data) {
    // jika kode sudah ada di database, generate kode baru
    return generateCodeRoom();
  } else {
    // jika kode belum ada di database, return kode yang dihasilkan
    return code;
  }
};

export default generateCodeRoom;
