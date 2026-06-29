export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Méthode non autorisée.' });
    }

    try {
        const { paymentId } = req.body;

        if (!paymentId) {
            return res.status(400).json({ error: 'paymentId manquant.' });
        }

        const Pi_Server_API_Key = "e9wlfdwyhfyrfjryvxpjjdnuvmzuvbjpmzdylx0cqtft8pdofocuauq91ekza3ih"; 

        const response = await fetch(`https://api.minepi.com/v2/payments/${paymentId}/cancel`, {
            method: 'POST',
            headers: {
                'Authorization': `Key ${Pi_Server_API_Key}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json({ error: 'Erreur Pi API', details: data });
        }

        return res.status(200).json({ success: true, message: 'Paiement annulé avec succès !', data: data });

    } catch (error) {
        return res.status(500).json({ error: 'Erreur annulation', details: error.message });
    }
}
