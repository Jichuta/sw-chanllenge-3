"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ENGLISH_LEVELS, MAX_CV_FILE_SIZE_BYTES } from "@/src/lib/constants";
import { cn } from "@/src/lib/utils";

const formSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(120),
  email: z.string().trim().email("Invalid email format").max(160),
  phone: z.string().trim().min(7, "Phone must be at least 7 characters").max(30),
  age: z.coerce.number({ invalid_type_error: "Age is required" }).int().min(16, "Minimum age is 16").max(100, "Maximum age is 100"),
  country: z.string().trim().min(2, "Country must be at least 2 characters").max(80),
  city: z.string().trim().min(2, "City must be at least 2 characters").max(80),
  englishLevel: z.enum(ENGLISH_LEVELS, { required_error: "English level is required" })
});

type FormValues = z.infer<typeof formSchema>;

export const CandidateApplicationForm = () => {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvError, setCvError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  });

  const validateCv = (file: File | null): boolean => {
    setCvError(null);

    if (!file) {
      setCvError("CV file is required");
      return false;
    }

    if (file.type !== "application/pdf") {
      setCvError("CV must be a PDF file");
      return false;
    }

    if (file.size > MAX_CV_FILE_SIZE_BYTES) {
      setCvError("CV file must be under 5 MB");
      return false;
    }

    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setCvFile(file);
    if (file) validateCv(file);
  };

  const onSubmit = async (values: FormValues) => {
    if (!validateCv(cvFile)) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("age", String(values.age));
      formData.append("country", values.country);
      formData.append("city", values.city);
      formData.append("englishLevel", values.englishLevel);
      formData.append("cv", cvFile!);

      const response = await fetch("/api/candidates", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        const message = result?.error?.message ?? "Submission failed";
        toast.error(message);
        return;
      }

      toast.success("Application submitted successfully!");
      reset();
      setCvFile(null);
      const fileInput = document.querySelector<HTMLInputElement>('input[name="cv"]');
      if (fileInput) fileInput.value = "";
    } catch {
      toast.error("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClasses =
    "w-full rounded-md border border-border bg-white px-3 py-2 text-sm outline-none transition focus:border-primary focus:ring-1 focus:ring-primary";
  const errorClasses = "mt-1 text-xs text-danger";
  const labelClasses = "text-sm font-medium text-foreground";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClasses}>
            Full name
          </label>
          <input id="name" {...register("name")} className={cn(fieldClasses, errors.name && "border-danger")} placeholder="Jane Doe" />
          {errors.name && <p className={errorClasses}>{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className={labelClasses}>
            Email
          </label>
          <input id="email" type="email" {...register("email")} className={cn(fieldClasses, errors.email && "border-danger")} placeholder="jane@example.com" />
          {errors.email && <p className={errorClasses}>{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className={labelClasses}>
            Phone
          </label>
          <input id="phone" type="tel" {...register("phone")} className={cn(fieldClasses, errors.phone && "border-danger")} placeholder="+1 555 0100" />
          {errors.phone && <p className={errorClasses}>{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="age" className={labelClasses}>
            Age
          </label>
          <input id="age" type="number" {...register("age")} className={cn(fieldClasses, errors.age && "border-danger")} placeholder="28" />
          {errors.age && <p className={errorClasses}>{errors.age.message}</p>}
        </div>

        <div>
          <label htmlFor="country" className={labelClasses}>
            Country
          </label>
          <input id="country" {...register("country")} className={cn(fieldClasses, errors.country && "border-danger")} placeholder="United States" />
          {errors.country && <p className={errorClasses}>{errors.country.message}</p>}
        </div>

        <div>
          <label htmlFor="city" className={labelClasses}>
            City
          </label>
          <input id="city" {...register("city")} className={cn(fieldClasses, errors.city && "border-danger")} placeholder="Austin" />
          {errors.city && <p className={errorClasses}>{errors.city.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="englishLevel" className={labelClasses}>
          English level
        </label>
        <select id="englishLevel" {...register("englishLevel")} className={cn(fieldClasses, errors.englishLevel && "border-danger")}>
          <option value="">Select level...</option>
          {ENGLISH_LEVELS.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
        {errors.englishLevel && <p className={errorClasses}>{errors.englishLevel.message}</p>}
      </div>

      <div>
        <label htmlFor="cv" className={labelClasses}>
          CV (PDF only)
        </label>
        <input
          id="cv"
          type="file"
          accept=".pdf,application/pdf"
          onChange={handleFileChange}
          className={cn(
            "w-full rounded-md border border-border bg-white px-3 py-2 text-sm file:mr-3 file:rounded file:border-0 file:bg-primary file:px-3 file:py-1 file:text-xs file:text-primary-foreground",
            cvError && "border-danger"
          )}
        />
        {cvFile && !cvError && (
          <p className="mt-1 text-xs text-muted-foreground">{cvFile.name}</p>
        )}
        {cvError && <p className={errorClasses}>{cvError}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
      >
        {isSubmitting ? "Submitting..." : "Submit application"}
      </button>
    </form>
  );
};
