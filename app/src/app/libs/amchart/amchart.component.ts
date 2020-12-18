import { Input, OnInit, Component, ElementRef, ViewEncapsulation } from '@angular/core';

import * as amcore from '@amcharts/amcharts4/core';
import * as amcharts from '@amcharts/amcharts4/charts';
import amthemes_animated from '@amcharts/amcharts4/themes/animated';
amcore.useTheme(amthemes_animated);

@Component({
    selector: 'amchart',
    styleUrls: ['./amchart.component.scss'],
    templateUrl: './amchart.component.html',
    encapsulation: ViewEncapsulation.None
})

export class AmchartComponent implements OnInit {

    @Input('id') public id: string;
    @Input('data') public data: any[] = [];

    constructor(private el: ElementRef) {
        this.element = this.el.nativeElement;
    };

    public chart: amcharts.XYChart;
    public element: HTMLElement;

    ngOnInit(): void {
        this.element.id = this.id;
        this.chart = amcore.create(this.id, amcharts.XYChart);
        this.chart.data = this.data;
        this.chart.cursor = new amcharts.XYCursor();
        this.chart.logo.height = -15;
        this.chart.marginBottom = 0;
        this.chart.paddingBottom = 0;
        this.chart.dateFormatter.inputDateFormat = 'yyyy-MM-dd HH:mm';
        
        this.chart.xAxes.push(new amcharts.DateAxis());
        const valueAxis = this.chart.yAxes.push(new amcharts.ValueAxis());
        valueAxis.title.text = 'ms';
        valueAxis.renderer.inversed = true;

        let series = this.chart.series.push(new amcharts.LineSeries());
        series.tooltipText = '{value}ms';
        series.strokeWidth = 2;
        series.dataFields.dateX = 'date';
        series.dataFields.valueY = 'value';
        series.minBulletDistance = 15;
    };

}