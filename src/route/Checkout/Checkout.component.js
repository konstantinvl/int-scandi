import { Checkout as SourceCheckout } from "SourceRoute/Checkout/Checkout.component";
import { ContentWrapper } from "SourceComponent/ContentWrapper/ContentWrapper.component";

import { BILLING_STEP, DETAILS_STEP, SHIPPING_STEP } from "SourceRoute/Checkout/Checkout.config";

import "./Checkout.extention.style.scss";

class Checkout extends SourceCheckout {
  showStepTitle(step) {
    switch (step) {
      case SHIPPING_STEP:
        return "Shipping";
      case BILLING_STEP:
        return "Review & Payment";
      default:
        return;
    }
  }

  renderCheck() {
    return <div className="checked"></div>;
  }

  checkStep(step, ...stepList) {
    return { includes: stepList.includes(step), goingNow: stepList.indexOf(step) === 0 };
  }
  renderCheckoutProgressBar(...stepsToPass) {
    const { checkoutStep } = this.props;
    return (
      <div className="progress-bar">
        {stepsToPass.map((item, index, array) => {
          if (index !== array.length - 1) {
            return (
              <>
                <div
                  className="progress-bar-line"
                  style={
                    !this.checkStep(checkoutStep, ...stepsToPass.slice(index, array.length)).includes
                      ? { backgroundPositionX: "100%" }
                      : {}
                  }
                ></div>
                <div className="progress-bar-point">
                  <div
                    className="progress-bar-point-circle"
                    style={
                      this.checkStep(checkoutStep, ...stepsToPass.slice(index, array.length)).includes
                        ? { background: "var(--primary-base-color)" }
                        : {}
                    }
                  >
                    {this.checkStep(checkoutStep, ...stepsToPass.slice(index, array.length)).goingNow
                      ? index + 1
                      : this.renderCheck()}
                  </div>
                  <div className="progress-bar-point-title">{this.showStepTitle(item)}</div>
                </div>
              </>
            );
          } else {
            return (
              <div
                className="progress-bar-line"
                style={
                  !this.checkStep(checkoutStep, ...stepsToPass.slice(index, array.lenght)).includes
                    ? { backgroundPositionX: "100%" }
                    : {}
                }
              ></div>
            );
          }
        })}
      </div>
    );
  }

  render() {
    return (
      <main block="Checkout">
        {this.renderCheckoutProgressBar(SHIPPING_STEP, BILLING_STEP, DETAILS_STEP)}
        <ContentWrapper wrapperMix={{ block: "Checkout", elem: "Wrapper" }} label={__("Checkout page")}>
          {this.renderSummary(true)}
          <div block="Checkout" elem="Step">
            {this.renderTitle()}
            {this.renderGuestForm()}
            {this.renderStep()}
            {this.renderLoader()}
          </div>
          <div>
            {this.renderSummary()}
            {this.renderPromo()}
            {this.renderCoupon()}
          </div>
        </ContentWrapper>
      </main>
    );
  }
}

export default Checkout;
