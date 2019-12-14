class Shape{
    constructor(){
        this.points=[]
        this.lines=[]
    }
    addPoint(p){
        this.points.push(p)
        if(this.points.length>1){
            var l={p1:this.points[this.points.length-2],p2:p}
            this.lines.push(l)
        }
    }
    draw(){
        for(var i=1;i<this.points.length;i++){
            this.points[i-1].draw()
            ctx.moveTo(this.points[i-1].x,this.points[i-1].y);
            ctx.lineTo(this.points[i].x,this.points[i].y);
            ctx.stroke();
        }
        
    }
    findPoint(p){
        for(var i=0;i<this.points.length;i++){
            if(p.x-this.points[i].x<3 && p.y-this.points[i].y<3){
                return i
            }
        }
        return null
    }
    // drawLine(p1,p2){
    //     ctx.beginPath()
	// 	ctx.moveTo(p1.x,p1.y);
	// 	ctx.lineTo(p2.x,p2.y);
	// 	ctx.stroke();
    // }
    deletePoint(index){
        this.points.splice(index,1)
    }
    replace(index,p){
        this.points[index]=p
        if(index!==0 && index!==this.points.length-1){
            this.lines[index-1].p2=p
            this.lines[index].p1=p  
        }
        else if(index===0){
            
            this.lines[index].p1=p
            this.lines[this.lines.length-1].p2=p  
        }
        else if(index===this.points.length-1){
            this.lines[0].p1=p
            this.lines[this.lines.length-1].p2=p  
        }
        
    }
}
