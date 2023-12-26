// Badge.js
import React from 'react';

const Badge = ({ quantity }) => {
  return quantity > 0 ? <span className="badge">{quantity}</span> : null;
};

export default Badge;
