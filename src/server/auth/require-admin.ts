import { apiError } from "@/src/lib/errors";

export const requireAdmin = async () => {
  return {
    ok: false as const,
    response: apiError({
      status: 501,
      code: "INTERNAL_ERROR",
      message: "Admin authentication will be implemented in Sprint 3."
    })
  };
};
