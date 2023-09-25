const _URLs = {
  SEND_EMAIL: "/api/email",
  STOP_MAILING: "/api/email/stop",
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

export const stopEmailing = () => {
  return fetch(_URLs.STOP_MAILING, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};
