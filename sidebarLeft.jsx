import React, { PropTypes } from 'react'
import MenuNode from './menuNode.jsx'
require('./style.styl')

const propTypes = {
  nodesAreLinks: PropTypes.bool.isRequired,
  apiPath: PropTypes.string.isRequired,
  apiParameters: PropTypes.string.isRequired,
  apiChildPath: PropTypes.string.isRequired,
  apiChildParameters: PropTypes.string.isRequired
}

export class SidebarLeft extends React.Component {
  constructor () {
    super()
    this.state = {
      menuTree: [],
      selectedNode: '' // node selected (clicked) by the user
    }
  }

  componentDidMount = () => {
    fetch(this.props.apiPath + this.props.apiParameters, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      credentials: 'include'
    })
    .then(response => response.json())
    .then(json => this.setState({...this.state, menuTree: json.d}))
  }

  handleChangeSelectedNode = newSelectedNodeId => this.setState({...this.state, selectedNode: newSelectedNodeId})

  render () {
    return (
      <div className={'sidebarleft textMenuColor'}>
        <div className={'sidebarleft__menu'}>
          { this.state.menuTree.map((treeItem, i) =>
            <MenuNode
              data={treeItem}
              nodesAreLinks={this.props.nodesAreLinks}
              nodeDeepness={0}
              key={'root_' + i}
              apiChildPath={this.props.apiChildPath}
              apiChildParameters={this.props.apiChildParameters || ''}
              selectedNode={this.state.selectedNode}
              handlerSelectNode={this.handleChangeSelectedNode}
            />
          )}
        </div>
      </div>
    )
  }
}

SidebarLeft.propTypes = propTypes
