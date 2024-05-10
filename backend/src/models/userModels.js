import prisma from "../../client.js"

export async function createUser(userData) {
  const user = await prisma.user.create({
    data: userData,
  });
  return user;
}
export async function get_user(email) {
  return await prisma.user.findUnique({ where: {email: email} })
}
export async function deleteUser(userEmail, userPassword) {
  if (
    await prisma.user.findUnique({
      where: {
        email: e_mail,
      },
    })
  ) {
    const user = await prisma.User.delete({
      where: {
        email: userEmail,
        password: userPassword,
      },
    });
    return true;
  }
  return false;
}

export async function updateUser(userEmail, userData) {
  if (
    await prisma.user.findUnique({
      where: {
        email: e_mail,
      },
    })
  ) {
    const user = await prisma.User.update({
      where: {
        email: userEmail,
      },
      data: userData,
    });
    return user;
  }
  return false;
}
