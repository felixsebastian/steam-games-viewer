import { z } from "zod";

const steamIdSchema = z
  .string()
  .regex(/^[0-9]*$/, {
    message: "Should only contain numbers",
  })
  .min(6, {
    message: "Should be at lest 6 digits",
  });

export default steamIdSchema;
