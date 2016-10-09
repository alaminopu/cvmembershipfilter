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

        $scope.dateFilter = {
          startFrom: '',
          startTo: ''
        };
        $scope.memberships = CurrentMemberships.values;
        console.log($scope.memberships);

        $scope.getHumanStatus = function(status){
          var statusList = ["New", "Current", "Grace", "Expired", "Pending", "Cancelled", "Deceased"];
          var status = parseInt(status);
          return statusList[status-1];
        };

      }
    );

  angular
    .module('cvmembershipfilter')
    .filter(
      'StartRangeFilter', 
      function(){
        return function(data, dateFilter){
          if(dateFilter.startFrom === '' || dateFilter.startTo === ''){
            return data;
          }

          var filteredData = [];
          for(var i=0; i<data.length; i++){
            if(data[i].start_date >= dateFilter.startFrom
              && data[i].start_date <= dateFilter.startTo){
              filteredData.push(data[i]);
            }
          }
          return filteredData;
        }
      }
    );

})(angular, CRM.$, CRM._);