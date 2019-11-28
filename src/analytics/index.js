import { Component, createElement } from "react";
import analyticsApi from "./analyticsApi";


export default (code, Router, { localhost = "localhost" } = {}) => Page => {
  class WithAnalytics extends Component {
    state = {
      analytics: undefined
    };

    componentDidMount() {
      // check if it should track
      //const shouldNotTrack = isLocal(localhost) || isDev();
      // check if it should use production or dev analytics
      const analytics = analyticsApi;

      // init analytics
      analytics.init(code);
      // log page
      analytics.pageview();

      // save possible previously defined callback
      const previousCallback = Router.onRouteChangeComplete;
      Router.onRouteChangeComplete = () => {
        // call previously defined callback if is a function
        if (typeof previousCallback === "function") {
          previousCallback();
        }
        // log page
        analytics.pageview();
      };

      this.setState({
        analytics
      });
    }

    render() {
      return createElement(Page, {
        ...this.props,
        analytics: this.state.analytics
      });
    }
  }

  if (Page.getInitialProps) {
    WithAnalytics.getInitialProps = Page.getInitialProps;
  }

  return WithAnalytics;
};