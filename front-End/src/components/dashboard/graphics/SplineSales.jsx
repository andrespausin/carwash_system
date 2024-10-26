import React from 'react'
import CanvasJSReact from '@canvasjs/react-charts'
import { useSplineSalesOptions } from '../../../hooks/graphics/useSplineSalesOptions'
import { Stack } from '@chakra-ui/react'
const CanvasJSChart = CanvasJSReact.CanvasJSChart
const SplineSales = () => {
  const { splineOptions } = useSplineSalesOptions()
  console.log(splineOptions)

  return (
    <Stack w='100%'>
      <CanvasJSChart options={splineOptions} />
    </Stack>

  )
}

export default SplineSales
