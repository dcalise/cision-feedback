class DisplayLabelCtrl {
  constructor(LabelService) {
    'ngInject';

    this._LabelService = LabelService;
    this.displayName;
  }

  getDisplayName(labelId, labelType) {
    switch (labelType) {
      case 'product':
        this._LabelService.getProduct(labelId).$loaded().then(
          (product) => {
            this.displayName = product.displayName
          }
        )
        break;
      case 'location':
        console.log('location');
        this._LabelService.getLocation(labelId).$loaded().then(
          (location) => {
            this.displayName = location.displayName
          }
        )
        break;
      default:
        this._LabelService.getLabel(labelId).$loaded().then(
          (label) => {
            this.displayName = label.displayName
          }
        )
    }
  }
}

let DisplayLabel = {
  bindings: {
    data: '=',
    lineBreak: '=',
    labelType: '='
  },
  controller: DisplayLabelCtrl,
  templateUrl: 'components/display-label/display-label.html'
};

export default DisplayLabel;
