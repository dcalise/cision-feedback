class EditableFieldCtrl {
    constructor($filter) {
        'ngInject';

        this.$filter = $filter;
    }

    $onInit() {
        this.initialFieldValue = this.data;

        if (this.adminRequired && !this.isUserAdmin) {
            this.restrictAccess = true;
        }

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
}

let EditableField = {
    bindings: {
        adminRequired: '<',
        isUserAdmin: '<',
        data: '=',
        updateField: '&',
        options: '<',
        format: '@',
        type: '@',
        buttonText: '@',
        emptyState: '@'
    },
    controller: EditableFieldCtrl,
    templateUrl: 'areas/accounts/account-detail/components/editable-field/editable-field.html'
};

export default EditableField;
