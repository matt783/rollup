import React, { Component } from 'react';
import {
  Table, Container,
} from 'semantic-ui-react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class InfoOp extends Component {
  static propTypes = {
    currentBatch: PropTypes.number.isRequired,
    currentSlot: PropTypes.number.isRequired,
    currentBlock: PropTypes.number.isRequired,
    currentEra: PropTypes.number.isRequired,
  }

  render() {
    return (
      <Container>
        <Table color="olive" inverted>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <b>Current Batch:</b>
              </Table.Cell>
              <Table.Cell textAlign="left">
                {this.props.currentBatch}
              </Table.Cell>
              <Table.Cell>
                <b>Current Block:</b>
              </Table.Cell>
              <Table.Cell textAlign="left">
                {this.props.currentBlock}
              </Table.Cell>
              <Table.Cell>
                <b>Current Slot:</b>
              </Table.Cell>
              <Table.Cell textAlign="left">
                {this.props.currentSlot}
              </Table.Cell>
              <Table.Cell>
                <b>Current Era:</b>
              </Table.Cell>
              <Table.Cell textAlign="left">
                {this.props.currentEra}
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  currentBlock: state.general.currentBlock,
  currentEra: state.general.currentEra,
  currentSlot: state.general.currentSlot,
  currentBatch: state.general.currentBatch,
});

export default connect(mapStateToProps, { })(InfoOp);
