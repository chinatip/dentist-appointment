import React, { PureComponent } from 'react';

const WithData = (Component) => {
  return class LoadData extends PureComponent {
    constructor(props) {
      super();

      this.state = {
        data: this.initData()
      }
    }

    async initData() {
      // await fetch
      // TODO: Load data from json
    }


    render() {
      return <Component {...this.props} />;
    }
  }
}