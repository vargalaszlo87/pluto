/*!
 * DRAW Correlation Matrix
 *
 * draw-correlation-matrix.js
 *
 * This application shows the correlation matrix in pure JavaScript.
 *
 * Copyright (C) 2024 Varga Laszlo
 * 
 * https://github.com/vargalaszlo87/draw-correlation-matrix
 * http://vargalaszlo.com
 * http://ha1cx.hu
 *
 * This program is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option)
 * any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of  MERCHANTABILITY or
 * FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
 * more details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Date: 2024-11-01
 */

const drawCorrelationMatrix = {

    // cell & margin
    cellSize: 50,
    labelMargin: 100,
    // font
    fontSize: 16,
    fontFamily: "Calibri",
    // canvas
    canvas: null,
    ctx: null,

    setLeftLabels (N, labels) {
        for (let i = 0; i < N; i++) {
            const x = this.labelMargin - 10 + i * this.cellSize;
            const y = this.labelMargin + i * this.cellSize + this.cellSize / 2;
            this.ctx.fillText(labels[i], x, y);
        }
    },

    setTopLabels (N, labels) {
        this.ctx.textAlign = "left"; 
        this.ctx.textBaseline = "middle";
        for (let i = 0; i < N; i++) {
                const x = this.labelMargin + i * this.cellSize + this.cellSize / 2;  
                const y = this.labelMargin / 1.1; 
                // rotate
                this.ctx.save();  
                this.ctx.translate(x, y);  
                this.ctx.rotate(-Math.PI / 4);  
                this.ctx.fillText(labels[i], 5, 0);  
                this.ctx.restore(); 
        }
    },

    checkInputMatrix: (matrix) => {
        return matrix.length >= 3 && matrix.every(row => row.length >= 3);
    },

    checkVectorAndMatrix: (matrix, labels) => {
        const isSquare = matrix.every(row => row.length === matrix.length);
        const matchesLabels = matrix.length === labels.length;
        return isSquare && matchesLabels;
    },

    checkCorrelationMatrix: (matrix, min = -1, max = 1) => {
        return matrix.every(row => 
            row.every(value => typeof value === "number" && value >= min && value <= max)
        );
    },
    drawLegend(N) {
        const legendWidth = this.cellSize / 2; 
        const legendX = this.canvas.width - legendWidth - 10; 
        const legendHeight = this.canvas.height - this.labelMargin;
        // init gradient
        const gradient = this.ctx.createLinearGradient(0, 0 + this.labelMargin, 0, legendHeight + this.labelMargin);
        gradient.addColorStop(0, "rgba(41, 128, 185)"); // blue
        gradient.addColorStop(0.5, "#FFFFFF"); // white
        gradient.addColorStop(1, "rgb(192, 57, 43)"); // red
        // draw gradient
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(legendX - 15, this.labelMargin, legendWidth - 10 , legendHeight);
        // legends style
        this.ctx.fillStyle = "#000";
        this.ctx.font = `${this.fontSize}px ${this.fontFamily}`;
        this.ctx.textAlign = "center";
        this.ctx.textBaseline = "middle";
        // legends positions
        const upPoint = legendX - 10 + legendWidth / 2 + this.cellSize / 3;
        const upText = 15 + this.labelMargin;
        const middleText = legendHeight / 2 + this.labelMargin;
        const bottomText = legendHeight - 10 + this.labelMargin;
        // text for legends
        this.ctx.fillText("1.0", upPoint, upText);
        this.ctx.fillText("0.5", upPoint, (upText + middleText) / 2);
        this.ctx.fillText("0", upPoint, middleText);
        this.ctx.fillText("-0.5", upPoint, (middleText + bottomText) / 2);
        this.ctx.fillText("-1.0", upPoint, bottomText);
    },				

    matrix (N, datas, minValue, maxValue) {
        for (let row = 0; row < N; row++) {
            for (let col = row; col < N; col++) {
                // actual data
                const actual = datas[row][col];
                // shifting
                const x = this.labelMargin + col * this.cellSize;
                const y = this.labelMargin + row * this.cellSize;
                // rect
                this.ctx.strokeStyle = "#cccccc";
                this.ctx.lineWidth = 2;
                this.ctx.strokeRect(x, y, this.cellSize, this.cellSize);
                // circle
                const centerX = x + this.cellSize / 2;
                const centerY = y + this.cellSize / 2;
                const radius = minValue + Math.abs(actual) * (maxValue - minValue);  
                // coloring
                this.ctx.beginPath();
                this.ctx.fillStyle = (actual) < 0 
                    ? "rgba(192, 57, 43, "+ Math.abs(actual) +")" 
                    : "rgba(41, 128, 185, "+ Math.abs(actual) +")";
                this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
                this.ctx.fill();
            }
        }
    },

    chart (canvasName = "corrMatrixCanvas", N = 1, labels, datas) {
        // pre-check
        // N is min 3
        if (N < 3 || labels.length < 3 || !this.checkInputMatrix(datas))
            return;
        // check size of vector and matrix
        if (!this.checkVectorAndMatrix(datas, labels))
            return;
        // check the type and range of the input matrix
        if (!this.checkCorrelationMatrix(datas))
            return;
        // set and check canvas
        this.canvas = document.getElementById(canvasName);
        if (!this.canvas)
            return;
        // end pre-check
        // set sizes
        this.canvas.width = this.labelMargin + N * this.cellSize + this.cellSize * 1.25;
        this.canvas.height = this.labelMargin + N * this.cellSize + 1;
        this.ctx = this.canvas.getContext("2d");
        if (!this.ctx) return; 
        // set font
        this.ctx.font = `${this.fontSize}px ${this.fontFamily}`;
        this.ctx.textAlign = "right";
        this.ctx.textBaseline = "middle";
        // set circle
        let maxValue = (this.cellSize / 2) * 0.75;
        let minValue = (this.cellSize / 2) * 0.2;
        // methods
        this.setLeftLabels(N, labels);
        this.setTopLabels(N, labels);
        this.matrix(N, datas, minValue, maxValue);
        this.drawLegend(N);
    },
};

// for tests
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = drawCorrelationMatrix;
}