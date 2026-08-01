export const validateClientKey = (req, res, next) => {
    const clientKey = req.headers['x-client-key'];
    const validClientKey = process.env.CLIENT_KEY;

    if (validClientKey && clientKey !== validClientKey) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized: Invalid or missing x-client-key header'
        });
    }

    next();
};
