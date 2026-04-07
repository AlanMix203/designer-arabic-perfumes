export default async function handler(req, res) {
  const { action, datos } = req.body;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.VITE_SKYDROPX_API_KEY}`,
  };

  try {
    if (action === 'cotizar') {
      const response = await fetch('https://api.skydropx.com/v1/quotations', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          zip_from: import.meta.env.VITE_ORIGEN_CP,
          zip_to: datos.cpDestino,
          parcel: {
            weight: 0.5,
            height: 10,
            width: 8,
            length: 5,
          },
        }),
      });
      const data = await response.json();
      return res.status(200).json(data);
    }

    if (action === 'crear_guia') {
      const response = await fetch('https://api.skydropx.com/v1/labels', {
        method: 'POST',
        headers,
        body: JSON.stringify(datos),
      });
      const data = await response.json();
      return res.status(200).json(data);
    }

    return res.status(400).json({ error: 'Acción no reconocida' });

  } catch (error) {
    return res.status(500).json({ error: 'Error conectando con Skydropx' });
  }
}