# InaRadarChart
Power apps custom code control that inserts a Radar Chart on canvas app
## How to Install?

Download the "InavantRadarChartSolution.zip" file and import it in Power Apps portal, read this link https://blog.inavant.com.mx/create-a-power-app-custom-code-control/ section "Install package" in order the get more details.

## How to Edit the component?

The file "InavantCharts/InaRadarChartV1.ts" contains the logic used to draw the radar chart.

## How to Use the curret version?

When you have the component in a canvas app, you will have an empty result:
![image](https://github.com/inavant/InaRadarChart/assets/50918464/ce1cd324-a24f-4ea3-a532-5ee83629c58e)

That is because the component needs the following configuration on "radar Chart Configuration" property.

code
```
{
    "height":500
    , "width":600
    , "circleColor": "rgba(143, 134, 134, .1)"
    , "circleBorderColor": "rgba(143, 134, 134, .2)"
    , "circleIntercalColor": true
    , "circlesAmount": 5
    , "maxQualif": 5
    , "cX": 300
    , "cY": 200
    , "cXlabelOffSet": 20
    , "cYlabelOffSet": 20
    , "arrCategoriesAndValues": [
        {
            "pointColor": "rgb(11, 116, 11)"
            , "lineColor": "rgba(11, 116, 11,.5)"
            , "labelColor": "#000"
            , "Values": [
                { "CategoryName": "Futboll", "Value": 5 },
                { "CategoryName": "Baseboll", "Value": 4.5 },
                { "CategoryName": "Soccer", "Value": 2 },
                { "CategoryName": "Boleiboll", "Value": 4 },
                { "CategoryName": "Box", "Value": 3 }
            ]

        }
        ,
        {
            "pointColor": "rgb(5, 5, 5)"
            , "labelColor": "red"
            , "lineColor": "rgba(5, 5, 5,.5)"
            , "Values": [
                { "CategoryName": "/ Canto", "Value": 1 },
                { "CategoryName": "/ Danza", "Value": 5 },
                { "CategoryName": "/ Music", "Value": 1 },
                { "CategoryName": "/ Pintura", "Value": 3 },
                { "CategoryName": "/ Lectura", "Value": 2 }
            ]

        }
    ]
}
```



![image](https://github.com/inavant/InaRadarChart/assets/50918464/e97f03c6-71d3-4202-8e50-b6fcb146dd2d)

Edit any value on the JSON file in order to get the result that you are looking for.



