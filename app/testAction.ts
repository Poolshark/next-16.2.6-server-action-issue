"use server";

export const testAction = async (_prevState: unknown, formData: FormData) => {
  const value = formData.get("test-field");
  console.log("FormData entries:", Object.fromEntries(formData));
  console.log("test-field value:", value);
  return { received: value };
};