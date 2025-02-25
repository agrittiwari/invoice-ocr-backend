import { prisma } from "../db/prisma";
import { processImage } from "../services/llmProcessor.ts";

export const resolvers = {
    Query: {
        getInvoices: async () => await prisma.invoice.findMany(),
    },

    Mutation: {
        uploadInvoice: async (_: any, { imageUrl }: { imageUrl: string }) => {
            // Send image to LLM service
            const extractedData = await processImage(imageUrl);

            return await prisma.invoice.create({
                data: {
                    imageUrl,
                    extractedText: extractedData.rawText,
                    structuredData: extractedData.structuredData,
                },
            });
        },
    },
};
