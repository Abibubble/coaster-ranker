import { Coaster } from "../../types/data";

export interface RankingComparison {
  coasterA: Coaster;
  coasterB: Coaster;
}

export interface RankingState {
  rankedCoasterIds: string[]; // IDs in rank order (index 0 = #1, index 1 = #2, etc.)
  comparisonResults: Map<string, string>; // key: "coasterA-coasterB", value: winnerId
  unrankedCoasters: Coaster[];
  currentComparison: RankingComparison | null;
  isComplete: boolean;
}

export class RankingEngine {
  private state: RankingState;
  private allCoasters: Coaster[];

  constructor(coasters: Coaster[]) {
    const unrankedCoasters = coasters.filter((c) => !c.isPreRanked);

    if (unrankedCoasters.length < 2) {
      throw new Error(
        `Need at least 2 coasters to rank, got ${unrankedCoasters.length}`
      );
    }

    this.allCoasters = [...unrankedCoasters];

    this.state = {
      rankedCoasterIds: [],
      comparisonResults: new Map(),
      unrankedCoasters: [...unrankedCoasters],
      currentComparison: null,
      isComplete: false,
    };

    console.log(
      "RankingEngine: Initializing with coasters:",
      unrankedCoasters.map((c) => c.name)
    );
    this.generateNextComparison();
    console.log(
      "RankingEngine: Initial comparison set:",
      this.state.currentComparison
    );
  }

  getCurrentComparison(): RankingComparison | null {
    return this.state.currentComparison;
  }

  recordComparisonResult(winner: Coaster): void {
    if (!this.state.currentComparison) {
      throw new Error("No active comparison to record");
    }

    console.log("=== RECORDING COMPARISON RESULT ===");
    const { coasterA, coasterB } = this.state.currentComparison;
    console.log(`Winner: ${winner.name}`);
    console.log(
      `Loser: ${winner.id === coasterA.id ? coasterB.name : coasterA.name}`
    );
    console.log(
      `Before: ranked=${this.state.rankedCoasterIds.length}, unranked=${this.state.unrankedCoasters.length}`
    );

    this.storeComparisonResult(coasterA, coasterB, winner);
    this.updateRankingAfterComparison();

    console.log(
      `After: ranked=${this.state.rankedCoasterIds.length}, unranked=${this.state.unrankedCoasters.length}`
    );
    console.log(
      `Current ranking: ${this.state.rankedCoasterIds
        .map((id) => this.findCoasterById(id)?.name)
        .join(", ")}`
    );
    console.log(
      `Remaining unranked: ${this.state.unrankedCoasters
        .map((c) => c.name)
        .join(", ")}`
    );

    this.generateNextComparison();

    console.log(
      `Next comparison: ${
        this.state.currentComparison
          ? `${this.state.currentComparison.coasterA.name} vs ${this.state.currentComparison.coasterB.name}`
          : "NONE"
      }`
    );
    console.log(`Is complete: ${this.state.isComplete}`);
    console.log("=== END COMPARISON RESULT ===\n");
  }

  getState(): RankingState {
    return { ...this.state };
  }

  getFinalRanking(): Coaster[] {
    if (!this.state.isComplete) return [];

    return this.state.rankedCoasterIds
      .map((id) => this.allCoasters.find((c) => c.id === id))
      .filter((c) => c !== undefined) as Coaster[];
  }

  // === SIMPLE, SINGLE-PURPOSE FUNCTIONS ===

  private storeComparisonResult(
    coasterA: Coaster,
    coasterB: Coaster,
    winner: Coaster
  ): void {
    const comparisonKey = this.getComparisonKey(coasterA, coasterB);
    this.state.comparisonResults.set(comparisonKey, winner.id);
  }

  private updateRankingAfterComparison(): void {
    if (this.isFirstComparison()) {
      this.handleFirstComparison();
    } else {
      this.handleSubsequentComparison();
    }
  }

  private isFirstComparison(): boolean {
    return this.state.rankedCoasterIds.length === 0;
  }

  private handleFirstComparison(): void {
    const { coasterA, coasterB } = this.state.currentComparison!;
    const winner = this.getWinnerFromComparison(coasterA, coasterB);
    const loser = winner.id === coasterA.id ? coasterB : coasterA;

    this.state.rankedCoasterIds = [winner.id, loser.id];
    this.removeFromUnranked(winner.id);
    this.removeFromUnranked(loser.id);
  }

  private handleSubsequentComparison(): void {
    const { coasterA, coasterB } = this.state.currentComparison!;

    // Determine which coaster is being ranked (unranked)
    const coasterAIsUnranked = this.state.unrankedCoasters.some(
      (c) => c.id === coasterA.id
    );
    const coasterBIsUnranked = this.state.unrankedCoasters.some(
      (c) => c.id === coasterB.id
    );

    if (coasterAIsUnranked && !coasterBIsUnranked) {
      // Coaster A is the one being ranked
      this.tryToPlaceCoaster(coasterA);
    } else if (!coasterAIsUnranked && coasterBIsUnranked) {
      // Coaster B is the one being ranked
      this.tryToPlaceCoaster(coasterB);
    }
    // If both are unranked or both are ranked, don't place anything yet
  }

  private tryToPlaceCoaster(coaster: Coaster): void {
    console.log(`\nAttempting to place ${coaster.name}`);
    const insertionIndex = this.findInsertionPosition(coaster);

    if (insertionIndex !== -1) {
      console.log(`Can place ${coaster.name} - placing now`);
      this.placeCoasterInRanking(coaster, insertionIndex);
    } else {
      console.log(`Cannot place ${coaster.name} yet - need more comparisons`);
    }
  }

  private placeCoasterInRanking(
    coaster: Coaster,
    insertionIndex: number
  ): void {
    console.log(`\n=== PLACING COASTER: ${coaster.name} ===`);
    console.log(`Inserting ${coaster.name} at position ${insertionIndex}`);

    this.state.rankedCoasterIds.splice(insertionIndex, 0, coaster.id);
    this.removeFromUnranked(coaster.id);

    console.log(`After placing ${coaster.name}:`);
    console.log(
      `  New ranking: ${this.state.rankedCoasterIds
        .map((id) => this.findCoasterById(id)?.name)
        .join(", ")}`
    );
    console.log(
      `  Remaining unranked: ${this.state.unrankedCoasters
        .map((c) => c.name)
        .join(", ")}`
    );
    console.log(`=== END PLACEMENT ===\n`);
  }

  private findInsertionPosition(newCoaster: Coaster): number {
    console.log(
      `\nFinding insertion position for ${newCoaster.name} using binary search`
    );

    if (this.state.rankedCoasterIds.length === 0) {
      console.log(`Empty ranking - inserting at position 0`);
      return 0;
    }

    let left = 0;
    let right = this.state.rankedCoasterIds.length;

    console.log(`Binary search range: ${left} to ${right}`);

    while (left < right) {
      const mid = Math.floor((left + right) / 2);
      const midCoasterId = this.state.rankedCoasterIds[mid];
      const midCoaster = this.findCoasterById(midCoasterId)!;

      const comparisonResult = this.getComparisonResult(newCoaster, midCoaster);

      console.log(
        `  Comparing ${newCoaster.name} vs ${midCoaster.name} (pos ${mid}) - result: ${comparisonResult}`
      );

      if (!comparisonResult) {
        console.log(
          `  No comparison data between ${newCoaster.name} and ${midCoaster.name} - cannot place yet`
        );
        return -1; // Need more comparisons
      }

      if (comparisonResult === newCoaster.id) {
        // New coaster beats mid coaster, search upper half (better positions)
        console.log(
          `  ${newCoaster.name} beats ${midCoaster.name} - searching positions 0 to ${mid}`
        );
        right = mid;
      } else {
        // Mid coaster beats new coaster, search lower half (worse positions)
        console.log(
          `  ${midCoaster.name} beats ${
            newCoaster.name
          } - searching positions ${mid + 1} to ${right}`
        );
        left = mid + 1;
      }
    }

    console.log(
      `Binary search complete - ${newCoaster.name} should be placed at position ${left}`
    );
    return left;
  }

  private generateNextComparison(): void {
    console.log("--- GENERATING NEXT COMPARISON ---");
    console.log(`Ranked coasters: ${this.state.rankedCoasterIds.length}`);
    console.log(`Unranked coasters: ${this.state.unrankedCoasters.length}`);
    console.log(
      `Unranked names: ${this.state.unrankedCoasters
        .map((c) => c.name)
        .join(", ")}`
    );

    if (this.isRankingComplete()) {
      console.log("Ranking is complete!");
      this.state.currentComparison = null;
      this.state.isComplete = true;
      return;
    }

    if (this.needsFirstComparison()) {
      console.log("Setting first comparison");
      this.setFirstComparison();
    } else {
      console.log("Setting binary search comparison");
      this.setBinarySearchComparison();
    }

    console.log(
      `Generated comparison: ${
        this.state.currentComparison
          ? `${this.state.currentComparison.coasterA.name} vs ${this.state.currentComparison.coasterB.name}`
          : "NONE"
      }`
    );
    console.log("--- END GENERATE COMPARISON ---\n");
  }

  private isRankingComplete(): boolean {
    return this.state.unrankedCoasters.length === 0;
  }

  private needsFirstComparison(): boolean {
    return (
      this.state.rankedCoasterIds.length === 0 &&
      this.state.unrankedCoasters.length >= 2
    );
  }

  private setFirstComparison(): void {
    this.state.currentComparison = {
      coasterA: this.state.unrankedCoasters[0],
      coasterB: this.state.unrankedCoasters[1],
    };
  }

  private setBinarySearchComparison(): void {
    const nextCoaster = this.state.unrankedCoasters[0];
    console.log(`Setting binary search for: ${nextCoaster.name}`);
    const comparison = this.getNextBinarySearchComparison(nextCoaster);

    if (!comparison) {
      console.log(
        `No comparison needed for ${nextCoaster.name}, placing directly`
      );
      // Calculate the correct insertion position using existing comparison data
      const insertionIndex = this.findInsertionPosition(nextCoaster);
      if (insertionIndex !== -1) {
        this.placeCoasterInRanking(nextCoaster, insertionIndex);
        console.log(`Placed ${nextCoaster.name}, generating next comparison`);
        this.generateNextComparison(); // Recursively generate next comparison
      } else {
        console.log(
          `ERROR: Cannot place ${nextCoaster.name} - this should not happen`
        );
      }
    } else {
      this.state.currentComparison = comparison;
      console.log(
        `Set comparison: ${comparison.coasterA.name} vs ${comparison.coasterB.name}`
      );
    }
  }

  private getNextBinarySearchComparison(
    newCoaster: Coaster
  ): RankingComparison | null {
    console.log(
      `\n=== FINDING BINARY SEARCH COMPARISON FOR ${newCoaster.name} ===`
    );
    let left = 0;
    let right = this.state.rankedCoasterIds.length;
    console.log(`Initial search range: ${left} to ${right}`);

    while (left < right) {
      const mid = this.calculateMiddleIndex(left, right);
      const midCoasterId = this.state.rankedCoasterIds[mid];
      const midCoaster = this.findCoasterById(midCoasterId)!;

      console.log(`  Checking mid position ${mid}: ${midCoaster.name}`);
      const existingResult = this.getComparisonResult(newCoaster, midCoaster);
      console.log(`  Existing result: ${existingResult}`);

      if (!existingResult) {
        // This is the comparison we need
        console.log(
          `  FOUND NEEDED COMPARISON: ${newCoaster.name} vs ${midCoaster.name}`
        );
        return { coasterA: newCoaster, coasterB: midCoaster };
      }

      // Continue binary search based on previous result
      if (existingResult === newCoaster.id) {
        console.log(
          `  ${newCoaster.name} beats ${midCoaster.name} - searching left half`
        );
        right = mid;
      } else {
        console.log(
          `  ${midCoaster.name} beats ${newCoaster.name} - searching right half`
        );
        left = mid + 1;
      }
      console.log(`  New search range: ${left} to ${right}`);
    }

    console.log(`  Binary search complete - all comparisons exist`);
    console.log(`=== END BINARY SEARCH COMPARISON FINDER ===\n`);
    return null; // All necessary comparisons complete
  }

  private calculateMiddleIndex(left: number, right: number): number {
    return Math.floor((left + right) / 2); // Standard binary search middle calculation
  }

  // === UTILITY FUNCTIONS ===

  private getWinnerFromComparison(
    coasterA: Coaster,
    coasterB: Coaster
  ): Coaster {
    const comparisonKey = this.getComparisonKey(coasterA, coasterB);
    const winnerId = this.state.comparisonResults.get(comparisonKey)!;
    return winnerId === coasterA.id ? coasterA : coasterB;
  }

  private getComparisonResult(
    coasterA: Coaster,
    coasterB: Coaster
  ): string | null {
    const comparisonKey = this.getComparisonKey(coasterA, coasterB);
    return this.state.comparisonResults.get(comparisonKey) || null;
  }

  private findCoasterById(id: string): Coaster | undefined {
    return this.allCoasters.find((c) => c.id === id);
  }

  private removeFromUnranked(coasterId: string): void {
    this.state.unrankedCoasters = this.state.unrankedCoasters.filter(
      (c) => c.id !== coasterId
    );
  }

  private getComparisonKey(coasterA: Coaster, coasterB: Coaster): string {
    return coasterA.id < coasterB.id
      ? `${coasterA.id}-${coasterB.id}`
      : `${coasterB.id}-${coasterA.id}`;
  }
}
