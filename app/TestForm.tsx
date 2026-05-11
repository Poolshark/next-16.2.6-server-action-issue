"use client";

import { useActionState } from "react";
import { testAction } from "./testAction";

export function TestForm() {
  const [state, action, isPending] = useActionState(testAction, null);

  return (
    <form action={action}>
      <input type="text" name="test-field" defaultValue="hello" />
      <button type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit"}
      </button>
      {state && <pre>{JSON.stringify(state, null, 2)}</pre>}
    </form>
  );
}