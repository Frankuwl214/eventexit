import { Translate } from '@google-cloud/translate';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const translate = new Translate({ /* ...config... */ });
      // Perform the translation
      const text = req.body.text;
      const targetLanguage = req.body.targetLanguage;
      const [translation] = await translate.translate(text, targetLanguage);
      
      res.status(200).json({ translation });
    } catch (error) {
      res.status(500).json({ error: 'Translation failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
