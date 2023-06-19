export class InaRadarChart {


    private ChartConfig:any= {
        height:500
        , width:600
        , circleColor: "rgba(143, 134, 134, .1)"
        , circleBorderColor: "rgba(143, 134, 134, .2)"
        , circleIntercalColor: true
        , circlesAmount: 5
        , maxQualif: 5
        , cX: 300
        , cY: 200
        , cXlabelOffSet: 20
        , cYlabelOffSet: 20
        , arrCategoriesAndValues: [
            {
                pointColor: "rgb(11, 116, 11)"
                , lineColor: "rgba(11, 116, 11,.5)"
                , labelColor: "#000"
                , Values: [
                    { CategoryName: "Futboll", Value: 5 },
                    { CategoryName: "Baseboll", Value: 4.5 },
                    { CategoryName: "Soccer", Value: 2 },
                    { CategoryName: "Boleiboll", Value: 4 },
                    { CategoryName: "Box", Value: 3 }
                ]

            }
            ,
            {
                pointColor: "rgb(5, 5, 5)"
                , labelColor: "red"
                , lineColor: "rgba(5, 5, 5,.5)"
                , Values: [
                    { CategoryName: "/ Canto", Value: 1 },
                    { CategoryName: "/ Danza", Value: 5 },
                    { CategoryName: "/ Music", Value: 1 },
                    { CategoryName: "/ Pintura", Value: 3 },
                    { CategoryName: "/ Lectura", Value: 2 }
                ]

            }
        ]
    };

     /* Constanst - configuration*/
     private radio = 150;       
     private angleMeasure = 0;
     private arrAngles:any = [];

     /* htmlGenerated */
     private gCirclesHTML = "";
     private gPointsHTML = "";
     private gAxiesHTML = "";
     private gPointLinesHTML = "";
     private gCategoryLabelsHTML = "";
     
     /* Regarding the number of values/sides calculate  angles */
     private calcAngles() {

        this.arrAngles = [];
        this.arrAngles.push(Math.PI * 1.5);

        var angleStart = this.arrAngles[0];
        var arrCategoryAndValues = this.ChartConfig.arrCategoriesAndValues[0].Values;

        for (var idx = 1; idx < arrCategoryAndValues.length; idx++) {

            if ((angleStart + (this.angleMeasure * idx)) > Math.PI * 2) {
                this.arrAngles.push((angleStart + (this.angleMeasure * idx)) - (Math.PI * 2));
            } else {
                this.arrAngles.push((angleStart + (this.angleMeasure * idx)));
            }
        }
    }

    /* Add circles with its formatting */
    private addCircles() {

        var radioIncrement =this.radio / this.ChartConfig.circlesAmount;
        var valueIncrement = this.ChartConfig.maxQualif / this.ChartConfig.circlesAmount;
        var htmlTemp = "";
        for (var idx = this.ChartConfig.circlesAmount; idx >= 1; idx--) {
            if ((idx % 2 == 1) && this.ChartConfig.circleIntercalColor) {
                htmlTemp += "<circle cx='" + this.ChartConfig.cX + "' cy='" + this.ChartConfig.cY + "' r='" + (radioIncrement * idx) + "' fill='#FFF' stroke='" + this.ChartConfig.circleBorderColor + "' strokeWidth='1' ></circle>";
            }
            else {
                htmlTemp += "<circle cx='" + this.ChartConfig.cX + "' cy='" + this.ChartConfig.cY + "' r='" + (radioIncrement * idx) + "' fill='" + this.ChartConfig.circleColor + "' stroke='" + this.ChartConfig.circleBorderColor + "' strokeWidth='1' ></circle>";
            }

            htmlTemp += "<text font-size='smaller' x='" + (this.ChartConfig.cX + 5) + "' y='" + (this.ChartConfig.cY - (radioIncrement * idx)) + "'   > " + Math.round(valueIncrement * idx) + " </text>";
        }
        this.gCirclesHTML = htmlTemp;
    }

    /* Add points with its formatting */
    private addPoints(categories:any, position:number) {

        var arrCategoryAndValues = categories[position].Values;

        var htmlTemp = "";
        for (var idx = 0; idx < arrCategoryAndValues.length; idx++) {

            var _cx = this.ChartConfig.cX + Math.cos(this.arrAngles[idx]) *this.radio * (arrCategoryAndValues[idx].Value / this.ChartConfig.maxQualif);
            var _cy = this.ChartConfig.cY + Math.sin(this.arrAngles[idx]) *this.radio * (arrCategoryAndValues[idx].Value / this.ChartConfig.maxQualif);
            htmlTemp += "<circle cx='" + _cx + "' cy='" + _cy + "' r='5' fill='" + categories[position].pointColor + "'> <title>" + arrCategoryAndValues[idx].Value + "</title> </circle> ";

        }
        this.gPointsHTML+=htmlTemp;        
    }

    /* Add axis regarding number of angles */
    private addAxies() {
        var htmlTemp = "";
        for (var idx = 0; idx < this.arrAngles.length; idx++) {

            var _cx = this.ChartConfig.cX + Math.cos(this.arrAngles[idx]) *this.radio;
            var _cy = this.ChartConfig.cY + Math.sin(this.arrAngles[idx]) *this.radio;
            htmlTemp += "<polyline points='" + this.ChartConfig.cX + "," + this.ChartConfig.cY + " " + _cx + "," + _cy + "' style='fill:none;stroke:#a1a1aa;stroke-width:1' /> ";
        }
        this.gAxiesHTML = htmlTemp;        
    }

    /* Add lines connected between points */
    private addPointLines(categories:any, position:number) {
        var arrCategoryAndValues = categories[position].Values;

        var arrPoints = [];
        for (var idx1 = 0; idx1 < arrCategoryAndValues.length; idx1++) {
            var _cx = this.ChartConfig.cX + Math.cos(this.arrAngles[idx1]) *this.radio * (arrCategoryAndValues[idx1].Value / this.ChartConfig.maxQualif);
            var _cy = this.ChartConfig.cY + Math.sin(this.arrAngles[idx1]) *this.radio * (arrCategoryAndValues[idx1].Value / this.ChartConfig.maxQualif);
            arrPoints.push({ x: _cx, y: _cy });
        }
        arrPoints.push({ x: arrPoints[0].x, y: arrPoints[0].y });

        var htmlTemp = "";
        for (var idx2 = 1; idx2 < arrPoints.length; idx2++) {
            var tempPoints = arrPoints[idx2 - 1].x + "," + arrPoints[idx2 - 1].y + " " + arrPoints[idx2].x + "," + arrPoints[idx2].y;
            htmlTemp += "<polyline points='" + tempPoints + "' fill='none' stroke='" + categories[position].lineColor + "' style='stroke-width:2' /> ";
        }
        this.gPointLinesHTML+=htmlTemp;        
    }

     /* Add labels with category name */
    private addCategoryLabels(categories:any, position:number) {

        var arrCategoryAndValues = categories[position].Values;

        var htmlTemp = "";
        for (var idx = 0; idx < arrCategoryAndValues.length; idx++) {
            var angleCos = Math.cos(this.arrAngles[idx]);
            var angleSin = Math.sin(this.arrAngles[idx]);
            var textAnchor = "start";
            var cxlabelOffSetSign = +1;
            var cylabelOffSetSign = +1;
            if (angleCos < 0) {
                textAnchor = "end";
                cxlabelOffSetSign = -1;
            }

            if (angleSin < 0) {
                cylabelOffSetSign = -1;
            }

            var _cx = this.ChartConfig.cX + angleCos *this.radio;
            var _cy = this.ChartConfig.cY + angleSin *this.radio;
            var _dx = this.ChartConfig.cXlabelOffSet * cxlabelOffSetSign;
            var _dy = this.ChartConfig.cYlabelOffSet * cylabelOffSetSign;
            _dx += 15 * position;
            _dy += 15 * position;
            htmlTemp += "<text  x='" + _cx + "' y='" + _cy + "'   dx='" + _dx + "' dy='" + _dy + "'  text-anchor='" + textAnchor + "' fill='" + categories[position].labelColor + "'>" + arrCategoryAndValues[idx].CategoryName + "</text>";
        }       

        this.gCategoryLabelsHTML += htmlTemp;
    }

    /* Draw chart using configuration indicated by parameter, if parameter is empty a default chart is render*/
    private _Draw(configuration:string) {   
        
        if((configuration || "") != "" ){
            this.ChartConfig=configuration;
        }
        else{
            alert("Missing chart configuration, a default chart will be rendered");
        }
        
        if (this.ChartConfig.maxQualif == null) {
            var arrTempValues:any=[];
            this.ChartConfig.arrCategoriesAndValues.forEach((element:any) => {
                arrTempValues.push(Math.max(...element.Values.map((x:any)=> x.Value)));                    
            });
            this.ChartConfig.maxQualif = Math.max(...arrTempValues);
        }
        
        this.addCircles();
        this.calcAngles();
        this.addAxies();

        for (var idx = 0; idx < this.ChartConfig.arrCategoriesAndValues.length; idx++) {
            this.addCategoryLabels(this.ChartConfig.arrCategoriesAndValues, idx);
            this.addPointLines(this.ChartConfig.arrCategoriesAndValues, idx);
            this.addPoints(this.ChartConfig.arrCategoriesAndValues, idx);
        }

    }

    /* Draw chart using configuration indicated by parameter, if parameter is empty a default chart is render*/
    public Draw(configuration:string){

        try{
            let configurationJSON = JSON.parse(configuration);
       
            this.angleMeasure = Math.PI * 2 / this.ChartConfig.arrCategoriesAndValues[0].Values.length;
            this._Draw(configurationJSON);
               
            return `<svg id='svgInavantRadarChart' xmlns='http://www.w3.org/2000/svg' height='${this.ChartConfig.height}' width='${this.ChartConfig.width}'>
            <g id='gCircles'>${this.gCirclesHTML}</g>
            <g id='gCategoryLabels'>${this.gCategoryLabelsHTML}</g>
            <g id='gAxies'>${this.gAxiesHTML}</g>
            <g id='gPointLines'>${this.gPointLinesHTML}</g>                  
            <g id='gPoints'>${this.gPointsHTML}</g>    
            </svg>`;

        }catch(e){
            return `<p>InRadarChart-error:${e}</p>`;
        }             
    }


}