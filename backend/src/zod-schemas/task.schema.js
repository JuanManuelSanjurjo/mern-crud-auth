import z from "zod"


export const createTaskSchema = z.object({
    title: z.string({
        required_error: "Task title is required"
    }),
    description: z.string(),
    date: z.string().datetime().optional()

})