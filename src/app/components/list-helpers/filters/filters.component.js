class FiltersCtrl {
    constructor(FilteredArrayFactory) {
        'ngInject';
    }

    $onInit() {

        this.filterParams = {}
      
        this.statusList = ['Received', 'Viewed', 'Closed'];
        this.filterParams.status = ['Received', 'Viewed', 'Closed'];
    }

    toggleSelection(status) {

      let idx = this.filterParams.status.indexOf(status);

      if (idx > -1) {
        this.filterParams.status.splice(idx, 1);
      } else {
        this.filterParams.status.push(status);
      }

      this.updateFilters({filterParams: this.filterParams});

    }
}

let Filters = {
    bindings: {
        updateFilters: '&'
    },
    controller: FiltersCtrl,
    templateUrl: 'components/list-helpers/filters/filters.html'
};

export default Filters;
