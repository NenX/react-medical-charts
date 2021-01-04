import React, { FC, Fragment } from "react";
import { IData, IPointData, IPointDataMap, TPointArr } from "../types";
import { drawSvgScale, drawCircle, splitGroup, getXY, drawCross, drawBlueLine, drawSquare, getPolygon } from "../utils/drawHelper";
import { DrawArrow } from "./DrawArrow";
export const DrawPoint: FC<{ pointData: IPointDataMap, curDate: string }> = ({ pointData, curDate }) => {
    let height = 15;
    let mb = pointData.mb || []; //脉搏
    let xl = pointData.xl || []; //心率
    let wd = pointData.wd || []; //温度
    let tt = pointData.tt || []; //疼痛
    let events = pointData.eventDatas || []; //事件
    let leaveEvents: string[] = []; //缓存请假事件
    //绘制点、折线、脉搏短促
    let pointArray = [];
    let wdYSection = drawSvgScale({
        markName: "wd",
        svgId: "svgLeft",
        x: "0.5",
        beginKD: 35,
        endKD: 42,
        width: 10,
        disKD: 1,
        trRowBegin: 5,
        trRowEnd: 40,
        stepSide: false,
        valueShow: true,
        isShowdemarcate: false,
        martchs: "40-35,15-40",
    }).ySection;
    let mbYSection = drawSvgScale({
        markName: "mb",
        svgId: "svgRight",
        x: "0",
        beginKD: 40,
        endKD: 180,
        width: 10,
        disKD: 20,
        trRowBegin: 5,
        trRowEnd: 40,
        stepSide: false,
        valueShow: true,
        isShowdemarcate: false,
        martchs: "140-40,15-40",
    }).ySection;
    let ttYSection = drawSvgScale({
        markName: "tk",
        x: "1",
        stepSide: true,
        valueShow: true,
        beginKD: 1,
        endKD: 10,
        width: 10,
        disKD: 1,
        trRowBegin: 45,
        trRowEnd: 54,
        isShowdemarcate: false,
    }).ySection;

    console.log('wdYSection', wdYSection)
    console.log('mbYSection', mbYSection)
    console.log('ttYSection', ttYSection)

    //统计请假事件
    for (let i = 0; i < events.length; i++) {
        let value = events[i].value;
        let dataTime = events[i].dataTime;
        if (value === "请假") {
            leaveEvents.push(dataTime);
        }
    }
    let mbGroup = splitGroup(leaveEvents, mb);
    let xlGroup = splitGroup(leaveEvents, xl);
    let wdGroup = splitGroup(leaveEvents, wd);
    let ttGroup = splitGroup(leaveEvents, tt);

    //计算脉搏点
    type TPoint = {
        x: number
        y: number
        value: number
        type: string
        point: IPointData
    }
    let mbPoints: TPoint[][] = [];
    let xlPoints: TPoint[][] = [];
    let wdPoints: TPoint[][] = [];
    let ttPoints: TPoint[][] = [];
    for (let i = 0; i < mbGroup.length; i++) {
        let mbArray = mbGroup[i];
        let xlArray = xlGroup[i];
        let wdArray = wdGroup[i];
        let ttArray = ttGroup[i];
        mbPoints[i] = [];
        xlPoints[i] = [];
        wdPoints[i] = [];
        ttPoints[i] = [];
        for (let j = 0; j < mbArray.length; j++) {
            let xy = getXY(mbArray[j], curDate, 40, 180, mbYSection);
            mbPoints[i].push(xy);
        }
        for (let j = 0; j < xlArray.length; j++) {
            let xy = getXY(xlArray[j], curDate, 40, 180, mbYSection);
            xlPoints[i].push(xy);
        }
        for (let j = 0; j < wdArray.length; j++) {
            let xy = getXY(wdArray[j], curDate, 35, 42, wdYSection);
            wdPoints[i].push(xy);
        }
        for (let j = 0; j < ttArray.length; j++) {
            let xy = getXY(ttArray[j], curDate, 1, 10, ttYSection);
            ttPoints[i].push(xy);
        }
    }
    //获取 温度等于42°C时的y轴值，如果温度大于42°,即y值小于wdMax，则绘制向上的箭头
    let wdMax = wdYSection[1];
    //绘制物理降温
    for (let i = 0; i < wdPoints.length; i++) {
        let wdPoint = wdPoints[i];
        for (let j = 0; j < wdPoint.length; j++) {
            let value = wdPoint[j].value; //温度
            let phValue = wdPoint[j].point.phValue; //物理降温
            let yPx = wdPoint[j].y.toString();
            let xPx = wdPoint[j].x.toString();
            if (phValue !== undefined && phValue !== "") {
                if (value > 42) {
                    yPx = wdMax;
                }
                //获取物理降温的坐标
                let wljwY = getXY(wdPoint[j].point, curDate, 35, 42, wdYSection, true).y;
                pointArray.push(
                    <g key={"wljwPath" + xPx} name="wljw" strokeWidth="2px" stroke="red" style={{ fill: "none" }}>
                        <path strokeDasharray="3,3" d={"M" + xPx + " " + yPx + " " + xPx + " " + wljwY} />
                    </g>
                );
                if (value.toString() !== phValue) {
                    pointArray.push(drawCircle('wljw', {
                        "x": xPx,
                        "y": wljwY
                    }, 4, "red", "物理降温:" + phValue + "°C", false));
                }
            }
        }
    }
    // 绘制折线图
    //判断点是否重合
    let coor = [];
    for (let i = 0; i < mbPoints.length; i++) {
        let xlPoint = xlPoints[i];
        let mbPoint = mbPoints[i];
        let wdPoint = wdPoints[i];
        let ttPoint = ttPoints[i];
        //定义折线path
        let xlPath = "";
        let mbPath = "";
        let wdPath = "";
        let ttPath = "";
        coor[i] = {}
        for (let j = 0; j < xlPoint.length; j++) {
            let x = xlPoint[j].x;
            let y = xlPoint[j].y;
            coor[i][x] = coor[i][x] || {};
            coor[i][x]['xl'] = xlPoint[j];
            if (xlPath === "") {
                xlPath += "M" + x + "," + y;
            } else {
                xlPath += "L" + x + "," + y;
            }
        }
        for (let j = 0; j < mbPoint.length; j++) {
            let x = mbPoint[j].x;
            let y = mbPoint[j].y;
            coor[i][x] = coor[i][x] || {};
            coor[i][x]['mb'] = mbPoint[j];
            if (mbPath === "") {
                mbPath += "M" + x + "," + y;
            } else {
                mbPath += "L" + x + "," + y;
            }
        }
        for (let j = 0; j < wdPoint.length; j++) {
            let x = wdPoint[j].x;
            let y = wdPoint[j].y;
            coor[i][x] = coor[i][x] || {};
            coor[i][x]['wd'] = wdPoint[j];
            if (wdPath === "") {
                wdPath += "M" + x + "," + y;
            } else {
                wdPath += "L" + x + "," + y;
            }
        }
        for (let j = 0; j < ttPoint.length; j++) {
            let x = ttPoint[j].x;
            let y = ttPoint[j].y;
            coor[i][x] = coor[i][x] || {};
            coor[i][x]['tt'] = ttPoint[j];
            if (ttPath === "") {
                ttPath += "M" + x + "," + y;
            } else {
                ttPath += "L" + x + "," + y;
            }
        }
        pointArray.push(<path key={"pathXL" + i} stroke="red" strokeWidth='2' fill='none' d={xlPath} />);
        pointArray.push(<path key={"pathMB" + i} stroke="red" strokeWidth='2' fill='none' d={mbPath} />);
        pointArray.push(<path key={"pathWD" + i} stroke="blue" strokeWidth='2' fill='none' d={wdPath} />);
        pointArray.push(<path key={"pathTT" + i} stroke="blue" strokeWidth='2' fill='none' d={ttPath} />)
    }
    console.log('coor', coor)
    for (let i = 0; i < coor.length; i++) {
        let json = coor[i];
        // j x 轴
        for (let j in json) {
            if (!json[j].mb) {
                json[j].mb = {};
            }
            if (!json[j].xl) {
                json[j].xl = {};
            }
            if (!json[j].wd) {
                json[j].wd = {};
            }
            if (!json[j].tt) {
                json[j].tt = {};
            }
            //console.log(json[j].wd)
            let mbY = json[j].mb.y;
            let xlY = json[j].xl.y;
            let wdY = json[j].wd.y;
            let ttY = json[j].tt.y;
            //console.log("mb:"+mbY+"xl:"+xlY+"wd:"+wdY);
            let yw = json[j].wd.type === 'yw'; //腋温
            let kw = json[j].wd.type === 'kw'; //口温
            let gw = json[j].wd.type === 'gw'; //肛温
            //判断是否重合
            let ismbxlwd = mbY && xlY && wdY; //脉搏+心率+温度点都存在
            let ismbxl = mbY && xlY; //脉搏+心率点都存在
            let ismbwd = mbY && wdY; //脉搏+温度点都存在
            let isxlwd = xlY && wdY; //心率+温度点都存在
            let istt = ttY;
            let iswd = wdY;
            if (ismbxlwd && mbY === xlY && xlY === wdY && gw) { //脉搏+心率+肛温[红圆+红圈+蓝圈]：两个圈在外围（红圈在最外层表示心率，篮圈在里层表示肛温）、一个圆在中间（红圆表示脉搏）
                let title = "脉搏：" + json[j].xl.value + "次，心率：" + json[j].xl.value + "次,肛温：" + json[j].wd.value + "°C";
                pointArray.push(drawCircle("gw", { "x": j, "y": xlY }, 7, "blue", title, false));
                pointArray.push(drawCircle("mb", { "x": j, "y": xlY }, 3, "red", title, true));
            } else if (ismbxlwd && mbY === xlY && xlY === wdY && yw) {//脉搏+心率+腋温[红圆+红圈+蓝叉]：红圈在外围（表示心率）、红圆在中间（表示脉搏）、蓝叉在中间红圆之上（表示腋温）
                let title = "脉搏：" + json[j].xl.value + "次，心率：" + json[j].xl.value + "次,腋温：" + json[j].wd.value + "°C";
                pointArray.push(drawCircle("mb", { "x": j, "y": xlY }, 7, "red", title, true));
                pointArray.push(drawCross("yw", { "x": j, "y": xlY }, 3, "blue", title));
            } else if (ismbxlwd && mbY === xlY && xlY === wdY && kw) {//脉搏+心率+口温[红圆+红圈+蓝圆]：红圈在外围（表示心率）、红圆在中间（表示脉搏）、蓝圆在中间红圆之上（表示口温）
                let title = "脉搏：" + json[j].xl.value + "次，心率：" + json[j].xl.value + "次,口温：" + json[j].wd.value + "°C";
                pointArray.push(drawCircle("mb", { "x": j, "y": xlY }, 7, "red", title, true));
                pointArray.push(drawCircle("kw", { "x": j, "y": xlY }, 3, "blue", title, true));
            } else if (isxlwd && xlY === wdY && gw) { //心率+肛温[红圈+蓝圈]
                let title = "心率：" + json[j].xl.value + "次，肛温：" + json[j].wd.value + "°C";
                if (xlY && wdY) {
                    pointArray.push(drawCircle("gw", { "x": j, "y": xlY }, 7, "red", title, false));
                    pointArray.push(drawCircle("mb", { "x": j, "y": xlY }, 3, "blue", title, false));
                }
                mbY && pointArray.push(drawCircle("mb", {
                    "x": j,
                    "y": mbY
                }, 4, "red", "脉搏：" + json[j].mb.value + "次", true));//脉搏
            } else if (isxlwd && xlY === wdY && yw) { //心率+腋温[红圈+蓝叉]]
                let title = "心率：" + json[j].xl.value + "次，腋温：" + json[j].wd.value + "°C";
                if (xlY && wdY) {
                    pointArray.push(drawCircle("mb", { "x": j, "y": xlY }, 7, "red", title, false));
                    pointArray.push(drawCross("yw", { "x": j, "y": xlY }, 4, "blue", title));
                }
                mbY && pointArray.push(drawCircle("mb", {
                    "x": j,
                    "y": mbY
                }, 4, "red", "脉搏：" + json[j].mb.value + "次", true));//脉搏
            } else if (isxlwd && xlY === wdY && kw) {  //心率+口温[红圈+蓝圆]
                let title = "心率：" + json[j].xl.value + "次，口温：" + json[j].wd.value + "°C";
                if (xlY && wdY) {
                    pointArray.push(drawCircle("xl", { "x": j, "y": xlY }, 7, "red", title, false));
                    pointArray.push(drawCircle("kw", { "x": j, "y": xlY }, 3, "blue", title, true));
                }
                mbY && pointArray.push(drawCircle("mb", {
                    "x": j,
                    "y": mbY
                }, 4, "red", "脉搏：" + json[j].mb.value + "次", true));//脉搏
            } else if (ismbwd && mbY === wdY && gw) { //脉搏+肛温[红圆+蓝圈]
                let title = "脉搏：" + json[j].mb.value + "次，肛温：" + json[j].wd.value + "°C";
                if (mbY && wdY) {
                    pointArray.push(drawCircle("gw", { "x": j, "y": mbY }, 7, "red", title, false));
                    pointArray.push(drawCircle("mb", { "x": j, "y": mbY }, 3, "blue", title, false));
                }
                xlY && pointArray.push(drawCircle("xl", {
                    "x": j,
                    "y": xlY
                }, 4, "red", "心率：" + json[j].xl.value + "次", false));//心率
            } else if (ismbwd && mbY === wdY && yw) { //脉搏+腋温[红圆+蓝叉]
                let title = "脉搏：" + json[j].mb.value + "次，腋温：" + json[j].wd.value + "°C";
                if (mbY && wdY) {
                    pointArray.push(drawCircle("mb", { "x": j, "y": mbY }, 7, "red", title, false));
                    pointArray.push(drawCross("yw", { "x": j, "y": mbY }, 4, "blue", title));
                }
                xlY && pointArray.push(drawCircle("xl", {
                    "x": j,
                    "y": xlY
                }, 4, "red", "心率：" + json[j].xl.value + "次", false));//心率
            } else if (ismbwd && mbY === wdY && kw) {  //脉搏+口温[红圆+蓝圆]
                let title = "脉搏：" + json[j].mb.value + "次，口温：" + json[j].wd.value + "°C";
                if (mbY && wdY) {
                    pointArray.push(drawCircle("mb", { "x": j, "y": mbY }, 7, "red", title, false));
                    pointArray.push(drawCircle("kw", { "x": j, "y": mbY }, 3, "blue", title, true));
                }
                xlY && pointArray.push(drawCircle("xl", {
                    "x": j,
                    "y": xlY
                }, 4, "red", "心率：" + json[j].xl.value + "次", false));//心率
            } else if (ismbxl && mbY === xlY) { //脉搏+心率[红圆]
                let title = "脉搏：" + json[j].mb.value + "次，心率" + json[j].mb.value + "次";
                mbY && xlY && pointArray.push(drawCircle("mb", { "x": j, "y": mbY }, 4, "red", title, true));
                drawWd(json[j], j, wdY);
            } else {//正常绘制
                xlY && pointArray.push(drawCircle("xl", {
                    "x": j,
                    "y": xlY
                }, 4, "red", "心率：" + json[j].xl.value + "次", false));//心率
                mbY && pointArray.push(drawCircle("mb", {
                    "x": j,
                    "y": mbY
                }, 4, "red", "脉搏：" + json[j].mb.value + "次", true));//脉搏
                drawWd(json[j], j, wdY);
            }

            //绘制温度
            //@ts-ignore
            function drawWd(point: any, j: any, wdY: any) {
                if (wdY && wdY < wdMax) {
                    //绘制向上的箭头
                    pointArray.push(<DrawArrow x={j} y={parseInt(wdMax)} length={2 * height} isUp color="blue" />);
                } else {
                    if (point.wd.type === "yw") {
                        wdY && pointArray.push(drawCross("yw", {
                            "x": j,
                            "y": wdY
                        }, 4, "blue", "腋温：" + point.wd.value + "°C"));//温度
                    } else if (point.wd.type === "gw") {
                        wdY && pointArray.push(drawCircle("gw", {
                            "x": j,
                            "y": wdY
                        }, 4, "blue", "肛温：" + point.wd.value + "°C", false));
                    } else if (point.wd.type === "kw") {
                        wdY && pointArray.push(drawCircle("yw", {
                            "x": j,
                            "y": wdY
                        }, 4, "blue", "口温：" + point.wd.value + "°C", true));
                    }
                }
            }

            //绘制疼痛
            let title = "疼痛：" + json[j].tt.value;
            istt && pointArray.push(drawSquare("tt", { "x": j, "y": ttY }, 4, "blue", title, true));
        }
    }

    for (let i = 0; i < mbPoints.length; i++) {
        for (let j = 0; j < mbPoints[i].length; j++) {
            let x = mbPoints[i][j].x;
            let y = mbPoints[i][j].y;
            //pointArray.push(drawCircle("mb",{"x":x,"y":y},4,"red","脉搏",true));
        }
        for (let j = 0; j < xlPoints[i].length; j++) {
            let x = xlPoints[i][j].x;
            let y = xlPoints[i][j].y;
            //pointArray.push(drawCircle("xl",{"x":x,"y":y},4,"red","心率",false));
        }
    }
    // 根据心率和脉搏点，绘制多边形（脉搏短促）
    //统计出现的多边形
    let polygonArray = getPolygon(mbPoints, xlPoints);
    //console.log("多边形")
    //console.log(polygonArray)
    //绘制多边形
    for (let i = 0; i < polygonArray.length; i++) {
        let polygon = polygonArray[i];
        pointArray.push(drawBlueLine(polygon))
    }
    return (
        <Fragment>
            {
                pointArray.map(_ => _)
            }
        </Fragment>
    );
}