import { AfterViewInit, Component, ElementRef, Input, ChangeDetectorRef } from '@angular/core';
import { RecorsdWithCategoryType } from 'src/app/shared/models/record.model';
import * as echarts from 'echarts';


@Component({
  selector: 'cost-tracker-record-pipechart',
  templateUrl: './record-pipechart.component.html',
  styleUrls: ['./record-pipechart.component.scss']
})
export class RecordPipechartComponent {

  /**
   * Chart adatok beállítása
   */
  @Input() set setChartData(data: RecorsdWithCategoryType[]) {
    this.setChartSeriesDataAndColors(data);
    this.initChart();
  }

  /**
   * Chart adatok összegének beállítása
   */
  @Input() set setSum(sum: number) {
    this.sum = sum;
  }

  /**
   * Chart adatok összege
   */
  sum: number = 0;

  /**
   * Chart-hoz szükséges színek
   */
  colors: string[] = [];

  /**
   * Chart
   */
  chart!: echarts.ECharts;

  /**
   * Chart adatok listája
   */
  chartData: any[] = [];

  constructor(
    private elementRef: ElementRef, 
    private changeDec: ChangeDetectorRef
  ) { }

  /**
   * Chart-hoz szükséges adatok, színek beállítása
   * 
   * @param {RecorsdWithCategoryType[]} data chart adatok
   */
  setChartSeriesDataAndColors(records: RecorsdWithCategoryType[]): void {
    this.chartData = [];
    this.colors = [];

    records.forEach((data: RecorsdWithCategoryType) => {
      this.colors.push(data.category.color);
      this.chartData.push(
        {
          value: data.sum,
          name: data.category.name
        }
      )
    })
  }

  /**
   * Chart inicializálása
   */
  initChart(): void {
    const container: HTMLDivElement = this.elementRef.nativeElement.querySelector('#pie-chart');

    if (this.chart) {
      this.chart.clear();
    }

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
}