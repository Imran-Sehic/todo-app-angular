import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  allTodos: number;
  activeTodos: number;
  completedTodos: number;
  deletedTodos: number;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.todoService.getAllTodosForUser().subscribe(todos => {
      if (todos.length > 0) {
        this.allTodos = todos.length;
        this.activeTodos = todos.filter(todo => todo.checked === false && todo.deleted === false).length;
        this.completedTodos = todos.filter(todo => todo.checked === true && todo.deleted === false).length;
        this.deletedTodos = todos.filter(todo => todo.deleted === true).length;
        this.createChart()
      }
    })
  }

  showSidebar() {
    document.getElementById('sidebar').classList.toggle('active');
  }

  createChart() {
    var ctx = document.getElementById('myChart');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['All', 'Active', 'Completed', 'Deleted'],
        datasets: [{
          label: 'Todos',
          data: [
            this.allTodos,
            this.activeTodos,
            this.completedTodos,
            this.deletedTodos
          ],
          backgroundColor: [
            'rgba(26, 148, 49, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(72, 214, 72, 0.2)',
            'rgba(255, 99, 132, 0.2)'
          ],
          borderColor: [
            'rgba(26, 148, 49, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(72, 214, 72, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

}
