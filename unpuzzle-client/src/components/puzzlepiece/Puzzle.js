import React, { Component, Fragment } from 'react'

class Puzzle extends Component {
  state = {
    isEditMode: false,
    updatedPuzzleName: this.props.name
  }

  
  render() {
    return (
      <div className="tile is-child box notification is-success">
        {
          this.props.isAdmin && 
          <Fragment>
            <a href="/" onClick={this.handleProductEdit} className="product-edit-icon">
            </a>
            <button onClick={event => this.props.handleDeleteProduct(this.props.id, event)} className="delete"></button>
          </Fragment>
        }
        {
          this.state.isEditMode 
          ? <div>
              <p>Edit puzzle name</p>
              <input 
                className="input is-medium"
                type="text" 
                placeholder="Enter name"
                value={this.state.updatedPuzzleName}
                onChange={this.onAddProductNameChange}
              />
              <p className="puzzle-id">id: { this.props.id }</p>
              <button type="submit" 
                className="button is-info is-small"
                onClick={ this.handleEditSave }
              >save</button>
            </div>
          : <div>
              <p className="puzzle-title">{ this.props.puzzleName }</p>
              <p className="puzzle-id">id: { this.props.id }</p>
            </div>
        }
      </div>
    )
  }
}

export default Puzzle
