(function() {
  var Tabify = function(tabArea) {
    this.tabContents = tabArea.querySelector('.tab-contents');
    this.tabHeaders = tabArea.querySelector('.tab-headers');
    this.tabs = this.loadTabs();
    this.tabButtons = this.loadHeaders();
  };

  Tabify.prototype.changeTab = function(event) {
    var tab_id = event.target.getAttribute('data-tab-id');
    for (i=0; i<this.tabButtons.length; i++) {
      this.tabButtons[i].removeClass('active-tab-header');
      this.tabs[i].hide();
    }
    this.tabButtons[tab_id].addClass('active-tab-header');
    this.tabs[tab_id].show();
  }

  Tabify.prototype.loadTabs = function() {
    var tabs = this.tabContents.querySelectorAll('div[data-tab-id]');
    for (i=1; i<tabs.length; i++) {
      tabs[i].hide();
    }

    return tabs;
  };

  Tabify.prototype.loadHeaders = function() {
    var tabButtons = this.tabHeaders.querySelectorAll('h3[data-tab-id]');
    tabButtons[0].addClass('active-tab-header');

    g_this = this;
    for (i=0; i<tabButtons.length; i++) {
      tabButtons[i].addEventListener('click', function(event){ g_this.changeTab(event) });
    }

    return tabButtons;
  };

  window.onload = function() {
    var tabsDiv = document.querySelector(".tabs");
    var tabify = new Tabify(tabsDiv);
  }
})();