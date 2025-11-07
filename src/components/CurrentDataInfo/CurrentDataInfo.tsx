import { Link, Text } from '../'
import * as Styled from './CurrentDataInfo.styled'

interface CurrentDataInfoProps {
  coasterCount: number
}

export default function CurrentDataInfo({
  coasterCount,
}: CurrentDataInfoProps) {
  return (
    <Styled.CurrentDataInfo>
      <Text as='p'>
        You currently have <Text bold>{coasterCount} coasters</Text> in your
        collection.
      </Text>
      <Link href='/view-coasters' variant='button'>
        View all coasters
      </Link>
    </Styled.CurrentDataInfo>
  )
}
