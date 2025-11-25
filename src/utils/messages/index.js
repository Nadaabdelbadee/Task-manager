const generateMessage = (entity) => ({
  notFound: `${entity} not found`,
  alreadyExist: `${entity} already Exist`,
  created: `${entity} created successfully`,
  updated: `${entity} updated successfully`,
  deleted: `${entity} deleted successfully`,
});

export const message = {
  user: { ...generateMessage("user"), login: "Login Successfully" },
  email: {
    ...generateMessage("email"),
    verify: "verify your email first!",
    confirmed: "email confirmed successfully 🎉",
    notSend: "Email not send PLZ try again!",
  },
  mainTask: { ...generateMessage("mainTask") },
  subTask: { ...generateMessage("subTask") },
  password: { invalid: "invalid Password" },
};
