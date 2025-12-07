import { Component, Input, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './line-chart.html',
  styleUrl: './line-chart.scss',
})
export class LineChart implements AfterViewInit {
  @ViewChild('chartCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @Input() data: { label: string; value: number }[] = [];
  @Input() color = '#21618C';
  
  ngAfterViewInit() {
    this.drawChart();
  }
  
  drawChart() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx || this.data.length === 0) return;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    const padding = 40;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;
    
    const maxValue = Math.max(...this.data.map(d => d.value));
    const minValue = Math.min(...this.data.map(d => d.value));
    const range = maxValue - minValue || 1;
    
    const stepX = width / (this.data.length - 1);
    
    // Draw grid
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border-color') || '#E0E0E0';
    ctx.lineWidth = 1;
    
    for (let i = 0; i <= 5; i++) {
      const y = padding + (height / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(padding + width, y);
      ctx.stroke();
    }
    
    // Draw line
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    this.data.forEach((point, i) => {
      const x = padding + stepX * i;
      const y = padding + height - ((point.value - minValue) / range) * height;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // Draw points
    ctx.fillStyle = this.color;
    this.data.forEach((point, i) => {
      const x = padding + stepX * i;
      const y = padding + height - ((point.value - minValue) / range) * height;
      
      ctx.beginPath();
      ctx.arc(x, y, 4, 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Draw labels
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-light') || '#7F8C8D';
    ctx.font = '12px Roboto';
    ctx.textAlign = 'center';
    
    const labelStep = Math.ceil(this.data.length / 6);
    this.data.forEach((point, i) => {
      if (i % labelStep === 0 || i === this.data.length - 1) {
        const x = padding + stepX * i;
        ctx.fillText(point.label, x, canvas.height - 10);
      }
    });
  }
}