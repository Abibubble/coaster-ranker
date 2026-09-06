import { describe, expect, it } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { Coaster } from "../../types/data";
import { useNumberZeroOffer } from "./useNumberZeroOffer";

const makeCoaster = (overrides: Partial<Coaster> & { id: string }): Coaster => ({
  name: "Coaster",
  park: "Park",
  country: "Country",
  manufacturer: "Manufacturer",
  ...overrides,
});

describe("useNumberZeroOffer - offer", () => {
  it("offers the next unranked coaster when there's no existing Number 0", () => {
    const coaster = makeCoaster({ id: "a", name: "Alpha" });

    const { result } = renderHook(() => useNumberZeroOffer(coaster, false));

    expect(result.current.offer).toEqual(coaster);
  });

  it("does not offer when there is no next unranked coaster", () => {
    const { result } = renderHook(() => useNumberZeroOffer(null, false));

    expect(result.current.offer).toBeNull();
  });

  it("never offers once a Number 0 already exists for this ride type", () => {
    const coaster = makeCoaster({ id: "a", name: "Alpha" });

    const { result } = renderHook(() => useNumberZeroOffer(coaster, true));

    expect(result.current.offer).toBeNull();
  });
});

describe("useNumberZeroOffer - decline", () => {
  it("stops offering for this specific coaster once declined", () => {
    const coaster = makeCoaster({ id: "a", name: "Alpha" });

    const { result } = renderHook(() => useNumberZeroOffer(coaster, false));

    expect(result.current.offer).not.toBeNull();
    act(() => result.current.declineOffer());

    expect(result.current.offer).toBeNull();
  });

  it("declining one coaster does not suppress the offer for a different coaster", () => {
    const a = makeCoaster({ id: "a", name: "Alpha" });
    const b = makeCoaster({ id: "b", name: "Bravo" });

    const { result, rerender } = renderHook(
      ({ next }: { next: Coaster | null }) =>
        useNumberZeroOffer(next, false),
      { initialProps: { next: a as Coaster | null } },
    );

    act(() => result.current.declineOffer());
    expect(result.current.offer).toBeNull();

    rerender({ next: b });
    expect(result.current.offer).toEqual(b);
  });

  it("declineOffer is a no-op when there is nothing currently offered", () => {
    const { result } = renderHook(() => useNumberZeroOffer(null, false));

    expect(() => act(() => result.current.declineOffer())).not.toThrow();
    expect(result.current.offer).toBeNull();
  });
});
