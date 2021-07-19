## Custom Record List View

The Custom Record List View component is a flexible alternative to the standard 
<a href="https://help.salesforce.com/articleView?id=sf.rss_record_list_view.htm&type=5" target="_blank">Record List</a> component for Salesforce Experience Sites (formerly Salesforce Communities). It's purpose is to address certain limitations of the standard Record List component, namely the limitations of customization of the component when it is viewed from a mobile application. 


This component is a modified version of the code provided by <a href="https://sfdcmonkey.com/2019/02/03/dynamic-list-view-salesforce-lightning/" target="_blank">Piyush Soni at SfdcMonkey.com</a>, building off their original model to increase configurability of the component and modifying some visual design.

### Configurable Properties

* **Object API Name (Text)**: The API name of the Salesforce object this list view references.
* **Show Search Box (Checkbox)**: Indicates if the search box feature is available to users
* **Show List Actions (Checkbox)**: Indicates if list actions (buttons) is available to users
* **Enable Inline Editing (Checkbox)**: Indicates if inline editing is available to users
* **Show Row Level Actions (Checkbox)**: Indicates if row level actions are available to users
* **Number of Rows (Number)**: The number of rows to return in a list view
* **Available List Views (Text)**: The API name(s) of the list view(s) available in the component. 
  * **Note**: Separate multiple list view API names with a comma.
* **Include 'View All' (Checkbox)**: Indicates if the "View All" standard list view is available
* **Include 'Recently Viewed' (Checkbox)**: Indicates if the "Recently Viewed" standard list view is available. 
  * **Note**: The "Recently Viewed" list view is not available for mobile users. This is a Salesforce Experience Site (Community) limitation.
* **Default List View (Picklist)**: The initial list view that is displayed on page load. There are three available options: First Available List View, View All, and Recently Viewed.
  * "First Available List View" is the default value, and will display the first list view referenced in the "Available List Views" parameter. 
  * If "View All" is selected it will be the list view that displays on page load, and will also be added to the list of available list views. This will occur even if "Include 'View All'" is not checked.
  * If "Recently Viewed" is selected it will be the list view that displays on page load, and will also be added to the list of available list views. This will occur even if "Include 'Recently Viewed'" is not checked. However, if the user viewing the component is on a mobile device, the "Recently Viewed" list view will not be visible in the list, and the default list view to display will default to the first list view referenced in the "Available List Views" parameter.
* **List View Dropdown Name (Text)**: The text displayed for the dropdown menu button to view additional list views (located in the upper left-hand corner of the component). Default value is "Select Another List View."
