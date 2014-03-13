(function() {
  var SearchEngine = function(searchForm, searchTextElement) {
    this.searchForm = searchForm;
    this.searchTextElement = searchTextElement;
    this.searchText = this.searchTextElement.textContent;

    this.searchInput = this.searchForm.querySelector('input[type=text]');

    g_this = this;
    this.searchInput.addEventListener('change', function(event){ g_this.search(event) });
    this.searchInput.addEventListener('keyup', function(event){ g_this.search(event) });
    this.searchForm.addEventListener('submit', function(event){ event.preventDefault() });

    this.numberResultsLabel = document.querySelector('#number-results');
    this.searchWordLabel = document.querySelector('#search-word');
  };

  SearchEngine.prototype.search = function(event) {
    var search = event.target.value;
    search = search.sanitize();

    if (search) {
      searchRegex = new RegExp(search, 'gi');
      count = 0;
      do {
        matches = searchRegex.exec(this.searchText);
        
        if (matches) {
          count++;
        }
      } while (matches && matches.index != searchRegex.lastIndex);

      this.numberResultsLabel.innerHTML = count;
      this.searchWordLabel.innerHTML = event.target.value;
    }
  };

  window.onload = function() {
    var searchForm = document.querySelector("#search-form");
    var searchTextElement = document.querySelector("#search_text");
    var searchEngine = new SearchEngine(searchForm, searchTextElement);
  }
})();