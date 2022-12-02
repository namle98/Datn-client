import http from "../utils/http";

export const createOrUpdateUser = (authToken: string) => {
  http.post(
    "create-or-update-user",
    {},
    {
      headers: {
        authToken: authToken,
      },
    }
  );
};
