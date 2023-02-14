import { AfterViewInit, Component, ElementRef, Input, ChangeDetectorRef } from '@angular/core';
import { RecorsdWithCategoryType } from 'src/app/shared/models/record.model';
import * as echarts from 'echarts';


@Component({
  selector: 'cost-tracker-record-pipechart',
  templateUrl: './record-pipechart.component.html',
  styleUrls: ['./record-pipechart.component.scss']
})
export class RecordPipechartComponent implements AfterViewInit {

  @Input() set setChartData(data: RecorsdWithCategoryType[]) {
    this.getChartData(data);
    this.initChart();
  }

  @Input() set setSum(sum: number) {
    this.sum = sum;
  }

  sum: number = 0;

  colors: string[] = [];

  chart!: echarts.ECharts;

  chartData: any[] = [];

  constructor(private elementRef: ElementRef, private changeDec: ChangeDetectorRef) {
  }

  getChartData(data: RecorsdWithCategoryType[]) {
    this.chartData = [];
    this.colors = [];

    data.forEach(d => {
      this.colors.push(d.category.color);
      this.chartData.push(
        {
          value: d.sum,
          name: d.category.name
        }
      )
    })
  }

  initChart(): void {
    const container: HTMLDivElement = this.elementRef.nativeElement.querySelector('#pie-chart');

    if (this.chart) this.chart.clear();

    if (container) {
      const chart = echarts.init(container);

      let chartOption: echarts.EChartsOption = {
        title: {
          text: this.sum.toLocaleString() + ' Ft.',
          left: 'center',
          top: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        color: this.colors,
        series: [
          {
            type: 'pie',
            data: this.chartData,
            radius: ['40%', '70%'],
            emphasis: {
              label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
              }
            },
          }
        ]
      };

      chart.setOption(chartOption);
      this.chart = chart;
    }
  }

  ngAfterViewInit(): void {
    this.changeDec.detectChanges();
  }
}