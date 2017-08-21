class AddAccountCtrl {
  constructor(AccountService, $scope, $uibModal) {
    'ngInject';

    this._$scope = $scope
    this._$uibModal = $uibModal;

    this.items = ['item1', 'item2', 'item3']

    this.accountTieOptions = [
      'Platform GAP. Customer will not upgrade to C3 without this feature',
      'Customer CHURNED because this feature was not available',
      'Customer AT RISK because this feature is not available',
      'Prospect LOST because this feature is not available',
      'None of the above'
    ];

    this.customerProductOptions = [
      'Cision PR Edition',
      'CisionPoint',
      'Visible Intelligence',
      'MediaVantage',
      'HARO',
      'ProfNet',
      'OMC',
      'CNW Access',
      'MNR',
      'Others (Please Specify in Notes)'
    ];

    this.prospectProductOptions = [
      'Meltwater',
      'TrendKite',
      'NASDAQ',
      'BusinessWire',
      'Others (Please Specify in Notes)'
    ];

    this.platformOptions = [
      'C3',
      'OMC',
      'CPRE',
      'CP',
      'MyGorkana',
      'MediaVantage',
      'PRWeb Subscription',
      'Visible'
    ];
    this.priorPlatformOptions = [
      'CPRE',
      'CP',
      'PRWeb Subscription',
      'MyGorkana',
      'MediaVantage',
      'OMC',
      'Upgraded from Agility',
      'Net New'
    ];

    this.accountSelected = (select) => {
      if (selected) {
        this.getAccountMeta(selected.originalObject.$id)
        let accountTieObject = {
          accountKey: selected.originalObject.$id,
          accountTie: null
        }
        return this.accountForm.selectedAccounts.push(accountTieObject)
      }
    }

    this.existingAccountsMeta = []

    this.getAccountMeta = (accountId) => {
     return AccountService.getAccount(accountId).then(
       (account) => {
         this.existingAccountsMeta.push(account)
       }
     )
    }

    this.$onChanges = function() {
      var reset = {
        resetForm: function(){
          $scope.$ctrl.existingAccountsMeta = []
        }
      }
      this.resetForm({reset: reset});
    }

  }

  removeAccountFromAddList(i) {
    this.existingAccountsMeta.splice(i,1)
    this.accountForm.selectedAccounts.splice(i,1)
  }

  resetAccountForm(added) {
    if (this.accountForm.name || this.accountForm.cid || this.accountForm.selectedAccounts.length > 0) {
      let sure;
      if (!added) {
        sure = confirm('Are you sure you want to delete your draft?')
      }
      if (sure || added) {
        this.accountForm = {}
        this._$scope.$ctrl.existingAccountsMeta = [];
        this._$scope.$parent.showAccountForm = false
      }
    } else {
      this._$scope.$parent.showAccountForm = false
    }
  }

  open(size, parentSelector) {
    let parentElem = parentSelector ? 
    angular.element($document[0].querySelector('.modal-test ' + parentSelector)) : undefined;
    let modalInstance = this._$uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {
        items: function () {
          return ['item1', 'item2', 'item3'];
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      this.select = selectItem;
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });

  }
  openComponentModal() {
    var modalInstance = this._$uibModal.open({
      animation: true,
      component: 'modalComponent',
      resolve: {
        items: function () {
          return this.items;
        }
      }
    });
    modalInstance.result.then(function (selectedItem) {
      this.select = selectedItem;
    }, function () {
      $log.info('modal-component dismissed at: ' + new Date());
    });
  };
  openMultipleModals() {
    this._$uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title-bottom',
      ariaDescribedBy: 'modal-body-bottom',
      templateUrl: 'stackedModal.html',
      size: 'sm',
      controller: function($scope) {
        $scope.name = 'bottom';  
      }
    });

    this._$uibModal.open({
      animation: true,
      ariaLabelledBy: 'modal-title-top',
      ariaDescribedBy: 'modal-body-top',
      templateUrl: 'stackedModal.html',
      size: 'sm',
      controller: function($scope) {
        $scope.name = 'top';  
      }
    });
  };
}

let AddAccount = {
  bindings: {
    newAccount: '=',
    resetForm: '&',
    featureForm: '=',
    accountForm: '=',
    createFeature: '<',
    searchData: '<',
    searchFunction: '<'
  },
  controller: AddAccountCtrl,
  templateUrl: 'components/account-helpers/add-account/add-account.html'
};

export default AddAccount;
