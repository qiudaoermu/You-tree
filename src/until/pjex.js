import axios from 'axios'
class Pjex {
  constructor() {
    this.configureBackButton();
  }
  configureBackButton() {
    window.onpopstate = () => {
      window.location = window.location.href;
      this.pjex(window.location.href);
    };
  }
  pjex (path, targetSelector) {
    this.setHeaders(targetSelector);
    path = path + '?_pjax=%23js-repo-pjax-container'
    axios.get(path, targetSelector)
      .then(
        response => {
          document.querySelector('head > title').innerHTML = this.extractTitle(response.data);
          document.querySelector(targetSelector).innerHTML = this.withoutTitle(response.data);
          window.history.pushState({}, '', response.headers['x-pjax-url']);
        },
        error => {
            //
        }
      );
  }

  setHeaders(targetSelector) {
    axios.defaults.headers.common['X-PJAX'] = true;
    axios.defaults.headers.common['X-PJAX-Container'] = targetSelector;
  }

  extractTitle(html) {
    return this.titlePattern().exec(html)[1];
  }

  withoutTitle(html) {
    return html.replace(this.titlePattern().exec(html)[0], '');
  }
  
  titlePattern() {
    return new RegExp(/\s*<title>(.*)<\/title>\s*/);
  }

}
export default Pjex;
