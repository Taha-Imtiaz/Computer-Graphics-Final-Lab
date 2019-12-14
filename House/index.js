window.onload=init()
var cvs,ctx,count,x1,shapes,y1,x2,y2,deleting,deletepoint,shapeNumber,deletepoint,clearButton,shape,clickedpointIndex,clickedShapeIndex,pencil_line,shapeSelection,selectMoving

function init(){

    shapeNumber=0,
    count=0,
    pencil_line=null,
    shapeSelection=0,
	selectMoving=0,
	deletepoint=0,
	clickedShapeIndex=null,
    clickedpointIndex=null
	shapes=[],
	deleting=0

	cvs=document.getElementById("mycanvas")
	ctx=cvs.getContext("2d");

	ctx.strokeStyle = '#000';
	ctx.lineJoin="round";
	ctx.lineCap="round";
	ctx.lineWidth = 1;
	shape=new Shape()

    var p=document.getElementById("drawshape")
    p.onclick=()=>{
        pencil_line=1
    }
    document.getElementById("drawnewshape").onclick=()=>{
        changeShape()
		pencil_line=1
		shapeSelection=0
		selectMoving=0
        deletepoint=0
	}
	document.getElementById("deleteshape").onclick=()=>{
		changeShape()
		pencil_line=0
		shapeSelection=0
		selectMoving=0
        deletepoint=1
	}
	document.getElementById("refresh").onclick=()=>{
		shapeNumber=0,
		count=0,
		pencil_line=null,
		shapeSelection=0,
		selectMoving=0,
		clickedShapeIndex=null,
		clickedpointIndex=null
		shapes=[]
        clearCanvas()
    }
    document.getElementById("dragshape").onclick=()=>{
		changeShape()
		pencil_line=0
		deletepoint=0
		shapeSelection=1
		console.log("drag",shapeSelection)
	}
	document.body.addEventListener('mousemove',function(e){
		if(selectMoving===1){
			var p=new Point(getMousePos(e))
			if(clickedpointIndex===0 || clickedpointIndex===shapes[clickedShapeIndex].points.length-1){
				shapes[clickedShapeIndex].replace(0,p)
				shapes[clickedShapeIndex].replace(shapes[clickedShapeIndex].points.length-1,p)
			}
			else shapes[clickedShapeIndex].replace(clickedpointIndex,p)
			clearCanvas()
			drawShapes()
		}
	})
	document.body.addEventListener('mouseup',function(e){
		if(selectMoving===1){
			clickedShapeIndex=null
			clickedpointIndex=null
			selectMoving=0
		}
		
	})
	
	cvs.onclick=function(e){
		if(pencil_line===1){
			var p=new Point(getMousePos(e))
			p.draw()
			shape.addPoint(p)
			clacAndDrawLine(p)
		}
	}
	document.body.addEventListener('mousedown',function(e){
		if(shapeSelection===1 ){
			var P=new Point(getMousePos(e))
			for(var i=0;i<shapes.length;i++){
				var p=shapes[i].findPoint(P)
				if(p!==null){
					clickedpointIndex=p
					clickedShapeIndex=i
					selectMoving=1
				}
			}
		}
		else if(deletepoint===1){
			console.log("deleting point")
			var P=new Point(getMousePos(e))
			for(var i=0;i<shapes.length;i++){
				var p=shapes[i].findPoint(P)
				if(p!==null){
					clickedpointIndex=p
					clickedShapeIndex=i
					shapes[clickedShapeIndex].deletePoint(clickedpointIndex)
					clearCanvas()
					drawShapes()
				}
			}
		}
	})
	
}
function drawShapes(){
	for(i=0;i<shapes.length;i++){
		shapes[i].draw()
	}
}
function clacAndDrawLine(p){
	if(count===0){
		x1=p.x;
		y1=p.y;
		count++;
	}
	else{
		x2=p.x;
		y2=p.y;
		ctx.moveTo(x1,y1);
		ctx.lineTo(x2,y2);
		ctx.stroke();
		x1=x2;
		y1=y2;
	}
}
function getMousePos(e){
    var rect=cvs.getBoundingClientRect();
    return{
        x:e.clientX-rect.left,
        y:e.clientY-rect.top
    }

}
function changeShape(){
	if(shape.points.length>1){
		count=0
		shapeNumber++
		//shape.addPoint(shape.points[0])
		shapes.push(shape)
		
		console.log("shapes",shapes)
		clearCanvas()
		drawShapes()
        shape=new Shape()
        x1=null,x2=null,y1=null,y2=null
	}
}
function clearCanvas(){
	const ctx = cvs.getContext("2d")
	ctx.save()
	ctx.globalCompositeOperation ="copy"
	ctx.strokeStyle="transparent"
	ctx.beginPath()
	ctx.lineTo(0,0)
	ctx.stroke()
	ctx.restore()
}