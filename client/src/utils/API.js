const _URLs = {
  SEND_EMAIL: "/api/email",
};

export const sendEmail = (body) => {
  return fetch(_URLs.SEND_EMAIL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};
