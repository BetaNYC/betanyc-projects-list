window.angular.module('ngProjects.services.projects', [])
  .factory('Projects', ['$resource',
    function($resource){
      return $resource(
        'projects',
        {
          projectId:'@_id'
        },
        {
          update: {method: 'PUT'}
        }
      )
    }]);