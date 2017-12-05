
class ColumnToggleCtrl {
  constructor() {
    'ngInject';
  }
}

let ColumnToggle = {
  bindings: {
    columns: '=',
    changeColumnVisibility: '&'
  },
  controller: ColumnToggleCtrl,
  templateUrl: "components/list-helpers/column-toggle.html"
};

export default ColumnToggle;
