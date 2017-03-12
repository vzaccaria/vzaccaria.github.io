let React = require("react");
let { fetchAsset } = require("../../stores/fetcher").default;

class statefulComponent extends React.Component {
  constructor() {
    super();
    this.state = { valid: false };
  }

  componentDidMount() {
    fetchAsset("data/cv-jr.yaml", { yaml: true }).then(data => {
      const valid = true;
      this.setState({ valid, data });
      return null;
    });
  }
}

export default { statefulComponent };
