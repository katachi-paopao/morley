class Triangle {
    constructor(p1 = new Point(1, 4), p2 = new Point(1, 8), p3 = new Point(4, 4)){
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.e1 = new Edge(p2, p3);
        this.e2 = new Edge(p3, p1);
        this.e3 = new Edge(p1, p2);
        this.area = Triangle.calcArea(this.e1, this.e2, this.e3);
    }

    getCirc () {
        if (this.circ) return this.circ
        
        this.circ = Triangle.calcCirc(this.p1, this.p2, this.p3);
        return this.circ;
    }

    getAngles(){
        if (this.angles) return this.angles;

        this.angles = Triangle.calcAngles(this.p1, this.p2, this.p3);
        return this.angles;
    }

    trisector(p){
        let ne1, ne2, re1, re2, rotEdge;
        let result = [];

        if (p === this.p1){
            ne1 = new Edge(p, this.p2);
            ne2 = new Edge(p, this.p3);

            re1 = rotateEdge(ne1, this.getAngles()[0] / 3);
            re2 = rotateEdge(ne1, -this.getAngles()[0] / 3);

            re1.setPoints(re1.p1, re1.cross(this.e1));
            re2.setPoints(re2.p1, re2.cross(this.e1));

            if (this.getAngles()[1] <= Math.PI / 2){
                rotEdge = (re1.length > re2.length) ? re2 : re1;
            } else {
                rotEdge = (re1.length > re2.length) ? re1 : re2;
            }

            result.push(new Edge(rotEdge.p1, rotEdge.p2));
            drawEdge(rotEdge, "green");

            re1 = rotateEdge(ne2, this.getAngles()[0] / 3);
            re2 = rotateEdge(ne2, -this.getAngles()[0] / 3);

            re1.setPoints(re1.p1, re1.cross(this.e1));
            re2.setPoints(re2.p1, re2.cross(this.e1));

            if (this.getAngles()[2] <= Math.PI / 2){
                rotEdge = (re1.length > re2.length) ? re2 : re1;
            } else {
                rotEdge = (re1.length > re2.length) ? re1 : re2;
            }

            drawEdge(rotEdge, "green");
            result.push(new Edge(rotEdge.p1, rotEdge.p2));
        } else if (p === this.p2){
            ne1 = new Edge(p, this.p3);
            ne2 = new Edge(p, this.p1);

            re1 = rotateEdge(ne1, this.getAngles()[1] / 3);
            re2 = rotateEdge(ne1, -this.getAngles()[1] / 3);

            re1.setPoints(re1.p1, re1.cross(this.e2));
            re2.setPoints(re2.p1, re2.cross(this.e2));

            if (this.getAngles()[2] <= Math.PI / 2){
                rotEdge = (re1.length > re2.length) ? re2 : re1;
            } else {
                rotEdge = (re1.length > re2.length) ? re1 : re2;
            }

            result.push(new Edge(rotEdge.p1, rotEdge.p2));
            drawEdge(rotEdge, "blue");

            re1 = rotateEdge(ne2, this.getAngles()[1] / 3);
            re2 = rotateEdge(ne2, -this.getAngles()[1] / 3);

            re1.setPoints(re1.p1, re1.cross(this.e2));
            re2.setPoints(re2.p1, re2.cross(this.e2));

            if (this.getAngles()[0] <= Math.PI / 2){
                rotEdge = (re1.length > re2.length) ? re2 : re1;
            } else {
                rotEdge = (re1.length > re2.length) ? re1 : re2;
            }

            result.push(new Edge(rotEdge.p1, rotEdge.p2));
            drawEdge(rotEdge, "blue");
        } else if (p === this.p3){
            ne1 = new Edge(p, this.p1);
            ne2 = new Edge(p, this.p2);

            re1 = rotateEdge(ne1, this.getAngles()[2] / 3);
            re2 = rotateEdge(ne1, -this.getAngles()[2] / 3);

            re1.setPoints(re1.p1, re1.cross(this.e3));
            re2.setPoints(re2.p1, re2.cross(this.e3));

            if (this.getAngles()[0] <= Math.PI / 2){
                rotEdge = (re1.length > re2.length) ? re2 : re1;
            } else {
                rotEdge = (re1.length > re2.length) ? re1 : re2;
            }

            result.push(new Edge(rotEdge.p1, rotEdge.p2));
            drawEdge(rotEdge, "red");

            re1 = rotateEdge(ne2, this.getAngles()[2] / 3);
            re2 = rotateEdge(ne2, -this.getAngles()[2] / 3);

            re1.setPoints(re1.p1, re1.cross(this.e3));
            re2.setPoints(re2.p1, re2.cross(this.e3));

            if (this.getAngles()[1] <= Math.PI / 2){
                rotEdge = (re1.length > re2.length) ? re2 : re1;
            } else {
                rotEdge = (re1.length > re2.length) ? re1 : re2;
            }

            result.push(new Edge(rotEdge.p1, rotEdge.p2));
            drawEdge(rotEdge, "red");
        }

        return result;
    }

    static calcArea (edge1, edge2, edge3){// 3辺から三角形の面積を求める
        var a = edge2.length;
        var b = edge3.length;
        var c = edge1.length;
        var s = (a + b + c) / 2;
        return Math.sqrt(s * (s-a) * (s-b) * (s-c));
    }

    static calcAngles(p1, p2, p3){// 3点から3つの角を求める
        var t = new Triangle(p1, p2, p3);

        var a = t.e1.length;
        var b = t.e2.length;
        var c = t.e3.length;
        var cosA = (a**2 - b**2 - c**2) / (-2 * b * c);
        var cosB = (b**2 - c**2 - a**2) / (-2 * c * a);
        var cosC = (c**2 - a**2 - b**2) / (-2 * a * b);

        var angleA = Math.acos(cosA);
        var angleB = Math.acos(cosB);
        var angleC = Math.acos(cosC);

        return [angleA, angleB, angleC];
    }

    static calcCirc(p1, p2, p3){// 3点に接する外接円の中心の点を求める
        var t = new Triangle(p1, p2, p3);
        var a = t.e1.length;
        var b = t.e2.length;
        var c = t.e3.length;
        // (1/2)*bc*sinA = 三角形の面積の関係からsinを導出
        var sinA = t.area * 2 / b / c;
        var sinB = t.area * 2 / c / a;
        var sinC = t.area * 2 / a / b;
        // 余弦定理からcosを導出
        var cosA = (a**2 - b**2 - c**2) / (-2 * b * c);
        var cosB = (b**2 - c**2 - a**2) / (-2 * c * a);
        var cosC = (c**2 - a**2 - b**2) / (-2 * a * b);
        // sinの2倍角の公式からsin2xを求める
        var sin2A = 2 * sinA * cosA;
        var sin2B = 2 * sinB * cosB;
        var sin2C = 2 * sinC * cosC;

        var x = (p1.x * sin2A + p2.x * sin2B + p3.x * sin2C) / (sin2A + sin2B + sin2C);
        var y = (p1.y * sin2A + p2.y * sin2B + p3.y * sin2C) / (sin2A + sin2B + sin2C);
        return new Point(x, y);
    }
}