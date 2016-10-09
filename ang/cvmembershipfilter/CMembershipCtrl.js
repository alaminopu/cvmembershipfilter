(function(angular, $, _) {

  angular
    .module('cvmembershipfilter')
    .config(function($routeProvider) {
      $routeProvider.when('/cmembership', {
        controller: 'CvmembershipfilterCMembershipCtrl',
        templateUrl: '~/cvmembershipfilter/CMembershipCtrl.html',
        resolve: {
          CurrentMemberships: function(crmApi) {
            return crmApi('Membership', 'get', {
              "sequential": 1,
              "status_id": "Current",
              "api.Contact.getsingle": {}
            });
          }
        }
      });
    }
  );


  angular
    .module('cvmembershipfilter')
    .controller(
      'CvmembershipfilterCMembershipCtrl', 
      function($scope, crmApi, crmStatus, crmUiHelp, CurrentMemberships) {

        $scope.memberships = CurrentMemberships.values;
        console.log($scope.memberships);

        $scope.getHumanStatus = function(status){
          var statusList = ["New", "Current", "Grace", "Expired", "Pending", "Cancelled", "Deceased"];
          var status = parseInt(status);
          return statusList[status-1];
        };

      }
    );
})(angular, CRM.$, CRM._);
