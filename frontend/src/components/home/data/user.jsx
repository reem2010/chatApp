export const getUser = async () => {
  const res = await fetch(`${import.meta.env.VITE_Host}auth`, {
    credentials: "include",
  });
  const user = await res.json();
  return user;
};

export const logout = async () => {
  const res = await fetch(`${import.meta.env.VITE_Host}auth/logout`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
