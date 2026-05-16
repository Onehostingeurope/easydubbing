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

    const renderButton = () => {
      const container = document.getElementById(containerId);
      if (!container) return;

      // If container already has content, don't render again
      if (container.children.length > 0) return;

      if (window.paypal && window.paypal.Buttons) {
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
          },
          onError: function(err: any) {
            console.error('PayPal Error:', err);
          }
        }).render(`#${containerId}`);
      } else {
        // Retry in 100ms if not ready
        setTimeout(renderButton, 100);
      }
    };

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

    loadScript();

    return () => {
      // No cleanup needed for the script as it's shared
    };
  }, [planId, clientId]);

  return (
    <div 
      id={`paypal-button-container-${planId}`} 
      className="w-full min-h-[150px] flex items-center justify-center bg-white/5 rounded-lg border border-white/5"
    >
      <div className="animate-pulse text-xs text-primary/40 font-bold uppercase tracking-widest">
        Loading Checkout...
      </div>
    </div>
  );
};

export default PayPalSubscription;
