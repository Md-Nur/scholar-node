import TestimonialForm from "@/components/admin/TestimonialForm";
import { createTestimonial } from "../actions";

export const revalidate = 0;

export default function NewTestimonialPage() {
  return <TestimonialForm action={createTestimonial} />;
}
