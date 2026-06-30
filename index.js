module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method === 'POST') {
        try {
            const { action, paymentId } = req.body;
            if (action === 'approve') {
                return res.status(200).json({ message: "Approved", paymentId: paymentId });
            }
            if (action === 'complete') {
                return res.status(200).json({ message: "Completed" });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    return res.status(200).json({ status: "Serveur racine actif et prêt !" });
};
