import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) return null;
  return new GoogleGenAI({ apiKey });
};

export const analyzeInventoryTrends = async (products: Product[]) => {
  const client = getClient();
  if (!client) return "API Key no configurada. No se puede realizar el análisis IA.";

  // Prepare a summary of the data to reduce token count
  const dataSummary = products.map(p => ({
    item: p.name,
    totalQty: p.quantityStore + p.quantityWarehouse,
    expiry: p.expiryDate,
    value: (p.quantityStore + p.quantityWarehouse) * p.priceSale,
    category: p.category
  }));

  const prompt = `
    Actúa como un analista experto de inventario para una tienda minorista (JML System).
    Analiza los siguientes datos de inventario en formato JSON.
    
    Datos: ${JSON.stringify(dataSummary)}

    Proporciona un resumen estratégico en formato HTML simple (sin etiquetas html/body, solo p, ul, li, strong) cubriendo:
    1. Productos en riesgo crítico de caducidad (Sugiere acciones como descuentos).
    2. Productos con sobrestock o bajo movimiento aparente.
    3. Valor total del inventario en riesgo.
    4. Recomendación de compra basada en categorías.

    Sé conciso, directo y útil para el dueño del negocio.
  `;

  try {
    const response = await client.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error analyzing inventory:", error);
    return "Ocurrió un error al conectar con JML AI. Por favor intente más tarde.";
  }
};