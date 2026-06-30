export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { action, paymentId } = req.body;

        if (action === 'approve') {
            // C'est cette réponse que Pi Network attend pour ouvrir le Wallet
            return res.status(200).json({ message: "Approved", paymentId: paymentId });
        }
        
        if (action === 'complete') {
            return res.status(200).json({ message: "Completed" });
        }
    }
    return res.status(404).json({ error: "Not found" });
}
