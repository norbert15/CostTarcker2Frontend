import { Component, Input } from '@angular/core';
import { RecordType, RecorsdWithCategoryType } from 'src/app/shared/models/record.model';
import { ChartOptionDataType, DefaultChartOptionType } from '../../models/chart.model';
import { DsMonthsService } from '../../services/ds-months.service';
import { FetchChartDataService } from '../../services/fetch-chart-data.service';

@Component({
  selector: 'cost-tracker-dashboard-charts',
  templateUrl: './dashboard-charts.component.html',
  styleUrls: ['./dashboard-charts.component.scss']
})
export class DashboardChartsComponent {

  @Input() set costWithCategories(costWithCategories: RecorsdWithCategoryType[]) {
    [
      this.monthlyBarChartOptions[0].options.seriesData, 
      this.monthlyBarChartOptions[0].options.xAxis
    ] = this.fetchChartDataService.fetchMonthlyChartData(costWithCategories);
  }

  @Input() set incomesWithCategories(incomesWithCategories: RecorsdWithCategoryType[]) {
    [
      this.monthlyBarChartOptions[1].options.seriesData, 
      this.monthlyBarChartOptions[1].options.xAxis
    ] = this.fetchChartDataService.fetchMonthlyChartData(incomesWithCategories);
  }

  @Input() set activeYearCost(costRecords: RecordType[]) {
    [
      this.yearlyBarChartOptions[0].options.seriesData, 
      this.yearlyBarChartOptions[0].options.xAxis
    ] = this.fetchChartDataService.fetchYearlyChartData(costRecords);
  }

  @Input() set activeYearIncome(incomeRecords: RecordType[]) {
    [
      this.yearlyBarChartOptions[1].options.seriesData, 
      this.yearlyBarChartOptions[1].options.xAxis
    ] = this.fetchChartDataService.fetchYearlyChartData(incomeRecords);
  }

  /**
   * Havi kimutatásokhoz szükséges chartok adatai
   */
  monthlyBarChartOptions: ChartOptionDataType[] = [
    {
      id: "monthly-cost-bar-chart",
      name: "Havi (kiadás) kimutatás",
      options: {
        seriesData: [],
        xAxis: []
      },
      type: "bar",
      record: "Kiadás"
    },
    {
      id: "monthly-income-bar-chart",
      name: "Havi (kiadás) bevétel",
      options: {
        seriesData: [],
        xAxis: []
      },
      type: "bar",
      record: "Bevétel"
    },
  ];

 /**
   * Havi kimutatásokhoz szükséges chartok adatai
   */
 yearlyBarChartOptions: ChartOptionDataType[] = [
  {
    id: "yearly-cost-bar-chart",
    name: "Éves (kiadás) kimutatás",
    options: {
      seriesData: [],
      xAxis: []
    },
    type: "bar",
    record: "Kiadás"
  },
  {
    id: "yearly-income-bar-chart",
    name: "Éves (bevétel) kimutatás",
    options: {
      seriesData: [],
      xAxis: []
    },
    type: "bar",
    record: "Bevétel"
  }
];

  constructor(
    private fetchChartDataService: FetchChartDataService,
    public dsService: DsMonthsService) {}
}
