({
  initialize: function (component) {
    var listviews = component.get("v.availableListviews").split(",");
    var includeViewAll = component.get("v.includeViewAll");
    var includeViewRecent = component.get("v.includeViewRecent");
    // var viewAllIsDefault = component.get("v.viewAllIsDefault");
    // var viewRecentIsDefault = component.get("v.viewRecentIsDefault");

    var dropdownOptions = [];

    listviews.forEach((listview) => {
      dropdownOptions.push({
        label: listview.replaceAll("_", " "),
        value: listview.trim()
      });
    });

    // if (includeViewAll) {
    //   if (viewAllIsDefault) {
    //     dropdownOptions.unshift({ label: "View All", value: "all" });
    //   } else {
    //     dropdownOptions.push({ label: "View All", value: "all" });
    //   }
    // }
    // if (includeViewRecent) {
    //   if (viewRecentIsDefault) {
    //     dropdownOptions.unshift({ label: "Recently Viewed", value: "Recent" });
    //   } else {
    //     dropdownOptions.push({ label: "Recently Viewed", value: "Recent" });
    //   }
    // }

    // if (!viewAllIsDefault & !viewRecentIsDefault) {
    //   component.set("v.selectedListview", listviews[0]);
    // } else if (viewRecentIsDefault) {
    //   component.set("v.selectedListview", "Recent");
    // } else if (viewAllIsDefault) {
    //   component.set("v.selectedListview", "all");
    // }

    component.set("v.options", dropdownOptions);

    var a = component.get("c.checkBrowser");
    $A.enqueueAction(a);
  },

  checkBrowser: function (component) {
    var device = $A.get("$Browser.formFactor");

    component.set("v.formatForMobile", device == "PHONE");
    component.set("v.formatForDesktop", device != "PHONE");
  },

  onPicklistChange: function (component, event, helper) {
    // unrenders listView
    component.set("v.showListview", false);

    // get current selected listview Name
    var lstViewName = event.getSource().get("v.value");

    // set new listName for listView
    component.set("v.selectedListview", lstViewName);

    // re-render list view again with new listNew
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
