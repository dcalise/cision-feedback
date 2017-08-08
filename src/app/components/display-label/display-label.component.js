class DisplayLabelCtrl {
  constructor(LabelService) {
    'ngInject';

    this._LabelService = LabelService;
    this.displayName;
  }

  getDisplayName(labelId) {
    this._LabelService.getLabel(labelId).$loaded().then(
      (label) => {
        this.displayName = label.displayName
        console.log(this.displayName)
      }
    )
  }
}

let DisplayLabel = {
  bindings: {
    data: '=',
    lineBreak: '='
  },
  controller: DisplayLabelCtrl,
  templateUrl: 'components/display-label/display-label.html'
};

export default DisplayLabel;
