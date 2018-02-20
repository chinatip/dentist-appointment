import React, { PureComponent } from 'react';

import data from 'data.json';

export const WithData = (Component) => {
  return class LoadData extends PureComponent {
    render() {
      return <Component data={data} {...this.props} />;
    }
  }
}