import User from '../models/User.js';

const addUser = async (profile) => {
  const id = profile._json.sub;
  const name = profile._json.name;
  const email = profile._json.email;
  const profilePicture = profile._json.picture;
  try {
    const cekData = await User.findOne({
      where: { id: id },
    });

    if (cekData) {
      await User.update(
        {
          name: name,
          profile_picture: profilePicture,
        },
        {
          where: {
            id: id,
          },
        }
      );
    } else {
      await User.create({
        id: id,
        name: name,
        email: email,
        profile_picture: profilePicture,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export default addUser;
