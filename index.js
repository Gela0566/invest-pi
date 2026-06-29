import axios from 'axios';

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

        // ⚠️ REMPLACEZ LES XXXXX PAR VOTRE CLÉ RÉCUPÉRÉE SUR DEVELOP.PI
        const Pi_Server_API_Key = "yzic50agoywuhen76pnucuaiv0i9g1xhaolbldc1m6oobqy0thga5j1a01i7ih7d"; 

        const response = await axios.post(
            `https://api.minepi.com/v2/payments/${paymentId}/approve`,
            {},
            {
                headers: {
                    Authorization: `Key ${Pi_Server_API_Key}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        return res.status(200).json({ success: true, message: 'Approuvé !', data: response.data });

    } catch (error) {
        return res.status(500).json({ error: 'Erreur approbation', details: error.message });
    }
}
