
class ColumnToggleCtrl {
  constructor() {
    'ngInject';
  }
}

let ColumnToggle = {
  bindings: {
    columns: '='
  },
  controller: ColumnToggleCtrl,
  templateUrl: "components/list-helpers/column-toggle.html"
};

export default ColumnToggle;
