class EditableFieldCtrl {
    constructor($filter) {
        'ngInject';

        this.$filter = $filter;
    }

    $onInit() {
        this.initialFieldValue = this.data;

        this.formatData();
    }

    formatData() {
        if (this.format) {
            this.filteredData = this.$filter(this.format)(this.data);
        }
    }

    changeField(save) {
        if (!save) {
            this.data = this.initialFieldValue;
        } else {
            this.updateField().then(() => this.formatData());
        }
        this.editing = false;
    }

    isUndefined(data) {
        console.log(data);
        console.log(typeof data === 'undefined');
        return typeof data === 'undefined';
    }
}

let EditableField = {
    bindings: {
        admin: '<',
        data: '=',
        updateField: '&',
        options: '<',
        format: '@',
        type: '@',
        buttonText: '@'
    },
    controller: EditableFieldCtrl,
    templateUrl:
        'areas/accounts/account-detail/components/editable-field/editable-field.html'
};

export default EditableField;
