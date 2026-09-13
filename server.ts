import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({ apiKey });
  }
  return geminiClient;
}

// System prompt for Ayesha Baking House AI Concierge
const AYESHA_BAKE_SYSTEM_PROMPT = `
You are the warm, polite, and passionate AI Bakery Concierge for "AYESHA BAKING HOUSE".
Our Tagline: "Baked with Love, Made for You"
WhatsApp Contact for Orders & Inquiries: 03442302526 (International format: +923442302526)

Key Business Offerings:
1. "ALL DESIGN CAKE PROVIDE":
   - Custom celebration cakes for any theme! Handcrafted 3D sculpted cakes (e.g. Yellow Car cake, Sonic the Hedgehog birthday cake, Superhero, Princess, Barbie, Dinosaurs, etc.).
   - Wedding, Engagement, Anniversary, and Baby Shower designer multi-tier cakes.
   - Picture / Photo edible printed cakes, floral buttercream cakes, elegant drip cakes.
2. Official Price List (Base 1-2 lbs pricing in Pakistani Rupees - PKR / Rs.):
   - Vanilla Cake: Rs. 1000
   - Strawberry Cake: Rs. 1000
   - Caramel Crunch Cake: Rs. 1000
   - Pistachio Cake: Rs. 1200
   - Pineapple Cake: Rs. 1200
   - Chocolate Cake: Rs. 1300
   - Rasmalai Cake (Specialty Fusion): Rs. 1500
   - Chocolate Fudge Cake: Rs. 1500
   - Butter Cream Cake: Rs. 2000
   - Pastry Per Piece (Vanilla + Butter): Rs. 130
   - Pastry Per Piece (Chocolate): Rs. 150
   - Brownies: Rs. 170
   * Note: Custom 3D sculpted fondant/theme decorations or heavy multi-tier cakes are custom quoted based on complexity.

Your Personality & Instructions:
- Greet customers warmly with friendly bakery hospitality.
- Recommend cake flavors and sizes based on their occasion, number of guests (rule of thumb: 1 lb feeds 4-6 people, 2 lbs feeds 8-12 people, 3 lbs feeds 15-20 people).
- Suggest creative custom cake themes (e.g., Sonic cake with dinosaur party toppers, Car cake with rosettes, Rasmalai saffron pistachio fusion for family festivities).
- Guide the user to place their order directly via WhatsApp at 03442302526.
- Offer to prepare a pre-filled WhatsApp message format for them with:
  "Cake Type / Flavor, Pounds / Weight, Theme / Inscription text, Delivery Date & Time, Delivery Address".
- Keep answers concise, delicious sounding, and polite.
`;

// Gemini Chat Endpoint
app.post("/api/gemini/chat", async (req, res) => {
  try {
    const { messages, userQuery } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      // Graceful fallback if API key is not yet set
      return res.json({
        reply: "Welcome to Ayesha Bake! Baked with Love, Made for You. We provide all custom design cakes (Car cakes, Sonic theme, Rasmalai, Chocolate Fudge & more). To discuss your custom order directly with Chef Ayesha, please message us on WhatsApp at 03442302526!",
        suggestedCake: "Chocolate Fudge Cake",
        suggestedSize: "2 lbs",
        whatsappUrl: "https://wa.me/923442302526?text=Hello%20Ayesha%20Bake!%20I%20would%20like%20to%20inquire%20about%20ordering%20a%20custom%20cake."
      });
    }

    // Build chat contents
    const contents: any[] = [];
    if (Array.isArray(messages)) {
      for (const msg of messages) {
        contents.push({
          role: msg.sender === "user" ? "user" : "model",
          parts: [{ text: msg.text }]
        });
      }
    }
    if (userQuery) {
      contents.push({
        role: "user",
        parts: [{ text: userQuery }]
      });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: contents.length > 0 ? contents : [{ role: "user", parts: [{ text: "Hello! What cakes do you make?" }] }],
      config: {
        systemInstruction: AYESHA_BAKE_SYSTEM_PROMPT,
        temperature: 0.7,
      }
    });

    const text = response.text || "Welcome to Ayesha Bake! Please WhatsApp us at 03442302526 to customize your dream cake.";
    res.json({ reply: text });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(500).json({
      error: "Unable to process AI cake request at the moment.",
      fallback: "You can message us directly on WhatsApp at 03442302526 for immediate custom cake booking!"
    });
  }
});

// Gemini AI Cake Idea / Custom Quote Assistant
app.post("/api/gemini/custom-design", async (req, res) => {
  try {
    const { occasion, audience, themeIdea, guestCount, flavorPreference } = req.body;
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        designConcept: "Custom celebration cake handcrafted with love, matching your party theme with fluffy layered sponge and premium whipped frosting.",
        recommendedPounds: guestCount && Number(guestCount) > 15 ? "3 to 4 lbs" : "2 lbs",
        recommendedFlavor: flavorPreference || "Chocolate Fudge Cake",
        estimatedPriceRange: "Rs. 2500 - 3500 (dependent on custom 3D sculpture and toppers)",
        bakerAdvice: "Order at least 24-48 hours in advance so Chef Ayesha can hand-craft your custom theme elements.",
      });
    }

    const prompt = `
Create an inspiring custom cake concept for AYESHA BAKE ("ALL DESIGN CAKE PROVIDE").
Details:
- Occasion: ${occasion || "Birthday / Celebration"}
- For: ${audience || "Family member / Child / Loved one"}
- Desired Theme/Design: ${themeIdea || "Custom Theme Cake like Cartoon, Car, Floral, or Royal"}
- Expected Guests: ${guestCount || "10-15 guests"}
- Preferred Flavor: ${flavorPreference || "Open to recommendation"}

Available flavors & prices from Ayesha Bake menu:
Vanilla (Rs. 1000), Strawberry (Rs. 1000), Caramel Crunch (Rs. 1000), Pistachio (Rs. 1200), Pineapple (Rs. 1200), Chocolate (Rs. 1300), Rasmalai (Rs. 1500), Chocolate Fudge (Rs. 1500), Butter Cream (Rs. 2000).

Return a valid JSON object only with these exact keys:
{
  "title": "catchy cake title",
  "designConcept": "vivid 2-sentence description of the custom visual decoration, colors, and 3D cake toppers",
  "recommendedFlavor": "chosen flavor from menu",
  "recommendedPounds": "recommended weight like 2 lbs or 3 lbs",
  "estimatedPrice": "estimated price in PKR with breakdown",
  "bakerAdvice": "one helpful tip for party day or custom inscription",
  "suggestedMessage": "wording to pipe onto the cake board"
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        systemInstruction: "You are the head pastry designer for Ayesha Bake. You output ONLY clean valid JSON with no markdown backticks.",
        responseMimeType: "application/json",
      }
    });

    const parsed = JSON.parse(response.text || "{}");
    res.json(parsed);
  } catch (err: any) {
    console.error("Custom design error:", err);
    res.json({
      title: "Handcrafted Celebration Cake",
      designConcept: "Delightful custom-themed celebration cake with handcrafted butter icing and festive toppers.",
      recommendedFlavor: "Chocolate Fudge Cake",
      recommendedPounds: "2 lbs",
      estimatedPrice: "Rs. 2500 - 3200",
      bakerAdvice: "WhatsApp 03442302526 with any photo reference for an exact quote.",
      suggestedMessage: "Happy Celebration!"
    });
  }
});

async function startServer() {
  // Vite dev middleware vs production static files
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AYESHA BAKE server running on port ${PORT}`);
  });
}

startServer();
