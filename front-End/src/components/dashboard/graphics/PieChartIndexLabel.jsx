import CanvasJSReact from '@canvasjs/react-charts'

const CanvasJSChart = CanvasJSReact.CanvasJSChart

export const PieChartIndexLabel = ({ title }) => {
  const options = {
    animationEnabled: true,
    title: {
      text: title
    },
    data: [{
      type: 'pie',
      showInLegend: true,
      legendText: '{label}',
      toolTipContent: '{label}: <strong>{y}%</strong>',
      indexLabel: '{y}%',
      indexLabelPlacement: 'inside',
      dataPoints: [
        { y: 32, label: 'Health' },
        { y: 22, label: 'Finance' },
        { y: 15, label: 'Education' },
        { y: 19, label: 'Career' },
        { y: 5, label: 'Family' },
        { y: 7, label: 'Real Estate' }
      ]
    }]
  }

  return (
    <div>
      <CanvasJSChart options={options} />
    </div>
  )
}
