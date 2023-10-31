function apiResponse(res, statusCode, message, data = [], error = []) {
    const resp = data && data.data
        ? { statusCode, message, ...data, error }
        : { statusCode, message, data, error };

    return res.status(statusCode).send(resp);
};

module.exports = { apiResponse };