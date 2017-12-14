import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'datatable';
  searchValue = "";
  currPaginIndex = 1;
  table = new Table();


  constructor() {
  }

  onChange(event) {
    this.currPaginIndex = 1;
    this.table.paginIndex = 1;
    this.searchValue = Number(event.target.value);
  }

  ngDoCheck() {
    if (this.table.bodyData !== []) {


      if (this.table.sortIndex !== null) {
        if(this.table.prevSortIndex != this.table.sortIndex) {
          if (this.table.sortDirection[this.table.sortIndex] === "asc") {
            this.table.sortDirection[this.table.sortIndex] = "desc";
            this.table.bodyData = this.table.bodyData.sort((n1, n2) => {
              if (n1[this.table.sortIndex] < n2[this.table.sortIndex]) {
                return 1;
              }
              if (n1[this.table.sortIndex] > n2[this.table.sortIndex]) {
                return -1;
              }
              return 0;
            });
          } else {
            this.table.sortDirection[this.table.sortIndex] = "asc";
            this.table.bodyData = this.table.bodyData.sort((n1, n2) => {
              if (n1[this.table.sortIndex] > n2[this.table.sortIndex]) {
                return 1;
              }
              if (n1[this.table.sortIndex] < n2[this.table.sortIndex]) {
                return -1;
              }
              return 0;
            });
          }

          this.table.prevSortIndex = this.table.sortIndex;

        }

      }


      if (this.searchValue != "") {
        var bData = [];
        var searchValue = Number(this.searchValue);
        var bdataLength = this.table.bodyData.length;
        for (var i = 1; i < bdataLength; i++) {
          var data = this.table.bodyData[i];
          var dataLength = data.length;
          for (var j = 0; j < dataLength; j++) {
            if (data[j] == searchValue) {
              bData.push(this.table.bodyData[i]);
              break;
            }
          }
        }

      } else {
        var bData = this.table.bodyData;
      }

      var section = 10.0;
      var pages = Math.ceil(bData.length / section);
      var pagination = document.getElementById("myPagination");

      var cssContent = ' _ngcontent-c0=' + '""';
      pagination.innerHTML = "<a href=" + '"#"'
        + cssContent + '>' + `&laquo;` + "</a>";

      var initial = 1;
      if (this.currPaginIndex - 2 < 1) {
        initial = 1;
      } else if (this.currPaginIndex + 2 > pages) {
        initial = pages - 4;
      } else {
        initial = this.currPaginIndex - 2;
      }
      var count = 0;
      for (var i = initial; i <= pages; i++) {
        count++;
        if (count == 6) {
          break;
        }

        if (i == this.currPaginIndex) {
          pagination.innerHTML = pagination.innerHTML
            + '<a href=' + '"#"' + ` class="active"`
            + cssContent + '>' + (i) + '</a>';
        } else {
          pagination.innerHTML = pagination.innerHTML
            + '<a href=' + '"#"' + cssContent + '>' + (i) + '</a>';
        }
      }
      pagination.innerHTML = pagination.innerHTML
        + "<a href=" + '"#"' + cssContent + '>' + `&raquo;` + "</a>";
      var paginChildLength = pagination.childNodes.length;
      for (var i = 0; i < paginChildLength; i++) {
        pagination.childNodes[i].addEventListener("click",
          function (i, this.table.paginIndex)
        {
          if (i == 0) {
            if (this.table.paginIndex > 1) {
              this.table.paginIndex--;
            }
            if (this.currPaginIndex > 1) {
              this.currPaginIndex--;
            }
          } else if (i == paginChildLength - 1) {
            if (this.table.paginIndex < paginChildLength - 2) {
              this.table.paginIndex++;
            }
            if (this.currPaginIndex < pages) {
              this.currPaginIndex++;
            }
          } else if (i >= 1 && i <= paginChildLength - 2) {
            this.currPaginIndex = this.currPaginIndex + (i - this.table.paginIndex);
            if (this.currPaginIndex - 2 >= 1 && this.currPaginIndex + 2 <= pages) {
              this.table.paginIndex = 3;
            } else if (this.currPaginIndex - 2 == 0 && this.currPaginIndex + 2 <= pages) {
              this.table.paginIndex = 2;
            } else if (this.currPaginIndex - 2 >= 1 && (this.currPaginIndex + 2) == (pages + 1)) {
              this.table.paginIndex = 4;
            } else {
              this.table.paginIndex = i;
            }
          }

          if (this.currPaginIndex - 2 >= 1
            && this.currPaginIndex + 2 <= pages) {
            this.table.paginIndex = 3;
          }
        }
      .
        bind(this, i, this.table.paginIndex)
      )
        ;
      }

      var initial = (this.currPaginIndex - 1) * 10;
      var final = (this.currPaginIndex) * 10;


      var bDataLength = bData.length;
      if (final > bDataLength) {
        final = bDataLength;
      }

      var table = document.getElementById("myTable");
      var tableLength = table.rows.length;
      for (var i = tableLength - 1; i > 0; i--) {
        table.deleteRow(i);
      }

      for (var i = initial; i < final; i++) {
        var data = bData[i];
        var dataLength = data.length;
        var body = table.createTBody();
        var row = body.insertRow(0);
        for (var j = 0; j < dataLength; j++) {
          var cell = row.insertCell(j);
          cell.innerHTML = data[j];
        }
      }
    }
  }
}

class Table {

  headDate = [];
  bodyData = [];
  sortIndex = null;
  prevSortIndex = "invalid";
  sortDirection = ["desc", "desc", "desc", "desc",
    "desc", "desc", "desc", "desc", "desc", "desc", "desc"];
  paginIndex = 1;

  constructor() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://archive.ics.uci.edu/ml/machine-learning-databases' +
      '/breast-cancer-wisconsin/breast-cancer-wisconsin.names');

    var hIndex = null;
    xhr.onload = function (this.headDate, this.sortIndex, this.prevSortIndex
  )
    {
      if (xhr.status === 200) {
        var hData = xhr.responseText.substring(4910,
          xhr.responseText.length - 300).split("\n");

        var table = document.getElementById("myTable");
        var header = table.createTHead();
        var row = header.insertRow(0);
        var hDataLength = hData.length;
        for (var i = 0; i < hDataLength - 1; i++) {
          var cell = row.insertCell(i);

          cell.addEventListener("click", function (i, this.sortIndex, this.prevSortIndex)
          {
            this.sortIndex = i;
            this.prevSortIndex = "invalid";
          }
        .
          bind(this, i, this.sortIndex, this.prevSortIndex)
        )
          ;
          cell.innerHTML = "<b>" + hData[i + 1].substring(5, 36).trim() + "</b>";
          this.headDate.push(hData[i + 1].substring(5, 36).trim());
        }
      }
      else {
        alert('Request failed.  Returned status of ' + xhr.status);
      }
    }
  .
    bind(this, this.headDate, this.sortIndex, this.prevSortIndex);
    xhr.send();

    var xhr1 = new XMLHttpRequest();
    xhr1.open('GET', 'http://archive.ics.uci.edu/ml/machine-learning' +
      '-databases/breast-cancer-wisconsin/breast-cancer-wisconsin.data');
    xhr1.onload = function (this.bodyData
  )
    {
      if (xhr1.status === 200) {
        var bData = xhr1.responseText.split('\n');
        var bDataLength = bData.length;
        for (var i = 0; i < bDataLength; i++) {
          var data = bData[i].split(',');
          this.bodyData.push([]);
          var dataLength = data.length;
          for (var j = 0; j < dataLength; j++) {
            if (data[j] == "") {
              continue;
            }
            this.bodyData[i].push(Number(data[j]));
          }
        }
      }
      else {
        alert('Request failed.  Returned status of ' + xhr1.status);
      }
    }
  .
    bind(this, this.bodyData);
    xhr1.send();
  }
}

