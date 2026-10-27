
import { describe, expect, test } from "@jest/globals";
import { validateExtensionEndTime } from "../reservation.rules";

describe("validateExtensionEndTime", () => {
    //arrange 
  const currentEnd = new Date("2026-10-26T18:00:00.000Z");
  const now = new Date("2026-10-26T16:00:00.000Z");

  test("accepts a valid extension", () => {
    const newEnd = "2026-10-26T19:00:00.000Z";

    const result = validateExtensionEndTime(
      currentEnd,
      newEnd,
      now,
    );

    expect(result).toEqual(new Date(newEnd));
  });

  test("rejects an invalid date", () => {
    const result = validateExtensionEndTime(
      currentEnd,
      "not a date",
      now,
    );

    expect(result).toBeFalsy();
  });

  test("rejects an end time equal to the current end", () => {
    const result = validateExtensionEndTime(
      currentEnd,
      currentEnd.toISOString(),
      now,
    );

    expect(result).toBeFalsy();
  });

  test("rejects an end time earlier than the current end", () => {
    const result = validateExtensionEndTime(
      currentEnd,
      "2026-10-26T17:00:00.000Z",
      now,
    );

    expect(result).toBeFalsy();
  });

  test("rejects an extension when the reservation has expired", () => {
    const expiredEnd = new Date("2026-10-26T15:00:00.000Z");

    const result = validateExtensionEndTime(
      expiredEnd,
      "2026-10-26T17:00:00.000Z",
      now,
    );

    expect(result).toBeFalsy();
  });
});
