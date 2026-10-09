export function logRequest(req, res, next) {
  res.on("finish", () => {
    console.log(
      `[Request ID]: ${crypto.randomUUID()}, [Method]: ${req.method}, [Url]: '${req.originalUrl}', [Status]: ${res.statusCode ?? ''}`,
    );
  });

  next();
}
