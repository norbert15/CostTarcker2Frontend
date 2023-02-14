export interface ChartOptionDataType {
    options: DefaultChartOptionType;
    name: string;
    id: string;
    type: string;
    record: string;
}

export interface DefaultChartOptionType {
    seriesData: SeriesType[];
    xAxis: string[];
}

export interface SeriesType {
    itemStyle: {
        color: string;
    },
    value?: number;
    data?: number[];
    stack?: string;
    type?: string;
}