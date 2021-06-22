import { Component, createElement } from "react";
//import ReactGA from "react-ga";

const IS_BROWSER = typeof window !== "undefined";

function isLocal(host) {
    if (IS_BROWSER){
        return location.hostname === host;
    }else{
        return false;
    }
}

function isDev() {
    return process.env.NODE_ENV !== "production";
}


const SHOULD_TRACK = !(isLocal("localhost") || isDev());


class AnalyticsApi {

    constructor() {
        if (!AnalyticsApi.instance) {
            AnalyticsApi.instance = this;
        }
        return AnalyticsApi.instance;
    }


    init = function (code) {
        if (SHOULD_TRACK && IS_BROWSER && !window.GA_INITIALIZED && code) {
            //ReactGA.initialize(code);
        } else {
            console.debug(`Analytics init triggered for ${code}`);
        }
    }

    pageview = function () {
        if (SHOULD_TRACK) {
            //ReactGA.set({ page: window.location.pathname });
            //ReactGA.pageview(window.location.pathname);
        } else {
            console.debug(`Pageview triggered for ${window.location.pathname}`);
        }
    }

    event = function (category = "", action = "") {
        if (SHOULD_TRACK) {
            if (category && action) {
                //ReactGA.event({ category, action });
            }
        } else {
            console.debug(`Event for category ${category} and action ${action} triggered`);
        }
    }

    exception = function (description = "", fatal = false) {
        if (SHOULD_TRACK) {
            if (description) {
                //ReactGA.exception({ description, fatal });
            }
        } else {
            console.debug(
                `${
                fatal ? "Fatal exception" : "Exception"
                } with description ${description}`
            );
        }
    }

};


const analyticsApi = new AnalyticsApi();
Object.freeze(analyticsApi);

export default analyticsApi;