import { AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'cost-tracker-basic-chart',
  templateUrl: './basic-chart.component.html',
  styleUrls: ['./basic-chart.component.scss']
})
export class BasicChartComponent implements OnInit, AfterViewInit, OnChanges {

  @Input()
  type!: string;

  @Input()
  chartId!: string;

  @Input()
  seriesData: any[] = [];

  @Input()
  xAxisData: string[] = [];

  @Input()
  title!: string;

  private chart!: echarts.ECharts;

  constructor(
    private elementRef: ElementRef
  ) { }

  getSeries() {
    let series: any = {};

    if (this.type == "bar") {
      series["type"] = this.type;
      series["data"] = this.seriesData;
      series["showBackground"] = true;
      series["backgroundStyle"] = {
        color: 'rgba(220, 220, 220, 0.8)'
      };
    } else {
      series = this.seriesData;
    }

    return series;
  }

  initChart(): void {
    if (this.chart) this.chart.clear();

    const container: HTMLDivElement = this.elementRef.nativeElement.querySelector("#" + this.chartId);

    if (container && this.seriesData.length && this.xAxisData.length) {
      const chart = echarts.init(container);
      const chartOption: echarts.EChartsOption = {
        xAxis: {
          type: 'category', 
          data: this.xAxisData,
        },
        yAxis: {
          
        },
        tooltip: {
          trigger: 'item'
        },
        series: this.getSeries()
      };

      chart.setOption(chartOption);
      this.chart = chart;
      this.onResize();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (this.chart) this.chart.resize();
  }

  ngOnInit(): void {
    this.onResize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initChart();
  }

  ngAfterViewInit(): void {
    this.initChart();
    this.onResize();

    this.elementRef.nativeElement.ownerDocument.querySelector("#toggleSidebar")
      .addEventListener("click", () => {
        setTimeout(() => {
          this.onResize();
        }, 500);
      });
  }
}
