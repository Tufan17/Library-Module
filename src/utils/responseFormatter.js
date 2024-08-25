const formatApiResponse = (
  req,
  reqName,
  responseName,
  responseBody,
  code = 200
) => {
  return {
    name: reqName,
    request: {
      method: req.method,
      header: req.headers,
      url: {
        raw: `localhost:${process.env.PORT}${req.path}`,
        host: ["localhost"],
        port: `${process.env.PORT}`,
        path: [req.path.slice(1)],
      },
    },
    response: [
      {
        name: responseName,
        originalRequest: {
          method: req.method,
          header: [],
          url: {
            raw: `localhost:${process.env.PORT}${req.path}`,
            host: ["localhost"],
            port: `${process.env.PORT}`,
            path: [req.path.slice(1)],
          },
        },
        status: "OK",
        code: code,
        _postman_previewlanguage: "json",
        header: null,
        cookie: [],
        body: responseBody,
      },
    ],
  };
};

module.exports = { formatApiResponse };
