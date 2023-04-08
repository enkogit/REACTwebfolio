import React from 'react';
import PropTypes from 'prop-types';

const TableRow = ({
  label, link, value, format,
}) => (
  <tr>
    <td width="55%"><h4>{label}</h4></td>
    <td><h4>{link ? <a href={link}>{format(value)}</a> : format(value)}</h4></td>
  </tr>
);

TableRow.propTypes = {
  format: PropTypes.func,
  label: PropTypes.string.isRequired,
  link: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.number,
    PropTypes.string,
  ]),
};

TableRow.defaultProps = {
  format: (x) => x,
  link: null,
  value: null,
};

export default TableRow;
