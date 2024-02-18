// pour gérer les erreurs
exports.errorMiddleware = (err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
};
