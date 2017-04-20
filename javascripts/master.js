/**
 * config showSpinner false
 */
NProgress.configure({ showSpinner: false });
/**
 * NProgress init to 0.4
 */
NProgress.start().set(0.4);
/**
 * load event
 * @param {Event} event
 */
window.onload = function(event){
    NProgress.done();
};
