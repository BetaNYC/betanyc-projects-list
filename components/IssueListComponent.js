var React = require('react/addons');
var map = require('lodash/collection/map');


// Stores
var IssuesByRepoStore = require('../stores/IssuesByRepoStore');


var IssueListHeader = React.createClass({
  render(){
    return <tr className='text-muted'>
      <th>Issue Details</th>
      <th></th>
    </tr>
  }
});

var IssueListComponent;
module.exports = IssueListComponent = React.createClass({
  propTypes: {
    repo: React.PropTypes.object
  },
  render(){
    let {name} = this.props.repo  || {};
    let fetchingIssues = name ? IssuesByRepoStore.isExpectingPage(name) : false;

    var issues = map(this.props.issues, (issue,i) => {
      issue.labels.map(label => {return <span className='label' style={{backgroundColor: issue.color}}>{label.name}</span> });
      let labelsSection;
      if(issue.labels.length > 0){
        labelsSection = <p>
          {issue.labels.map((label,j)=>{return <span className='label' style={{backgroundColor: label.color, marginRight: 5}} key={j}>{label.name}</span>})}
      </p>}
      return <tr key={i}>
        <td style={{borderTop:'none',borderBottom:'solid 1px #ccc'}}>
          <h4><a href={issue.htmlUrl} target='_blank'>
            {issue.title}
          </a></h4>
          {labelsSection}
          <p dangerouslySetInnerHTML={{__html: issue.body}}></p>
        </td>
      </tr>
    });

    var {repo} = this.props;

    if(repo)
      var {htmlUrl} = repo.htmlUrl;

    return <div style={{overflow: 'hidden'}} id='issuesSection'>
        <div className='well well-sm'>
          <a className='btn btn-primary' href={repo && repo.htmlUrl + '/issues/new'} target="_blank">Create issue</a>
        </div>
        <table className='table table-condensed' >
          <tbody>
            {fetchingIssues ? <div className='text-center' style={{paddingTop: 100}}>
        <span className='fa fa-circle-o-notch fa-3x fa-spin text-muted'/>
      </div> : (issues.length == 0 ? <tr className='text-center text-muted'><td style={{paddingTop: 40}}>No issues found</td></tr> : issues) }
          </tbody>
        </table>
    </div>
  }
});