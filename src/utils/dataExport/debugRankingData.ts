import { UploadedData } from '../../types/data'
import { addRankingToCoasterData } from '../dataExport/cleanCoasterData'

/**
 * Debug utility to show what ranking data is available in uploaded data
 * Helps troubleshoot ranking export issues
 */
export function debugRankingData(uploadedData: UploadedData | null) {
  if (!uploadedData) {
    console.log('❌ No uploaded data available')
    return
  }

  console.log('🔍 Ranking Data Debug:')

  // Check individual coaster rankPosition values
  const coastersWithRankPosition = uploadedData.coasters.filter(
    c => c.rankPosition !== undefined && c.rankPosition > 0
  )
  console.log(
    `📊 Coasters with rankPosition: ${coastersWithRankPosition.length}/${uploadedData.coasters.length}`
  )

  if (coastersWithRankPosition.length > 0) {
    console.log('   Individual rankPosition values:')
    coastersWithRankPosition
      .sort((a, b) => (a.rankPosition || 0) - (b.rankPosition || 0))
      .forEach(c => {
        console.log(`   ${c.rankPosition}: ${c.name}`)
      })
  }

  // Check ranking metadata
  if (uploadedData.rankingMetadata) {
    const metadata = uploadedData.rankingMetadata
    console.log(`🎯 Ranking metadata exists:`)
    console.log(`   isRanked: ${metadata.isRanked}`)
    console.log(
      `   rankedCoasters: ${metadata.rankedCoasters?.length || 0} items`
    )

    if (metadata.rankedCoasters && metadata.rankedCoasters.length > 0) {
      console.log('   Ranked order (from metadata):')
      metadata.rankedCoasters.forEach((id, index) => {
        const coaster = uploadedData.coasters.find(c => c.id === id)
        console.log(`   ${index + 1}: ${coaster?.name || 'Unknown'} (${id})`)
      })
    }
  } else {
    console.log('❌ No ranking metadata found')
  }

  // Test ranking export
  console.log('🚀 Testing ranking export:')
  const testExport = addRankingToCoasterData(
    uploadedData.coasters,
    uploadedData.rankingMetadata
  )

  const coastersWithRank = testExport.filter(c => c.rank !== undefined)
  console.log(
    `✅ Coasters that would have rank in export: ${coastersWithRank.length}`
  )

  if (coastersWithRank.length > 0) {
    coastersWithRank
      .sort((a, b) => (a.rank || 0) - (b.rank || 0))
      .forEach(c => {
        console.log(`   ${c.rank}: ${c.name}`)
      })
  }
}

/**
 * Quick check to see if ranking data is available for export
 */
export function hasRankingDataForExport(
  uploadedData: UploadedData | null
): boolean {
  if (!uploadedData) return false

  const hasIndividualRanks = uploadedData.coasters.some(
    c => c.rankPosition !== undefined && c.rankPosition > 0
  )

  const hasMetadataRanks = !!(
    uploadedData.rankingMetadata?.isRanked &&
    uploadedData.rankingMetadata?.rankedCoasters?.length > 0
  )

  return hasIndividualRanks || hasMetadataRanks
}
