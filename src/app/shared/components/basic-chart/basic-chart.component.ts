import { AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'cost-tracker-basic-chart',
  templateUrl: './basic-chart.component.html',
  styleUrls: ['./basic-chart.component.scss']
})
export class BasicChartComponent implements OnInit, AfterViewInit, OnChanges {

  /**
   * Chart tipusa
   */
  @Input()
  type!: string;

  /**
   * Chart azonosítója
   */
  @Input()
  chartId!: string;

  /**
   * Charton megjelenő adatok
   */
  @Input()
  seriesData: any[] = [];

  /**
   * X tengelyen lévő címkék
   */
  @Input()
  xAxisData: string[] = [];

  /**
   * Chart címe
   */
  @Input()
  title!: string;

  /**
   * Inicializáláshoz szükséges chart
   */
  private chart!: echarts.ECharts;

  constructor(
    private elementRef: ElementRef
  ) { }

  /**
   * Chart adatok beállítása és visszaadása
   * 
   * @returns chart adatok
   */
  getSeries() {
    let series: any = {
      type: this.type,
      data: this.seriesData
    };

    if (this.type == "bar") {
      series["showBackground"] = true;
      series["backgroundStyle"] = {
        color: 'rgba(220, 220, 220, 0.8)'
      };
    }

    return series;
  }

  /**
   * Chart inicializálása
   */
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
