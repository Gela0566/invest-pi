// api/pay.js
// Utilisation du fetch natif pour éviter les installations de modules manquants

const PI_API_KEY = "mkjwlwlniw0wqvmhmmvca1ghaq8opb5zqnrusrf94iuqqmpa5mok48ntxsk58ald"; // Ta clé du Developer Portal
const PI_API_URL = "https://api.minepi.com/v2";

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: "Méthode non autorisée" });
    }

    const { action, paymentId, txid } = req.body;

    try {
        // 1. APPROBATION DU PAIEMENT
        if (action === 'approve') {
            const response = await fetch(`${PI_API_URL}/payments/${paymentId}/approve`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Key ${PI_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            return res.status(200).json({ success: true, data: data });
        }

        // 2. FINALISATION DU PAIEMENT
        if (action === 'complete') {
            const response = await fetch(`${PI_API_URL}/payments/${paymentId}/complete`, {
                method: 'POST',
                headers: { 
                    'Authorization': `Key ${PI_API_KEY}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ txid: txid })
            });
            const data = await response.json();
            return res.status(200).json({ success: true, data: data });
        }

        return res.status(400).json({ error: "Action inconnue" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
