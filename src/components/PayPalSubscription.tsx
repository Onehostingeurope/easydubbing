import { useEffect } from 'react';

interface PayPalSubscriptionProps {
  planId: string;
  clientId: string;
}

declare global {
  interface Window {
    paypal?: any;
  }
}

const PayPalSubscription = ({ planId, clientId }: PayPalSubscriptionProps) => {
  useEffect(() => {
    const scriptId = 'paypal-sdk-script';
    const containerId = `paypal-button-container-${planId}`;

    const loadScript = () => {
      if (document.getElementById(scriptId)) {
        renderButton();
        return;
      }

      const script = document.createElement('script');
      script.id = scriptId;
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&vault=true&intent=subscription`;
      script.setAttribute('data-sdk-integration-source', 'button-factory');
      script.async = true;
      script.onload = () => renderButton();
      document.body.appendChild(script);
    };

    const renderButton = () => {
      const container = document.getElementById(containerId);
      if (window.paypal && container && container.innerHTML === '') {
        window.paypal.Buttons({
          style: {
            shape: 'rect',
            color: 'gold',
            layout: 'vertical',
            label: 'subscribe'
          },
          createSubscription: function(_data: any, actions: any) {
            return actions.subscription.create({
              'plan_id': planId
            });
          },
          onApprove: function(data: any) {
            window.location.href = `/success?subscriptionID=${data.subscriptionID}`;
          }
        }).render(`#${containerId}`);
      }
    };

    loadScript();

    return () => {
      // Keep script but maybe cleanup buttons if needed
    };
  }, [planId, clientId]);

  return <div id={`paypal-button-container-${planId}`} className="w-full min-h-[50px]"></div>;
};

export default PayPalSubscription;
