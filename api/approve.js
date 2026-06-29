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

        // ⚠️ REMPLACEZ LES XXXXX PAR VOTRE CLÉ RÉCUPÉRÉE SUR DEVELOP.PI SI CE N'EST PAS FAIT
        const Pi_Server_API_Key = "2apaxmjbuiy41p43cy6vxwhrprhkerpygtxizpfaqe1ju8idwq0xfagho5jxr2dh"; 

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
