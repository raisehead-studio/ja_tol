export const baseUrl = process.env.REACT_APP_API_URL;

export type ResponseStatusType<T> = {
  data: T;
  message: string;
  status: string;
};

// const getToken = () => localStorage.getItem("token") || "";

// async function checkStatus(response: any) {
//   if (response.status >= 200 && response.status < 300) {
//     return response;
//   }

//   if (response.status === 403) {
//     window.location.href = "/login";
//     localStorage.clear();
//   }

//   const bodyJson = await response.text();
//   const err = JSON.parse(bodyJson);
//   const error = new Error(err.errors, { ...err, text: err.errors });
//   throw error;
// }

export default function request(url: string, options?: any) {
  const { body, headers, ...rest } = options || {};
  //   const token = getToken();
  return (
    fetch(`${baseUrl}${url}`, {
      ...(body && { body: JSON.stringify(body) }),
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
        ...headers,
      },
      ...rest,
    })
      // .then(checkStatus)
      .then((response) => response.text())
      .then((data) => {
        return data ? JSON.parse(data) : {};
      })
  );
}
