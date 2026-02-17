import { Coaster } from "../../types/data";

/**
 * Advanced ranking engine utility for managing coaster comparisons and rankings.
 * Uses binary search algorithms to efficiently rank coasters through user comparisons.
 */

export interface RankingComparison {
  coasterA: Coaster;
  coasterB: Coaster;
}

export interface ComparisonResult {
  comparison: RankingComparison;
  winner: Coaster;
  loser: Coaster;
}

export interface RankingState {
  rankedCoasterIds: string[];
  comparisonResults: Map<string, string>;
  unrankedCoasters: Coaster[];
  currentComparison: RankingComparison | null;
  isComplete: boolean;
  lastComparison: ComparisonResult | null;
}

export class RankingEngine {
  private state: RankingState;
  private allCoasters: Coaster[];
  private stateHistory: RankingState[];

  constructor(coasters: Coaster[]) {
    const rankedCoasters = coasters
      .filter((c) => !c.isPreRanked && c.rankPosition !== undefined)
      .sort((a, b) => (a.rankPosition || 0) - (b.rankPosition || 0));

    const unrankedCoasters = coasters.filter(
      (c) => !c.isPreRanked && c.rankPosition === undefined,
    );

    if (unrankedCoasters.length === 0 && rankedCoasters.length === 0) {
      throw new Error("No coasters available for ranking");
    }

    if (unrankedCoasters.length === 0) {
      this.allCoasters = [...rankedCoasters];
      this.state = {
        rankedCoasterIds: rankedCoasters.map((c) => c.id),
        comparisonResults: new Map(),
        unrankedCoasters: [],
        currentComparison: null,
        isComplete: true,
        lastComparison: null,
      };
      this.stateHistory = [];
      return;
    }

    if (rankedCoasters.length === 0 && unrankedCoasters.length < 2) {
      throw new Error(
        `Need at least 2 coasters to rank, got ${unrankedCoasters.length}`,
      );
    }

    this.allCoasters = [...rankedCoasters, ...unrankedCoasters];

    this.state = {
      rankedCoasterIds: rankedCoasters.map((c) => c.id),
      comparisonResults: new Map(),
      unrankedCoasters: [...unrankedCoasters],
      currentComparison: null,
      isComplete: false,
      lastComparison: null,
    };

    this.stateHistory = [];

    console.log(
      `Ranking engine initialized with ${rankedCoasters.length} already ranked and ${unrankedCoasters.length} unranked coasters`,
    );
    if (rankedCoasters.length > 0) {
      console.log(
        "Already ranked coasters:",
        rankedCoasters.map((c) => `${c.name} (pos: ${c.rankPosition})`),
      );
    }
    console.log(
      "Unranked coasters:",
      unrankedCoasters.map((c) => c.name),
    );

    this.generateNextComparison();
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
    const loser = winner.id === coasterA.id ? coasterB : coasterA;
    console.log(`Winner: ${winner.name}`);
    console.log(`Loser: ${loser.name}`);
    console.log(
      `Before: ranked=${this.state.rankedCoasterIds.length}, unranked=${this.state.unrankedCoasters.length}`,
    );

    this.saveCurrentState();

    this.storeComparisonResult(coasterA, coasterB, winner);

    this.state.lastComparison = {
      comparison: { ...this.state.currentComparison },
      winner: winner,
      loser: loser,
    };

    this.updateRankingAfterComparison();

    console.log(
      `After: ranked=${this.state.rankedCoasterIds.length}, unranked=${this.state.unrankedCoasters.length}`,
    );
    console.log(
      `Current ranking: ${this.state.rankedCoasterIds
        .map((id) => this.findCoasterById(id)?.name)
        .join(", ")}`,
    );
    console.log(
      `Remaining unranked: ${this.state.unrankedCoasters
        .map((c) => c.name)
        .join(", ")}`,
    );

    this.generateNextComparison();

    console.log(
      `Next comparison: ${
        this.state.currentComparison
          ? `${this.state.currentComparison.coasterA.name} vs ${this.state.currentComparison.coasterB.name}`
          : "NONE"
      }`,
    );
    console.log("=== END COMPARISON RESULT ===\n");
  }

  getState(): RankingState {
    return { ...this.state };
  }

  getCurrentRanking(): Coaster[] {
    const ranked = this.state.rankedCoasterIds
      .map((id) => this.allCoasters.find((c) => c.id === id))
      .filter((c) => c !== undefined) as Coaster[];

    const unranked = this.state.unrankedCoasters;

    return [...ranked, ...unranked];
  }

  getFinalRanking(): Coaster[] {
    if (!this.state.isComplete) return [];

    const finalCoasters = this.state.rankedCoasterIds
      .map((id) => {
        const coaster = this.allCoasters.find((c) => c.id === id);
        if (!coaster) {
          console.error(`Coaster with ID ${id} not found in allCoasters!`);
        }
        return coaster;
      })
      .filter((c) => c !== undefined) as Coaster[];

    return finalCoasters;
  }

  getLastComparison(): ComparisonResult | null {
    return this.state.lastComparison;
  }

  canUndo(): boolean {
    return this.stateHistory.length > 0;
  }

  undo(): void {
    if (!this.canUndo()) {
      throw new Error("No previous state to undo to");
    }

    console.log("=== UNDOING LAST COMPARISON ===");
    const previousState = this.stateHistory.pop()!;

    this.state = {
      ...previousState,
      comparisonResults: new Map(previousState.comparisonResults),
    };

    console.log("State restored to previous comparison");
    console.log(
      `Current ranking: ${this.state.rankedCoasterIds
        .map((id) => this.findCoasterById(id)?.name)
        .join(", ")}`,
    );
    console.log(
      `Unranked coasters: ${this.state.unrankedCoasters
        .map((c) => c.name)
        .join(", ")}`,
    );
    console.log("=== END UNDO ===\n");
  }

  private saveCurrentState(): void {
    this.stateHistory.push({
      rankedCoasterIds: [...this.state.rankedCoasterIds],
      comparisonResults: new Map(this.state.comparisonResults),
      unrankedCoasters: [...this.state.unrankedCoasters],
      currentComparison: this.state.currentComparison
        ? { ...this.state.currentComparison }
        : null,
      isComplete: this.state.isComplete,
      lastComparison: this.state.lastComparison
        ? { ...this.state.lastComparison }
        : null,
    });

    if (this.stateHistory.length > 50) {
      this.stateHistory.shift();
    }
  }

  private storeComparisonResult(
    coasterA: Coaster,
    coasterB: Coaster,
    winner: Coaster,
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

    const coasterAIsUnranked = this.state.unrankedCoasters.some(
      (c) => c.id === coasterA.id,
    );
    const coasterBIsUnranked = this.state.unrankedCoasters.some(
      (c) => c.id === coasterB.id,
    );

    if (coasterAIsUnranked && !coasterBIsUnranked) {
      this.tryToPlaceCoaster(coasterA);
    } else if (!coasterAIsUnranked && coasterBIsUnranked) {
      this.tryToPlaceCoaster(coasterB);
    }
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
    insertionIndex: number,
  ): void {
    console.log(`\n=== PLACING COASTER: ${coaster.name} ===`);
    console.log(`Inserting ${coaster.name} at position ${insertionIndex}`);

    this.state.rankedCoasterIds.splice(insertionIndex, 0, coaster.id);
    this.removeFromUnranked(coaster.id);

    console.log(`After placing ${coaster.name}:`);
    console.log(
      `  New ranking: ${this.state.rankedCoasterIds
        .map((id) => this.findCoasterById(id)?.name)
        .join(", ")}`,
    );
    console.log(
      `  Remaining unranked: ${this.state.unrankedCoasters
        .map((c) => c.name)
        .join(", ")}`,
    );
    console.log(`=== END PLACEMENT ===\n`);
  }

  private findInsertionPosition(newCoaster: Coaster): number {
    console.log(
      `\nFinding insertion position for ${newCoaster.name} using binary search`,
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
        `  Comparing ${newCoaster.name} vs ${midCoaster.name} (pos ${mid}) - result: ${comparisonResult}`,
      );

      if (!comparisonResult) {
        console.log(
          `  No comparison data between ${newCoaster.name} and ${midCoaster.name} - cannot place yet`,
        );
        return -1;
      }

      if (comparisonResult === newCoaster.id) {
        console.log(
          `  ${newCoaster.name} beats ${midCoaster.name} - searching positions 0 to ${mid}`,
        );
        right = mid;
      } else {
        console.log(
          `  ${midCoaster.name} beats ${
            newCoaster.name
          } - searching positions ${mid + 1} to ${right}`,
        );
        left = mid + 1;
      }
    }

    console.log(
      `Binary search complete - ${newCoaster.name} should be placed at position ${left}`,
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
        .join(", ")}`,
    );

    if (this.isRankingComplete()) {
      this.state.currentComparison = null;
      this.state.isComplete = true;
      return;
    }

    if (this.needsFirstComparison()) {
      this.setFirstComparison();
    } else {
      this.setBinarySearchComparison();
    }

    console.log(
      `Generated comparison: ${
        this.state.currentComparison
          ? `${this.state.currentComparison.coasterA.name} vs ${this.state.currentComparison.coasterB.name}`
          : "NONE"
      }`,
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
    const comparison = this.getNextBinarySearchComparison(nextCoaster);

    if (!comparison) {
      console.log(
        `No comparison needed for ${nextCoaster.name}, placing directly`,
      );
      const insertionIndex = this.findInsertionPosition(nextCoaster);
      if (insertionIndex !== -1) {
        this.placeCoasterInRanking(nextCoaster, insertionIndex);
        console.log(`Placed ${nextCoaster.name}, generating next comparison`);
        this.generateNextComparison();
      } else {
        console.log(
          `ERROR: Cannot place ${nextCoaster.name} - this should not happen`,
        );
      }
    } else {
      this.state.currentComparison = comparison;
      console.log(
        `Set comparison: ${comparison.coasterA.name} vs ${comparison.coasterB.name}`,
      );
    }
  }

  private getNextBinarySearchComparison(
    newCoaster: Coaster,
  ): RankingComparison | null {
    console.log(`\n=== Comparing ${newCoaster.name} ===`);
    let left = 0;
    let right = this.state.rankedCoasterIds.length;

    while (left < right) {
      const mid = this.calculateMiddleIndex(left, right);
      const midCoasterId = this.state.rankedCoasterIds[mid];
      const midCoaster = this.findCoasterById(midCoasterId)!;

      console.log(`  Checking mid position ${mid}: ${midCoaster.name}`);
      const existingResult = this.getComparisonResult(newCoaster, midCoaster);
      console.log(`  Existing result: ${existingResult}`);

      if (!existingResult) {
        console.log(
          `  FOUND NEEDED COMPARISON: ${newCoaster.name} vs ${midCoaster.name}`,
        );
        return { coasterA: newCoaster, coasterB: midCoaster };
      }

      if (existingResult === newCoaster.id) {
        console.log(
          `  ${newCoaster.name} beats ${midCoaster.name} - searching left half`,
        );
        right = mid;
      } else {
        console.log(
          `  ${midCoaster.name} beats ${newCoaster.name} - searching right half`,
        );
        left = mid + 1;
      }
      console.log(`  New search range: ${left} to ${right}`);
    }

    console.log(`  Binary search complete - all comparisons exist`);
    console.log(`=== END BINARY SEARCH COMPARISON FINDER ===\n`);
    return null;
  }

  private calculateMiddleIndex(left: number, right: number): number {
    return Math.floor((left + right) / 2);
  }

  private getWinnerFromComparison(
    coasterA: Coaster,
    coasterB: Coaster,
  ): Coaster {
    const aPosition = coasterA.rankPosition;
    const bPosition = coasterB.rankPosition;

    if (aPosition !== undefined && bPosition !== undefined) {
      return aPosition < bPosition ? coasterA : coasterB;
    }

    console.warn("getWinnerFromComparison called with non-ranked coasters");
    return coasterA;
  }

  private getComparisonResult(
    coasterA: Coaster,
    coasterB: Coaster,
  ): string | null {
    const comparisonKey = this.getComparisonKey(coasterA, coasterB);
    const storedResult = this.state.comparisonResults.get(comparisonKey);
    if (storedResult) {
      return storedResult;
    }

    const aPosition = coasterA.rankPosition;
    const bPosition = coasterB.rankPosition;

    if (aPosition !== undefined && bPosition !== undefined) {
      return aPosition < bPosition ? coasterA.id : coasterB.id;
    }

    return null;
  }

  private findCoasterById(id: string): Coaster | undefined {
    return this.allCoasters.find((c) => c.id === id);
  }

  private removeFromUnranked(coasterId: string): void {
    this.state.unrankedCoasters = this.state.unrankedCoasters.filter(
      (c) => c.id !== coasterId,
    );
  }

  private getComparisonKey(coasterA: Coaster, coasterB: Coaster): string {
    return coasterA.id < coasterB.id
      ? `${coasterA.id}-${coasterB.id}`
      : `${coasterB.id}-${coasterA.id}`;
  }
}
