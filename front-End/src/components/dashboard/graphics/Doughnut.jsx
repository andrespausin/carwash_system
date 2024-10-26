import CanvasJSReact from '@canvasjs/react-charts'
import { useDonutOptions } from '../../../hooks/graphics/useDonutOptions'
import { Stack } from '@chakra-ui/react'

const CanvasJSChart = CanvasJSReact.CanvasJSChart

export const Doughnut = ({ title, subtitle }) => {
  const { donutOptions } = useDonutOptions()
  console.log(donutOptions)
  return (
    <Stack>
      <CanvasJSChart options={donutOptions} />
    </Stack>
  )
}
