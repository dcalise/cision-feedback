class EditableFieldCtrl {
  constructor() {
    'ngInject';
  }

  $onInit() {
    this.initialFieldValue = this.data;
    console.log(this.initialFieldValue);
  }
  changeField(save) {
    if (!save) {
      this.data = this.initialFieldValue;
    } else {
      this.updateField();
    }
    this.editing = false;
  }
}

let EditableField = {
  bindings: {
    admin: '<',
    data: '=',
    updateField: '&'
  },
  controller: EditableFieldCtrl,
  templateUrl: 'areas/accounts/account-detail/components/editable-field/editable-field.html'
};

export default EditableField;