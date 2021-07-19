({
  initialize: function (component) {
    var listviews = component.get("v.availableListviews").split(",");
    var includeViewAll = component.get("v.includeViewAll");
    var includeViewRecent = component.get("v.includeViewRecent");
    var defaultListView = component.get("v.defaultListView");
    var dropdownOptions = [];

    var device = $A.get("$Browser.formFactor");
    var isMobile = device == "PHONE";

    listviews.forEach((listview) => {
      dropdownOptions.push({
        label: listview.replaceAll("_", " "),
        value: listview.trim()
      });
    });

    if (
      (includeViewRecent || defaultListView == "Recently Viewed") &&
      !isMobile
    ) {
      dropdownOptions.unshift({ label: "Recently Viewed", value: "Recent" });
    }

    if (includeViewAll || defaultListView == "View All") {
      dropdownOptions.push({ label: "View All", value: "all" });
    }

    if (defaultListView == "First Available List View") {
      component.set("v.selectedListview", listviews[0]);
    } else if (defaultListView == "View All") {
      component.set("v.selectedListview", "all");
    } else if (defaultListView == "Recently Viewed") {
      if (!isMobile) {
        component.set("v.selectedListview", "Recent");
      } else {
        component.set("v.selectedListview", listviews[0]);
      }
    }

    component.set("v.picklistOptions", dropdownOptions);
  },

  onPicklistChange: function (component, event, helper) {
    component.set("v.showListview", false);
    var lstViewName = event.getSource().get("v.value");
    component.set("v.selectedListview", lstViewName);
    component.set("v.showListview", true);
  },

  handleMenuSelect: function (component, event, helper) {
    component.set("v.showListview", false);

    var selectedMenuItemValue = event.getParam("value");

    // set new listName for listView
    component.set("v.selectedListview", selectedMenuItemValue);

    // re-render list view again with new listNew
    component.set("v.showListview", true);
  }
});
