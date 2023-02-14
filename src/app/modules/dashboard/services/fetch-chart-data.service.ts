import { Injectable } from '@angular/core';
import { MONTH_COLORS_IN_HEX, MONTH_NAMES } from 'src/app/shared/commons/enums';
import { RecordType, RecorsdWithCategoryType } from 'src/app/shared/models/record.model';
import { SeriesType } from '../models/chart.model';
import { DsMonthsService } from './ds-months.service';

@Injectable({
  providedIn: 'root'
})
export class FetchChartDataService {

  constructor(private dsService: DsMonthsService) { }

  fetchMonthlyChartData(chartData: RecorsdWithCategoryType[]) {
    const seriesData: any[] = [];
    const xAxisData: string[] = [];

    chartData.forEach((data: RecorsdWithCategoryType) => {
      xAxisData.push(data.category.name);
      seriesData.push({
        value: data.sum,
        itemStyle: {
          color: data.category.color
        }
      });
    })

    return [seriesData, xAxisData];
  }

  fetchYearlyChartData(chartData: RecordType[]) {
    const seriesData: any[] = [];
    const xAxisData: string[] = [];

    chartData.forEach((data: RecordType) => {
      let periods = data.month.split("-");
      if (this.dsService.getActiveMonths().includes(MONTH_NAMES[+periods[1] - 1])) {
        xAxisData.push(MONTH_NAMES[+periods[1] - 1])
        seriesData.push({
          value: data.value,
          itemStyle: {
            color: MONTH_COLORS_IN_HEX[+periods[1] - 1]
          }
        });
      }
    })

    return [seriesData, xAxisData];
  }
}
