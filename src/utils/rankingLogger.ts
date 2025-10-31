/**
 * Ranking Logger - Debug utility for tracking ranking operations
 */
import { Coaster } from '../types/data'

interface ComparisonData {
  comparisonNumber: number
  coaster1: Coaster
  coaster2: Coaster
  comparisonKey: string
  loser: Coaster
  winner: Coaster
}

interface PositionUpdateData {
  coasterNames: Record<string, string>
  loser: Coaster
  loserPosition: number
  newRankingOrder: string[]
  newWinnerPosition: number
  oldWinnerPosition: number
  winner: Coaster
}

interface RankingStateData {
  rankings: Array<{ name: string; park: string; position?: number }>
}

interface InitializationData {
  initialRanking: string[]
  mode: string
  newCoastersCount: number
  preRankedCount: number
  totalCoasters: number
  totalComparisons: number
}

type LogData =
  | ComparisonData
  | PositionUpdateData
  | RankingStateData
  | InitializationData

export interface RankingLog {
  data: LogData
  timestamp: number
  type: 'comparison' | 'position_update' | 'ranking_state' | 'initialization'
}

class RankingLogger {
  private logs: RankingLog[] = []
  private isEnabled = true

  enable() {
    this.isEnabled = true
  }

  disable() {
    this.isEnabled = false
  }

  log(type: RankingLog['type'], data: LogData) {
    if (!this.isEnabled) return

    const log: RankingLog = {
      timestamp: Date.now(),
      type,
      data,
    }

    this.logs.push(log)

    // Console output for immediate visibility
    switch (type) {
      case 'comparison': {
        const compData = data as ComparisonData
        console.group(
          `🏎️ Comparison #${compData.comparisonNumber}: ${compData.coaster1?.name} vs ${compData.coaster2?.name}`
        )
        console.log(
          `Parks: ${compData.coaster1?.park} vs ${compData.coaster2?.park}`
        )
        console.log(
          `Winner: ${compData.winner?.name} (${compData.winner?.park})`
        )
        console.log(`Loser: ${compData.loser?.name} (${compData.loser?.park})`)
        console.log(`Comparison Key: ${compData.comparisonKey}`)
        console.groupEnd()
        break
      }

      case 'position_update': {
        const posData = data as PositionUpdateData
        console.group(`📊 Position Update`)
        console.log(
          `Winner: ${posData.winner?.name} moved from position ${posData.oldWinnerPosition} to ${posData.newWinnerPosition}`
        )
        console.log(
          `Loser: ${posData.loser?.name} stayed at position ${posData.loserPosition}`
        )
        console.log(
          'Updated ranking order:',
          posData.newRankingOrder.map(
            (id: string, index: number) =>
              `${index + 1}. ${posData.coasterNames[id] || id}`
          )
        )
        console.groupEnd()
        break
      }

      case 'ranking_state': {
        const stateData = data as RankingStateData
        console.group(`🎯 Current Ranking State (Position-Based)`)
        console.log('Current rankings by POSITION:')
        stateData.rankings.forEach((coaster, index: number) => {
          const position = coaster.position || index + 1
          console.log(
            `${position}. ${coaster.name} (${coaster.park}) - Position: ${position}`
          )
        })
        console.groupEnd()
        break
      }

      case 'initialization': {
        const initData = data as InitializationData
        console.group(`🚀 Ranking Initialization`)
        console.log(`Mode: ${initData.mode}`)
        console.log(`Total coasters: ${initData.totalCoasters}`)
        console.log(`Pre-ranked coasters: ${initData.preRankedCount}`)
        console.log(`New coasters: ${initData.newCoastersCount}`)
        console.log(`Total comparisons needed: ${initData.totalComparisons}`)
        console.log('Initial ranking order:', initData.initialRanking)
        console.groupEnd()
        break
      }
    }
  }

  logComparison(
    comparisonNumber: number,
    coaster1: Coaster,
    coaster2: Coaster,
    winner: Coaster,
    loser: Coaster,
    comparisonKey: string
  ) {
    this.log('comparison', {
      comparisonNumber,
      coaster1,
      coaster2,
      winner,
      loser,
      comparisonKey,
    })
  }

  logPositionUpdate(
    winner: Coaster,
    loser: Coaster,
    oldWinnerPosition: number,
    newWinnerPosition: number,
    loserPosition: number,
    newRankingOrder: string[],
    coasterNames: Record<string, string>
  ) {
    this.log('position_update', {
      winner,
      loser,
      oldWinnerPosition,
      newWinnerPosition,
      loserPosition,
      newRankingOrder,
      coasterNames,
    })
  }

  logRankingState(
    rankings: Array<{ name: string; park: string; position?: number }>
  ) {
    this.log('ranking_state', { rankings })
  }

  logInitialization(
    mode: string,
    totalCoasters: number,
    preRankedCount: number,
    newCoastersCount: number,
    totalComparisons: number,
    initialRanking: string[]
  ) {
    this.log('initialization', {
      mode,
      totalCoasters,
      preRankedCount,
      newCoastersCount,
      totalComparisons,
      initialRanking,
    })
  }

  getLogs(): RankingLog[] {
    return [...this.logs]
  }

  clearLogs() {
    this.logs = []
  }

  exportLogs(): string {
    return JSON.stringify(this.logs, null, 2)
  }
}

export const rankingLogger = new RankingLogger()
