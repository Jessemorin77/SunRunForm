import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const post2Router = createTRPCRouter({
    create: publicProcedure
    .input(z.object({ 
        firstName: z.string().min(1),
      lastName: z.string().min(1),
      address: z.string().min(1),
      phoneNumber: z.string().min(1),
      email: z.string().email(),
      usageSummary: z.string() // Assuming usageSummary is a JSON string
    }))
    .mutation(async ({ ctx, input }) => {
        const user = await ctx.db.user.create({
            data: {
                firstName: input.firstName,
                lastName: input.lastName,
                address: input.address,
                phoneNumber: input.phoneNumber,
                email: input.email,
                electricalBill: {
                create: {
                    usageSummary: input.usageSummary
                    }
                }
            },
            include: {
                electricalBill: true
            },
        });
        return user;
    }),
});