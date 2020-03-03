import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// get bootstrap imports
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import { setSortFilter } from '../../actions/actions';

function SortFilterDropdown(props) {
  const { setSortFilter } = props;
  console.log(setSortFilter);
  let dropdownTitle = 'Sort by';

  return (
    <ButtonToolbar>
      <DropdownButton variant="secondary" title={dropdownTitle} onSelect={(eventKey) => { props.setSortFilter(eventKey); }}>
        <Dropdown.Item eventKey=''>last added</Dropdown.Item>
        <Dropdown.Item eventKey="title">title</Dropdown.Item>
        <Dropdown.Item eventKey="director">director</Dropdown.Item>
        <Dropdown.Item eventKey="genre">genre</Dropdown.Item>
      </DropdownButton>
    </ButtonToolbar>

  );
}

export default connect(null, { setSortFilter })(SortFilterDropdown);
