export const getUser = async () => {
  res = await fetch(`${import.meta.env.VITE_Host}`, {
    credentials: "include",
  });
  user = await res.json();
  return user;
};
