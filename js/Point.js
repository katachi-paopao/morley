class Point {
    constructor(x = 0, y = 0){
        this.x = x;
        this.y = y;
    }

    dist(p){// 点pとの距離を計算
        return Math.sqrt((p.x - this.x)**2 + (p.y - this.y)**2);
    }

    static middle(p1, p2) {// 点p1と点p2の中点を計算
        return new Point( (p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
    }
}