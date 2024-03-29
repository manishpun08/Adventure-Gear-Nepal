export const getFullName = () => {
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  return `${firstName} ${lastName}`;
};

export const getAdminFullName = () => {
  const firstName = localStorage.getItem("admin-firstName");
  const lastName = localStorage.getItem("admin-lastName");
  return `${firstName} ${lastName}`;
};
